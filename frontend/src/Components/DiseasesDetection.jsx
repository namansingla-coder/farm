import React, { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FileUpload from "./components/FileUpload";
import PredictionResult from "./components/PredictionResult";
import { predictDisease } from "../api/detectionApi";

const DiseaseDetection = ({ type, title, bgColor, titleColor }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <div className={`min-h-screen flex flex-col ${bgColor}`}>
      <Header />
      <div className="max-w-4xl mx-auto text-center mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className={`text-3xl font-bold ${titleColor}`}>{title} Disease Detection</h1>
        <p className="mt-3 text-gray-600">
          Upload an image and our AI model will analyze it for diseases. Early detection helps in timely treatment.
        </p>
      </div>

      <div className="flex flex-col items-center flex-grow mt-8">
        <div className="bg-white p-6 shadow-lg rounded-lg w-96 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload an Image</h2>
          <FileUpload onFileSelect={setSelectedFile} />

          <button
            className={`mt-5 px-6 py-2 rounded-lg text-white font-bold transition shadow-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <RiLoader4Line className="animate-spin mx-auto" size={24} /> : "Predict"}
          </button>
        </div>

        <PredictionResult prediction={prediction} color={titleColor} />
      </div>

      <Footer />
    </div>
  );
};

export default DiseaseDetection;