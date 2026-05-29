from pathlib import Path
from typing import List, Dict, Any

import fitz  # PyMuPDF


class PDFExtractor:
    """
    Free PDF text extractor for the MEDJEE pipeline.

    This is the first stage of the free workflow:
    PDF -> raw page text
    """

    def extract_pages(self, pdf_path: str) -> List[Dict[str, Any]]:
        pdf_file = Path(pdf_path)

        if not pdf_file.exists():
            raise FileNotFoundError(f"PDF not found: {pdf_path}")

        doc = fitz.open(pdf_file)
        pages: List[Dict[str, Any]] = []

        for page_number, page in enumerate(doc, start=1):
            # sort=True helps improve reading order
            text = page.get_text("text", sort=True).strip()

            pages.append(
                {
                    "page_number": page_number,
                    "text": text,
                    "has_text": bool(text),
                }
            )

        doc.close()
        return pages

    def extract_full_text(self, pdf_path: str) -> str:
        pages = self.extract_pages(pdf_path)

        parts = []
        for page in pages:
            if page["text"]:
                parts.append(f"[PAGE {page['page_number']}]\n{page['text']}")

        return "\n\n".join(parts)