import { useRef, useState } from "react";

type UploadZoneProps = {
  onFileSelect: (file: File) => void;
};

// PDF upload drag-and-drop component
export default function UploadZone({
  onFileSelect,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  // Validate uploaded file
  const validateFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return false;
    }

    setError("");
    return true;
  };

  // Handle file selection
  const handleFile = (file: File) => {
    const isValid = validateFile(file);

    if (!isValid) return;

    onFileSelect(file);
  };

  // Handle drag over event
  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle dropped file
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    if (file) {
      handleFile(file);
    }
  };

  // Open hidden file input
  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <div
        onClick={openFilePicker}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #999",
          padding: "40px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging
            ? "#f3f4f6"
            : "white",
        }}
      >
        <p>Drag & Drop PDF Here</p>
        <p>or click to upload</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            handleFile(file);
          }
        }}
      />

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
}