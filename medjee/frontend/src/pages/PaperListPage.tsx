import type {
  Paper,
} from "../types/paper";


// Mock uploaded papers
const mockPapers: Paper[] = [
  {
    id: "1",

    filename:
      "JEE Physics Mock Test.pdf",

    std: "12",

    paper_type: "Mock Test",

    total_marks: 300,

    duration_mins: 180,

    uploaded_at:
      "2026-05-28",

    question_count: 90,

    subjects_count: 3,

    processing_status:
      "complete",
  },

  {
    id: "2",

    filename:
      "JEE Advanced Chemistry.pdf",

    std: "12",

    paper_type: "Practice Test",

    total_marks: 180,

    duration_mins: 120,

    uploaded_at:
      "2026-05-27",

    question_count: 45,

    subjects_count: 1,

    processing_status:
      "processing",
  },
];


// Display uploaded papers list
export default function PaperListPage() {

  // Handle paper reprocess action
  const handleReprocess = (
    paperId: string
  ) => {

    console.log(
      "Reprocess paper:",
      paperId
    );

  };


  return (
    <div style={{ padding: "40px" }}>

      <h1>
        Uploaded Papers
      </h1>


      {mockPapers.map((paper) => (

        <div
          key={paper.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >

          <h3>
            {paper.filename}
          </h3>

          <p>
            Standard:
            {" "}
            {paper.std}
          </p>

          <p>
            Type:
            {" "}
            {paper.paper_type}
          </p>

          <p>
            Total Marks:
            {" "}
            {paper.total_marks}
          </p>

          <p>
            Duration:
            {" "}
            {paper.duration_mins}
            {" "}
            mins
          </p>

          <p>
            Uploaded:
            {" "}
            {paper.uploaded_at}
          </p>

          <p>
            Questions:
            {" "}
            {paper.question_count}
          </p>

          <p>
            Subjects:
            {" "}
            {paper.subjects_count}
          </p>

          <p>
            Status:
            {" "}
            <strong>
              {paper.processing_status}
            </strong>
          </p>


          <button
            onClick={() =>
              handleReprocess(
                paper.id
              )
            }
            style={{
              marginTop: "10px",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >

            Reprocess

          </button>

        </div>

      ))}

    </div>
  );
}