import React, { useState } from 'react';


const PredictionPage = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePredict = () => {
    
    setResult('This is a test prediction result.'); 
  };

  return (
    <div className="prediction-container">
      <h2>Make a Prediction</h2>

      <div className="form-group">
        <label>Choose a Model:</label>
        <select value={selectedModel} onChange={handleModelChange}>
          <option value="">Select a model</option>
          <option value="A">Model A</option>
          <option value="B">Model B</option>
          <option value="C">Model C</option>
        </select>
      </div>

      <div className="form-group">
        <label>Upload Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>

      <button className="upload-button" onClick={handlePredict}>
        Upload and Predict
      </button>

      {result && (
        <div className="result-section">
          <h3>Prediction Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
