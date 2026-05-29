type MarksFilterProps = {
  selectedMarks: number | "all";

  onSelectMarks: (
    marks: number | "all"
  ) => void;
};


const marksOptions = [
  "all",
  1,
  2,
  3,
  4,
];


// Filter questions by marks
export default function MarksFilter({
  selectedMarks,
  onSelectMarks,
}: MarksFilterProps) {

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >

      <select
        value={selectedMarks}
        onChange={(event) => {

          const value =
            event.target.value;

          onSelectMarks(
            value === "all"
              ? "all"
              : Number(value)
          );
        }}
        style={{
          padding: "10px",
          minWidth: "200px",
        }}
      >

        {marksOptions.map((marks) => (

          <option
            key={marks}
            value={marks}
          >

            {marks === "all"
              ? "All Marks"
              : `${marks} Marks`}

          </option>

        ))}

      </select>

    </div>
  );
}