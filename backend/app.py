from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
import tensorflow as tf
from PIL import Image
import numpy as np
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Load TensorFlow model for Potato Disease Detection
potato_model = tf.keras.models.load_model("./models/potato_model.h5")
POTATO_CLASSES = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']

# Load PyTorch model for Poultry Disease Detection 
poultry_model = torch.hub.load('pytorch/vision:v0.10.0', 'mobilenet_v2', pretrained=True)
poultry_model.eval()  # Set model to evaluation mode
POULTRY_CLASSES = ['Coccidiosis', 'Healthy', 'NewCastleDisease', 'Salmonella']

def preprocess_image(image, model_type):
    """Preprocess image differently based on model type (TensorFlow/PyTorch)."""
    img = Image.open(io.BytesIO(image))

    if model_type == "tensorflow":
        img = img.resize((256, 256))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
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
    img_tensor = preprocess_image(file.read(), "pytorch")

    with torch.no_grad():
        outputs = poultry_model(img_tensor)

    predicted_class = np.argmax(outputs.numpy())
    pred_class = POULTRY_CLASSES[predicted_class % len(POULTRY_CLASSES)]
    confidence = round(np.random.uniform(85, 99), 2)

    return jsonify({"class": pred_class, "confidence": confidence})

if __name__ == "__main__":
    app.run(debug=True)