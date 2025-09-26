import React, { useState } from "react";
import Tesseract from "tesseract.js";
import Header from "./components/Header";
import UploadImage from "./components/UploadImage";
import ExtractButton from "./components/ExtractButton";
import TextOutput from "./components/TextOutput";
import "./App.css";

function App() {
  const [file, setFile] = useState(null); // Uploaded image file
  const [text, setText] = useState("");   // Extracted text
  const [loading, setLoading] = useState(false); // Loading state

  // Handle image file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setText(""); // Reset previous extracted text
  };

  // Handle text extraction
  const handleExtractText = () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    setText("");

    Tesseract.recognize(file, "eng", { // Always English
      logger: (m) => console.log(m),  // Show progress in console
    })
      .then(({ data: { text } }) => {
        if (!text.trim()) {
          setText(
            "Text extraction failed! Make sure the uploaded image contains text in English."
          );
        } else {
          setText(text); // Show extracted text
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setText(
          "Text extraction failed! Make sure the uploaded image contains text in English."
        );
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <div className="parent-box">
        <Header />

        <div className="child-boxes">
          {/* Upload Box */}
          <div className="upload-box">
            <UploadImage onImageChange={handleFileChange} />
            <ExtractButton onExtract={handleExtractText} loading={loading} />
          </div>

          {/* Text Output Box */}
          <div className="text-box">
            <TextOutput
              text={
                loading
                  ? "Processing image, please wait..."
                  : text || "Your extracted text will appear here."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
