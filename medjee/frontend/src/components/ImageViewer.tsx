type ImageViewerProps = {
  imageUrl: string;

  alt?: string;
};


// Display extracted question diagram
export default function ImageViewer({
  imageUrl,
  alt = "Question Diagram",
}: ImageViewerProps) {

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >

      <img
        src={imageUrl}
        alt={alt}
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />

    </div>
  );
}