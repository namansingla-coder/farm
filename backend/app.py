from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import tensorflow as tf
import torchvision.transforms as transforms
import pickle
import gdown
from PIL import Image
import numpy as np
import io
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Google Drive file ID for Poultry Model
POULTRY_MODEL_DRIVE_ID = "https://drive.google.com/file/d/1isifj4_xUzXfUe9qbKLuqNQm5ldYvglo/view?usp=sharing"
POULTRY_MODEL_PATH = "./models/poultry_disease_model.h5"

# Ensure models directory exists
os.makedirs("./models", exist_ok=True)

# Download Poultry Disease Model if not present
if not os.path.exists(POULTRY_MODEL_PATH):
    print("Downloading Poultry Disease Model...")
    gdown.download(f"https://drive.google.com/uc?id={POULTRY_MODEL_DRIVE_ID}", POULTRY_MODEL_PATH, quiet=False)
    print("Download Complete!")

# Load TensorFlow model for Potato Disease Detection
potato_model = tf.keras.models.load_model("./models/potato_model.h5")
POTATO_CLASSES = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']

# Load PyTorch model for Poultry Disease Detection
poultry_model = load_model(POULTRY_MODEL_PATH)
POULTRY_CLASSES = ['Bumblefoot', 'Fowlpox', 'Healthy', 'coryza', 'crd']

# Load TensorFlow model for Crop Disease Detection
crop_model = tf.keras.models.load_model("./models/crop_disease_model.h5")
with open("./models/class_indices.pkl", "rb") as f:
    CROP_CLASSES = pickle.load(f)
CROP_CLASSES = {v: k for k, v in CROP_CLASSES.items()}  # Reverse mapping

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
    app.run()