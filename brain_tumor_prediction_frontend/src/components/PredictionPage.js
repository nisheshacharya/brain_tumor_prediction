import React, { useState } from 'react';
import '../styles/predictionPage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const PredictionPage = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState('');

    // Valid file types
    const validFormats = ['image/jpeg', 'image/png', 'image/gif'];

    // Handler for image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagesArray = [];
        let errorMessages = [];

        files.forEach(file => {
            if (validFormats.includes(file.type)) {
                imagesArray.push(URL.createObjectURL(file));
            } else {
                errorMessages.push(`${file.name} was not uploaded because only images are allowed.`);
            }
        });

        if (errorMessages.length > 0) {
            setError(errorMessages.join(' '));
        } else {
            setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
            setError(''); // Clear any previous errors
        }
    };

    // Handler for deleting an image
    const handleDelete = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

            {error && <div className="error-message">{error}</div>}

            {/* Display selected images */}
            {selectedImages.length > 0 && (
                <div className="image-display-section">
                    <h3>Selected Images</h3>
                    <div className="image-gallery">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="image-container">
                                <img src={image} alt={`selected-preview-${index}`} className="selected-image" />
                                <button onClick={() => handleDelete(index)} className="delete-button">×</button>
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
