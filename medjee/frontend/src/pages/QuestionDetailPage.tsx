import QuestionCard from "../components/QuestionCard";
import ImageViewer from "../components/ImageViewer";

import type {
  Question,
} from "../types/question";


// Mock detailed question
const mockQuestion: Question = {
  id: "1",

  q_number: 12,

  subject: "physics",

  stem_text:
    "Calculate the force using [eq1]",

  latex_blocks: [
    {
      id: "eq1",
      latex: "F=ma",
    },
  ],

  has_image: true,

  options: [
    {
      label: "a",
      text_plain: "10 N",
      latex_blocks: [],
      is_correct: false,
    },

    {
      label: "b",
      text_plain: "20 N",
      latex_blocks: [],
      is_correct: true,
    },

    {
      label: "c",
      text_plain: "30 N",
      latex_blocks: [],
      is_correct: false,
    },

    {
      label: "d",
      text_plain: "40 N",
      latex_blocks: [],
      is_correct: false,
    },
  ],
};


// Question detail page
export default function QuestionDetailPage() {

  const correctOption =
    mockQuestion.options.find(
      (option) => option.is_correct
    );


  return (
    <div style={{ padding: "40px" }}>

      <h1>
        Question Detail
      </h1>

      <QuestionCard
        question={mockQuestion}
      />

      <div
        style={{
          marginTop: "20px",
        }}
      >

        <h3>
          Correct Answer
        </h3>

        <p>
          {correctOption?.label.toUpperCase()}
        </p>

      </div>


      {mockQuestion.has_image && (
        <div>

          <h3>
            Diagram
          </h3>

          <ImageViewer
            imageUrl="https://placehold.co/400x200"
          />

        </div>
      )}

    </div>
  );
}