import React from "react";
import "./pages/UploadPage";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>MEDJEE Frontend</h1>
      <p>VITE_API_BASE_URL: {import.meta.env.VITE_API_BASE_URL || "Not configured"}</p>
    </div>
  );
}

export default App;
