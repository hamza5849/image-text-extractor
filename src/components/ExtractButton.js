import React from "react";

function ExtractButton({ onExtract, loading }) {
  return (
    <button
      onClick={onExtract}
      disabled={loading}
      className="extract-button"
    >
      {loading ? "Extracting..." : "Extract Text"}
    </button>
  );
}

export default ExtractButton;
