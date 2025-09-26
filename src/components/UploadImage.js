import React from "react";

function UploadImage({ onImageChange }) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={onImageChange}
      className="file-input"
    />
  );
}

export default UploadImage;
