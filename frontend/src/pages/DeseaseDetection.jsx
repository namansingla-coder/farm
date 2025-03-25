import React, { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { MdOutlineCloudUpload } from "react-icons/md";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FileUpload from "../Components/FileUpload";
import PredictionResult from "../Components/PredictionResult";
import { predictDisease } from "../api/api";

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
    <>
    <Header />
    <div className={`min-h-screen flex flex-col items-center ${bgColor}`}>
      
      
      <div className="max-w-4xl w-full mx-auto text-center mt-10 p-6 bg-white shadow-xl rounded-xl transition-all transform hover:scale-105">
        <h1 className={`text-4xl font-extrabold ${titleColor} mb-3`}>
          {title} Disease Detection
        </h1>
        <p className="text-gray-600 text-lg">
          Upload an image and our AI model will analyze it for diseases. 
          Early detection helps in timely treatment.
        </p>
      </div>

      {/* Upload & Prediction Section */}
      <div className="flex flex-col items-center flex-grow mt-10 w-full px-6">
        <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Upload an Image</h2>
          
          <FileUpload onFileSelect={setSelectedFile} />

          <button
            className={`mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 text-lg rounded-xl font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-700 hover:shadow-2xl hover:scale-105 text-white"
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

        <PredictionResult prediction={prediction} color={titleColor} />
      </div>

      <Footer />
    </div>
    </>
  );
};

export default DiseaseDetection;