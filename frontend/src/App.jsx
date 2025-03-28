import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import PotatoDetection from "./pages/PotatoDetection";
import PoultryDetection from "./pages/PoultryDetection";
import CropDetection from "./pages/CropDiseaseDetection";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/potato-detection" element={<PotatoDetection />} />
        <Route path="/crop-detection" element={<CropDetection />} />
        <Route path="/poultry-detection" element={<PoultryDetection />} />
        

      </Routes>
    </Router>
  );
}

export default App;