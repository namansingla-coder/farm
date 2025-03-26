# Farm Disease Detection

## 📌 Overview
Farm Disease Detection is a machine learning-based project aimed at identifying diseases in farm animals and crops. This project integrates **Potato Disease Detection** and **Poultry Disease Detection** into a single platform using **Flask** (backend) and **React** (frontend).

## 🚀 Features
- **Potato Disease Detection**: Uses a trained deep learning model with TensorFlow to classify potato diseases.
- **Poultry Disease Detection**: Implements a PyTorch-based model to detect poultry diseases.
- **Integrated Web Application**: A unified React frontend with Flask backend to serve both detection models.
- **User-Friendly Interface**: Simple UI for farmers to upload images and get disease predictions.
- **API Support**: RESTful APIs for disease prediction.

## 🏗️ Tech Stack
### Frontend:
- **React.js** (UI)
- **Tailwind CSS** (Styling)

### Backend:
- **Flask** (API and integration)
- **TensorFlow** (Potato disease model)
- **PyTorch** (Poultry disease model)

### Additional Tools:
- **Streamlit** (For initial model testing)
- **Kaggle Dataset** (For training)
- **Postman** (For API testing)



## 📊 Dataset
- **Potato Disease Dataset**: Collected from [Kaggle](https://www.kaggle.com).
- **Poultry Disease Dataset**: Images of infected poultry categorized based on symptoms.

## 🛠️ Installation & Setup
### Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py

cd frontend
npm install
npm start

🔥 Usage
	1.	Open the web app.
	2.	Upload an image of a potato leaf or poultry.
	3.	The model predicts the disease and displays the results.

🧪 Testing
	•	Postman: Test API endpoints.
	•	Unit Tests: Run pytest for Flask and Jest for React.

📌 Future Enhancements
	•	Expand to detect diseases in other farm animals and crops.
	•	Improve model accuracy with more training data.
	•	Deploy as a cloud-based web service.

🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

📜 License

MIT License

⸻

🚜 Developed by Naman Singla

Let me know if you need modifications! 🚀




