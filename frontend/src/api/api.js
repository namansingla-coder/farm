import axios from "axios";

const BASE_URL = "https://farm-disease-detection-api.onrender.com"; // Updated to deployed backend URL

export const predictDisease = async (file, type) => {
  let endpoint = "";

  if (type === "potato") {
    endpoint = "/predict_potato";
  } else if (type === "poultry") {
    endpoint = "/predict_poultry";
  } else if (type === "crop") {
    endpoint = "/predict_crop"; // New endpoint for crop disease detection
  } else {
    throw new Error("Invalid disease type");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error predicting disease:", error);
    throw error;
  }
};