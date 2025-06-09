from flask import Flask, request, jsonify
from flask_cors import CORS
import os
# Disable GPU and set memory growth
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
import tensorflow as tf
from tensorflow.keras.models import load_model
import torchvision.transforms as transforms
import pickle
import gdown
from PIL import Image
import numpy as np
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Define Google Drive file IDs
DRIVE_IDS = {
    "potato_model": "1isifj4_xUzXfUe9qbKLuqNQm5ldYvglo",  # Replace with actual ID
    "poultry_model": "1isifj4_xUzXfUe9qbKLuqNQm5ldYvglo",  # Existing Poultry Model ID 
    "crop_model": "1xEdMivwR8Kdm85OiSVkb4zmPPufvgw-v",  # Replace with actual ID
    "crop_classes": "1kHnvKbJS2eIFlf1UmS7vZkm8nyLxzEfT"  # Replace with actual ID
}

# Define model paths
MODEL_PATHS = {
    "potato_model": "./models/potato_model.h5",
    "poultry_model": "./models/poultry_disease_model.h5",
    "crop_model": "./models/crop_disease_model.h5",
    "crop_classes": "./models/class_indices.pkl"
}

# Ensure models directory exists
os.makedirs("./models", exist_ok=True)

# Function to download models if not available
def download_model(file_id, file_path):
    """Download file from Google Drive if not present locally."""
    if not os.path.exists(file_path):
        print(f"Downloading {file_path}...")
        gdown.download(f"https://drive.google.com/uc?id={file_id}", file_path, quiet=False)
        print("Download Complete!")

# Download required models and files
for key, path in MODEL_PATHS.items():
    download_model(DRIVE_IDS[key], path)

# Load models
potato_model = tf.keras.models.load_model(MODEL_PATHS["potato_model"])
poultry_model = load_model(MODEL_PATHS["poultry_model"])
crop_model = tf.keras.models.load_model(MODEL_PATHS["crop_model"])

# Load Crop Classes Mapping
with open(MODEL_PATHS["crop_classes"], "rb") as f:
    CROP_CLASSES = pickle.load(f)
CROP_CLASSES = {v: k for k, v in CROP_CLASSES.items()}  # Reverse mapping

# Class Labels
POTATO_CLASSES = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']
POULTRY_CLASSES = ['Bumblefoot', 'Fowlpox', 'Healthy', 'coryza', 'crd']

def preprocess_image(image, model_type):
    """Preprocess image differently based on model type (TensorFlow/PyTorch)."""
    img = Image.open(io.BytesIO(image))

    if model_type == "tensorflow":
        img = img.resize((224, 224))  # Resize to match model input
        img_array = np.array(img) / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        return img_array
    elif model_type == "pytorch":
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor()
        ])
        return transform(img).unsqueeze(0)  # Add batch dimension

@app.route("/predict_potato", methods=["POST"])
def predict_potato():
    """Handle potato disease prediction."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img_array = preprocess_image(file.read(), "tensorflow")

    prediction = potato_model.predict(img_array)
    predicted_class = POTATO_CLASSES[np.argmax(prediction)]
    confidence = round(np.max(prediction) * 100, 2)

    return jsonify({"class": predicted_class, "confidence": confidence})

@app.route("/predict_poultry", methods=["POST"])
def predict_poultry():
    """Handle poultry disease prediction."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img_array = preprocess_image(file.read(), "tensorflow")  # Ensure proper preprocessing

    # Make prediction
    prediction = poultry_model.predict(img_array)
    predicted_class = np.argmax(prediction)
    confidence = float(np.max(prediction) * 100)

    # Ensure class index is within range
    if predicted_class >= len(POULTRY_CLASSES):
        return jsonify({"error": "Invalid prediction class"}), 500

    # Get class name
    pred_class = POULTRY_CLASSES[predicted_class]

    return jsonify({"class": pred_class, "confidence": round(confidence, 2)})

@app.route("/predict_crop", methods=["POST"])
def predict_crop():
    """Handle crop disease prediction."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img_array = preprocess_image(file.read(), "tensorflow")

    prediction = crop_model.predict(img_array)
    predicted_class = CROP_CLASSES[np.argmax(prediction)]
    confidence = round(np.max(prediction) * 100, 2)

    return jsonify({"class": predicted_class, "confidence": confidence})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

