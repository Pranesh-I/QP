import LatexRenderer from "./LatexRenderer";

import type {
  Question,
  LatexBlock,
} from "../types/question";


type QuestionCardProps = {
  question: Question;
};


// Replace placeholders like [eq1] with rendered KaTeX
const renderTextWithLatex = (
  text: string,
  latexBlocks: LatexBlock[]
) => {

  const parts = text.split(/(\[eq\d+\])/g);

  return parts.map((part, index) => {

    const matchedBlock = latexBlocks.find(
      (block) => `[${block.id}]` === part
    );

    if (matchedBlock) {
      return (
        <LatexRenderer
          key={index}
          latex={matchedBlock.latex}
        />
      );
    }

    return (
      <span key={index}>
        {part}
      </span>
    );
  });
};


// Display question stem and options
export default function QuestionCard({
  question,
}: QuestionCardProps) {

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >

      <h3>
        Q{question.q_number}
      </h3>

      <div
        style={{
            marginBottom: "16px",
        }}
        >

        <span
            style={{
            padding: "6px 12px",
            borderRadius: "20px",
            backgroundColor: "#111",
            color: "#fff",
            fontSize: "14px",
            textTransform: "capitalize",
            }}
        >

            {question.subject}

        </span>

       </div>


      <div>
        {renderTextWithLatex(
          question.stem_text,
          question.latex_blocks
        )}
      </div>


      <div
        style={{
          marginTop: "20px",
        }}
      >

        {question.options.map((option) => (
          <div
            key={option.label}
            style={{
              marginBottom: "10px",
            }}
          >

            <strong>
              {option.label})
            </strong>

            {" "}

            {renderTextWithLatex(
              option.text_plain,
              option.latex_blocks
            )}

          </div>
        ))}

      </div>

    </div>
  );
}