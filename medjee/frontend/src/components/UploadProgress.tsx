type UploadProgressProps = {
  progress: number;
};


// Animated upload progress bar
export default function UploadProgress({
  progress,
}: UploadProgressProps) {

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >

      <p>
        Upload Progress:
        {" "}
        {progress}%
      </p>

      <div
        style={{
          width: "100%",
          height: "14px",
          backgroundColor: "#ddd",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#111",
            transition:
              "width 0.3s ease",
          }}
        />

      </div>

    </div>
  );
}