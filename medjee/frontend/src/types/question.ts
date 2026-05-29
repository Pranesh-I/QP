// Individual LaTeX block
export type LatexBlock = {
  id: string;

  latex: string;

  display?: boolean;
};


// Question option object
export type QuestionOption = {
  label: "a" | "b" | "c" | "d";

  text_plain: string;

  latex_blocks: LatexBlock[];

  is_correct?: boolean;
};


// Main question object
export type Question = {
  id: string;

  q_number: number;

  subject:
    | "physics"
    | "chemistry"
    | "maths"
    | "biology";

  stem_text: string;

  latex_blocks: LatexBlock[];

  options: QuestionOption[];

  has_image: boolean;

  marks?: number;
};