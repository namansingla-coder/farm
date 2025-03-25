import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg hover:border-green-500 transition">
      <label className="cursor-pointer flex flex-col items-center">
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <FaCloudUploadAlt className="text-gray-500 text-5xl" />
        <p className="mt-2 text-gray-600">Click to upload an image</p>
      </label>

      {selectedFile && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;