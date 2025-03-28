# AI-Based Farm Disease Detection

## Overview
This project is an **AI-powered farm disease detection system** that allows users to upload images of **potato leaves** or **poultry feces** to identify potential diseases. The system utilizes deep learning models to classify and provide confidence scores for detected diseases.

## Features
- **Potato Disease Detection**: Identifies early and late blight in potato leaves.
- **Poultry Disease Detection**: Detects poultry diseases like Coccidiosis and Newcastle Disease.
- **Easy Image Upload**: Users can upload images, and the system processes them within seconds.
- **Real-Time Predictions**: Displays disease classification and confidence score.
- **User-Friendly Interface**: Built using **React** and **Tailwind CSS** for a clean UI.
- **Fast API Backend**: Flask-based API for processing images and returning results.

---

## Tech Stack
### **Frontend**
- **React.js**
- **Tailwind CSS**
- **React Router**
- **Axios** (for API requests)

### **Backend**
- **Flask** (Python)
- **TensorFlow / PyTorch** (for AI models)
- **OpenCV & Pillow** (image processing)

---

## Installation & Setup
### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/farm-disease-detection.git
cd farm-disease-detection
```

### **2. Backend Setup (Flask API)**
#### **Create Virtual Environment (Recommended)**
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```
#### **Install Dependencies**
```bash
pip install -r backend/requirements.txt
```
#### **Run Flask Server**
```bash
cd backend
python app.py
```
The Flask API should now be running at **`http://127.0.0.1:5000`**.

---

### **3. Frontend Setup (React App)**
#### **Install Dependencies**
```bash
cd frontend
npm install
```
#### **Run React App**
```bash
npm start
```
The React app should now be available at **`http://localhost:3000`**.

---

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict_potato` | `POST` | Predicts disease in potato leaves |
| `/predict_poultry` | `POST` | Predicts disease in poultry feces |
| `/predict_crop` | `POST` | Predicts disease in crop leaves |

**Example Request:**
```bash
POST http://127.0.0.1:5000/predict_potato
Content-Type: multipart/form-data
```
**Response Format:**
```json
{
  "class": "Early Blight",
  "confidence": 0.92
}
```

---

## Folder Structure
```
root/
│── backend/
│   ├── app.py  # Flask backend
│   ├── model.py  # AI model for predictions
│   ├── static/  # Stores trained models
│   ├── requirements.txt  # Dependencies
│
│── frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── api/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── tailwind.config.js
│
│── README.md  # Documentation
```

---

## Future Enhancements
- 🌿 **Support for More Crops** (e.g., wheat, corn, etc.)
- 📈 **Detailed Analysis Dashboard**
- 📊 **Live Disease Trends and Reports**
- 🌍 **Multi-language Support**

---

## Contributing
Feel free to contribute by submitting **issues** or **pull requests**.

---

## License
MIT License © 2025 Your Name
