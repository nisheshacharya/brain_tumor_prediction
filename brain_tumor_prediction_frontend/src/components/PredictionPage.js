import React, { useState } from 'react';
import '../styles/predictionPage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const PredictionPage = () => {
    const [selectedImages, setSelectedImages] = useState([]);
  
    // Handler for image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        const imagesArray = files.map((file) => URL.createObjectURL(file)); // Create object URLs for images
        setSelectedImages((prevImages) => [...prevImages, ...imagesArray]); // Add new images to the state
    };
  
    // Handler for removing an image
    const handleImageRemove = (imageToRemove) => {
        setSelectedImages((prevImages) => prevImages.filter(image => image !== imageToRemove));
    };
  
    return (
        <div className="prediction-page">
            <h2>Choose a model</h2>
            <select className="model-dropdown">
                <option value="modelA">Model A</option>
                <option value="modelB">Model B</option>
                <option value="modelC">Model C</option>
            </select>
  
            <div className="image-upload-section">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload-input"
                />
                <button className="predict-button">Upload and Predict</button>
            </div>
  
            {/* Display selected images */}
            {selectedImages.length > 0 && (
                <div className="image-display-section">
                    <h3>Selected Images</h3>
                    <div className="image-gallery">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image} alt={`selected-preview-${index}`} className="image-preview" />
                                <button 
                                    className="delete-button"
                                    onClick={() => handleImageRemove(image)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
  
            {/* This is just for testing purposes */}
            <div className="prediction-result">
                <h3>Prediction Result</h3>
                <p>Random text for prediction result display</p>
            </div>
        </div>
    );
};

export default PredictionPage;