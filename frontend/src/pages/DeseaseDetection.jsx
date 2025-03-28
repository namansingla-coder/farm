import React, { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { MdOutlineCloudUpload } from "react-icons/md";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FileUpload from "../Components/FileUpload";
import { predictDisease } from "../api/api";

const DiseaseDetection = ({ type, title, bgColor, titleColor }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    try {
      const result = await predictDisease(selectedFile, type);
      setPrediction(result);
    } catch {
      alert("Prediction failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={`min-h-screen flex flex-col items-center ${bgColor} pb-10`}>
        {/* Title Section */}
        <div className="max-w-4xl w-full mx-auto text-center mt-10 p-8 bg-white shadow-lg rounded-xl">
          <h1 className={`text-4xl font-extrabold ${titleColor} mb-3`}>
            {title} Disease Detection
          </h1>
          <p className="text-gray-600 text-lg">
            Upload an image, and our AI model will analyze it to detect diseases.  
            Early detection can help in timely treatment.
          </p>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center mt-10 w-full px-6">
          <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Upload an Image
            </h2>

            {/* File Upload Component */}
            <FileUpload onFileSelect={handleFileSelect} showPreview={false} />

            {/* Show Image Only After Selection */}
            

            {/* Predict Button */}
            <button
              className={`mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 text-lg rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:scale-105 text-white"
              }`}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <>
                  <RiLoader4Line className="animate-spin" size={24} /> Processing...
                </>
              ) : (
                <>
                  <MdOutlineCloudUpload size={24} /> Predict Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Prediction Result Section */}
        <div className="mt-12 w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Prediction Result</h2>

          {prediction ? (
            <div className="mt-4 p-6 bg-blue-50 border border-blue-400 rounded-lg shadow-md text-lg">
              <p className="text-gray-600">Predicted Class:</p>
              <span className={`text-2xl font-bold ${titleColor}`}>
                {prediction.class}
              </span>

              <p className="mt-2 text-gray-500">
                Confidence:{" "}
                <span className="font-bold text-green-600">
                  {(prediction.confidence ).toFixed(2)}%
                </span>
              </p>
            </div>
          ) : (
            <p className="mt-4 text-gray-500 italic">
              No prediction yet. Upload an image and click "Predict Now".
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DiseaseDetection;