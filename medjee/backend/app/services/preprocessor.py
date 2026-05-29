import re
from typing import List, Dict, Any, Optional


class Preprocessor:
    """
    Free preprocessing pipeline for MEDJEE.

    Goal:
    PDF extracted text -> cleaned full text -> question blocks -> options.
    """

    # Finds question starts anywhere in the text, not only at line start.
    # This is important because the PDF sometimes places "4." or "23."
    # in the middle of a line after matrix content.
    QUESTION_RE = re.compile(r"(?<!\d)(\d{1,3})\.\s+")

    # Matches options like:
    # a) ...
    # a. ...
    # (a) ...
    OPTION_RE = re.compile(r"(?<!\w)([a-dA-D])[\)\.]\s+")

    SUBJECT_RANGES = [
        (1, 10, "physics"),
        (11, 18, "chemistry"),
        (19, 30, "maths"),
    ]

    def normalize_unicode_math(self, text: str) -> str:
        """
        Convert common OCR / PDF math symbols into cleaner text.
        This does not create perfect LaTeX, but it makes the output
        much easier to process later.
        """
        if not text:
            return ""

        replacements = {
            "": "-",
            "−": "-",
            "–": "-",
            "—": "-",
            "": r"\times",
            "×": r"\times",
            "÷": r"\div",
            "∞": r"\infty",
            "π": r"\pi",
            "μ": r"\mu",
            "σ": r"\sigma",
            "α": r"\alpha",
            "β": r"\beta",
            "γ": r"\gamma",
            "δ": r"\delta",
            "λ": r"\lambda",
            "θ": r"\theta",
            "°": r"^\circ",
            "√": r"\sqrt{}",
            "≤": r"\leq",
            "≥": r"\geq",
            "≠": r"\neq",
        }

        for old, new in replacements.items():
            text = text.replace(old, new)

        return text

    def normalize_whitespace(self, text: str) -> str:
        """
        Standardize whitespace while keeping line structure useful.
        """
        if not text:
            return ""

        text = text.replace("\r\n", "\n").replace("\r", "\n")
        text = self.normalize_unicode_math(text)

        # Replace tabs with spaces
        text = text.replace("\t", " ")

        # Remove repeated spaces but keep newlines
        text = re.sub(r"[ ]{2,}", " ", text)

        # Remove excessive blank lines
        text = re.sub(r"\n{3,}", "\n\n", text)

        return text.strip()

    def remove_noise_lines(self, text: str) -> str:
        """
        Removes page headers, footers, and obvious noise lines.
        """
        if not text:
            return ""

        cleaned_lines = []

        for line in text.splitlines():
            stripped = line.strip()

            if not stripped:
                cleaned_lines.append("")
                continue

            # Page footer like: Page 1 of 4
            if re.fullmatch(r"Page\s+\d+\s+of\s+\d+", stripped, flags=re.IGNORECASE):
                continue

            # Common top banner/header noise from your file
            if "JEE QP" in stripped and "XII STD" in stripped:
                continue

            if stripped in {"PHYSICS", "CHEMISTRY", "MATHS"}:
                cleaned_lines.append(stripped)
                continue

            cleaned_lines.append(stripped)

        result = "\n".join(cleaned_lines)
        result = re.sub(r"\n{3,}", "\n\n", result)
        return result.strip()

    def infer_subject(self, q_number: int) -> str:
        """
        Heuristic subject mapping for this current paper.
        If you later change the PDF format, this can be replaced
        with page-heading detection.
        """
        for start, end, subject in self.SUBJECT_RANGES:
            if start <= q_number <= end:
                return subject
        return "unknown"

    def extract_question_blocks(self, full_text: str) -> List[Dict[str, Any]]:
        """
        Split the entire paper text into question blocks using question numbers.
        This is the key improvement: it catches question numbers even when they
        appear mid-line after matrix content or page-break artifacts.
        """
        text = self.normalize_whitespace(full_text)
        text = self.remove_noise_lines(text)

        matches = list(self.QUESTION_RE.finditer(text))
        question_blocks: List[Dict[str, Any]] = []

        for index, match in enumerate(matches):
            q_number = int(match.group(1))
            start = match.start()
            end = matches[index + 1].start() if index + 1 < len(matches) else len(text)

            raw_text = text[start:end].strip()

            question_blocks.append(
                {
                    "q_number": q_number,
                    "raw_text": raw_text,
                }
            )

        return question_blocks

    def split_options(self, question_text: str) -> Dict[str, Any]:
        """
        Split a single question block into stem and options.

        This handles:
        - a) option text
        - a. option text
        - (a) option text
        - options appearing on the same line
        """
        if not question_text:
            return {
                "stem_text": "",
                "options": [],
            }

        # Normalize option markers a little before splitting.
        # We don't force LaTeX here; only clean layout.
        text = question_text.strip()

        # Treat "(a)" and "(b)" etc. the same as "a)"
        text = re.sub(r"\(\s*([a-dA-D])\s*\)", r"\1)", text)

        matches = list(self.OPTION_RE.finditer(text))

        if not matches:
            return {
                "stem_text": text.strip(),
                "options": [],
            }

        stem_text = text[:matches[0].start()].strip()
        options: List[Dict[str, Any]] = []

        for i, match in enumerate(matches):
            label = match.group(1).lower()
            opt_start = match.end()
            opt_end = matches[i + 1].start() if i + 1 < len(matches) else len(text)

            option_text = text[opt_start:opt_end].strip()
            option_text = re.sub(r"\s+", " ", option_text)

            options.append(
                {
                    "label": label,
                    "text_plain": option_text,
                    "latex_blocks": [],
                }
            )

        return {
            "stem_text": re.sub(r"\s+", " ", stem_text).strip(),
            "options": options,
        }

    def preprocess(self, full_text: str) -> List[Dict[str, Any]]:
        """
        Full free preprocessing flow:
        raw extracted PDF text -> question blocks -> stems/options.
        """
        question_blocks = self.extract_question_blocks(full_text)
        structured_questions: List[Dict[str, Any]] = []

        for block in question_blocks:
            q_number = block["q_number"]
            split_data = self.split_options(block["raw_text"])

            structured_questions.append(
                {
                    "q_number": q_number,
                    "subject": self.infer_subject(q_number),
                    "stem_text": split_data["stem_text"],
                    "latex_blocks": [],
                    "options": split_data["options"],
                    "correct_answer": None,
                    "raw_text": block["raw_text"],
                }
            )

        return structured_questions