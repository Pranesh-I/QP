type Subject =
  | "all"
  | "physics"
  | "chemistry"
  | "maths"
  | "biology";


type SubjectFilterProps = {
  selectedSubject: Subject;

  onSelectSubject: (
    subject: Subject
  ) => void;
};


const subjects: Subject[] = [
  "all",
  "physics",
  "chemistry",
  "maths",
  "biology",
];


// Subject selection tabs
export default function SubjectFilter({
  selectedSubject,
  onSelectSubject,
}: SubjectFilterProps) {

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >

      {subjects.map((subject) => (

        <button
          key={subject}
          onClick={() =>
            onSelectSubject(subject)
          }
          style={{
            padding: "10px 16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",

            backgroundColor:
              selectedSubject === subject
                ? "#111"
                : "#fff",

            color:
              selectedSubject === subject
                ? "#fff"
                : "#111",
          }}
        >

          {subject.toUpperCase()}

        </button>

      ))}

    </div>
  );
}