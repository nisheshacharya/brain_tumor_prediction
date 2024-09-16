import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PredictionPage from './components/PredictionPage';
import ResultPage from './components/ResultPage.';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path = "/result" element={<ResultPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
