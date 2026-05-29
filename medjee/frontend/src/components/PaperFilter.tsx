import type { Paper } from "../types/paper";


type PaperFilterProps = {
  papers: Paper[];

  selectedPaperId: string;

  onSelectPaper: (
    paperId: string
  ) => void;
};


// Dropdown filter for uploaded papers
export default function PaperFilter({
  papers,
  selectedPaperId,
  onSelectPaper,
}: PaperFilterProps) {

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >

      <select
        value={selectedPaperId}
        onChange={(event) =>
          onSelectPaper(
            event.target.value
          )
        }
        style={{
          padding: "10px",
          minWidth: "250px",
        }}
      >

        <option value="">
          All Papers
        </option>

        {papers.map((paper) => (

          <option
            key={paper.id}
            value={paper.id}
          >

            {paper.filename}

          </option>

        ))}

      </select>

    </div>
  );
}