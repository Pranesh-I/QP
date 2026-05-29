type UploadSuccessProps = {
  filename: string;

  questionsStored?: number;
};


// Display upload completion summary
export default function UploadSuccess({
  filename,
  questionsStored,
}: UploadSuccessProps) {

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#e8f7e8",
        border: "1px solid #b7e4b8",
      }}
    >

      <h3>
        Upload Complete
      </h3>

      <p>
        File:
        {" "}
        {filename}
      </p>

      <p>
        Questions Stored:
        {" "}
        {questionsStored ?? 0}
      </p>

    </div>
  );
}