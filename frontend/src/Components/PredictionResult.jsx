import React from "react";

const PredictionResult = ({ prediction, color }) => {
  if (!prediction) return null;

  return (
    <div className="mt-6 bg-white p-5 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold text-gray-700">Prediction Result:</h3>
      <p className={`text-2xl font-bold ${color}`}>{prediction.class}</p>
      <p className="text-gray-600">Confidence: {prediction.confidence}%</p>
    </div>
  );
};

export default PredictionResult;