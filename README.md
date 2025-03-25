# 🌾 Farm Diseases Detection  
_An AI-Powered System for Detecting Potato and Poultry Diseases using Flask & React_  

![Farm Diseases Detection](https://via.placeholder.com/800x400.png?text=Farm+Diseases+Detection)

## 📌 Overview  
The **Farm Diseases Detection** project is an AI-based web application that helps farmers **identify diseases in potatoes and poultry** using **deep learning models**. Users can upload images, and the system will classify the disease and provide a confidence score.

- 🥔 **Potato Disease Detection**: Uses **TensorFlow (Keras)** to classify potato leaf diseases.  
- 🐔 **Poultry Disease Detection**: Uses **PyTorch** to detect poultry diseases.  
- 🖥️ **Frontend**: Built with **React** for a user-friendly experience.  
- ⚙ **Backend**: Implemented with **Flask API** for serving the models.  

---

## 🚀 Features  
✅ **AI-Based Disease Classification** – Detects diseases in potatoes and poultry.  
✅ **Easy Image Upload** – Users can upload images for real-time predictions.  
✅ **Confidence Score** – Displays model confidence in the prediction.  
✅ **React Frontend** – Provides an interactive UI for users.  
✅ **Flask API** – Serves predictions for both models.  

---

## 🗂️ Tech Stack  
| Component  | Technology Used |
|------------|----------------|
| **Frontend** | React, Tailwind CSS |
| **Backend** | Flask (API for TensorFlow and PyTorch models) |
| **Machine Learning** | TensorFlow, PyTorch |
| **Data Processing** | NumPy, Pillow |
| **Deployment** | Virtual Environment (venv) |

---

## 📦 Installation & Setup  

## 🔹 1. Clone the Repository  
```sh
git clone https://github.com/yourusername/farm-diseases-detection.git
cd farm-diseases-detection

## 🔹 2. Set Up Virtual Environment

## 🖥 For Windows (CMD/PowerShell)
```sh
python -m venv venv
venv\Scripts\activate

## 🖥 For macOS/Linux
```sh
python3 -m venv venv
source venv/bin/activate

## 🔹 3. Install Dependencies
```sh
pip install -r requirements.txt

## 🔹 4. Running the Project


## 🖥 Start the Flask Backend
```sh
python app.py

## This will start the backend API at:
## http://127.0.0.1:5000/


## 🖥 Start the React Frontend
```sh
cd frontend
npm install
npm start

## The frontend will be available at:
## http://localhost:3000/


## 🔹 5. Deactivating Virtual Environment
```sh
deactivate


📊 Model Details

🥔 Potato Disease Model (TensorFlow)
	•	Trained using TensorFlow Keras.
	•	Classes: Potato___Early_blight, Potato___Late_blight, Potato___healthy.
	•	Model Path: models/potato_model.h5.

🐔 Poultry Disease Model (PyTorch)
	•	Uses pre-trained MobileNetV2.
	•	Classes: Coccidiosis, Healthy, NewCastleDisease, Salmonella.
	•	Model Path: models/poultry_model.pth.

⸻

🛠️ Future Improvements
	•	Integrate More Crop & Livestock Diseases
	•	Enhance Model Accuracy Using Transfer Learning
	•	Deploy on Cloud for Real-Time Predictions

⸻

👨‍💻 Author

Developed by Naman Singla
📧 namansingla@myyahoo.com
🔗 LinkedIn - https://www.linkedin.com/in/namansingla7642/

⸻

📜 License

This project is open-source and available under the MIT License.



