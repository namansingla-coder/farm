import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { FaLeaf, FaCamera, FaChartBar, FaSeedling } from "react-icons/fa";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      {/* Hero Section */}
      <div className="flex flex-grow flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl font-extrabold text-gray-800">
          AI-Based <span className="text-blue-600">Farm Disease Detection</span>
        </h2>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl">
          Upload an image of a crop leaf, potato leaf, or poultry feces, and our AI-powered system will detect potential diseases with high accuracy.
        </p>
        <Link to="/crop-detection">
          <button className="mt-6 bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10 max-w-6xl mx-auto pb-10">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaLeaf className="text-green-500 text-5xl" />
          <h3 className="text-xl font-semibold mt-4">Potato Disease Detection</h3>
          <p className="text-gray-600 text-center mt-2">
            Detect early and late blight in potato leaves using AI-based image processing.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaSeedling className="text-blue-500 text-5xl" />
          <h3 className="text-xl font-semibold mt-4">Crop Disease Detection</h3>
          <p className="text-gray-600 text-center mt-2">
            Identify diseases in various crops and prevent major agricultural losses.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaChartBar className="text-red-500 text-5xl" />
          <h3 className="text-xl font-semibold mt-4">Poultry Disease Detection</h3>
          <p className="text-gray-600 text-center mt-2">
            Identify poultry diseases like Coccidiosis and Newcastle Disease through AI.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaCamera className="text-yellow-500 text-5xl" />
          <h3 className="text-xl font-semibold mt-4">Easy Image Upload</h3>
          <p className="text-gray-600 text-center mt-2">
            Simply upload an image, and our system will analyze it within seconds.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
