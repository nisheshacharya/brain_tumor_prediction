import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/predictionPage.css';
import {sendImagesForPrediction} from '../network/network.js'



const PredictionPage = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [fileObjects, setFileObjects] = useState([]); //to store image files
    const [error, setError] = useState('');
    const [selectedModel, setSelectedModel] = useState({model:""});
    const [largeImage, setLargeImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const handleEscapePress = (event) => {
            if (event.key === 'Escape' && largeImage) {
              closeLargeImage();
            }else if(event.key === 'ArrowRight' && largeImage){
                showNextImage();   
            }else if(event.key === 'ArrowLeft' && largeImage){
                showPreviousImage();
            }
          };
        document.addEventListener('keydown', handleEscapePress)
        return(()=>{
            document.removeEventListener('keydown', handleEscapePress)
        })
    },[largeImage, selectedImages, currentImageIndex])

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
                errorMessages.push(`Upload unsuccessful because ${file.name} is not an image file.`);
            }
        });

        if (errorMessages.length > 0) {
            setError(errorMessages.join(' '));
        } else {
            setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
            setFileObjects((prevFiles) => [...prevFiles, ...files]);
            setError(''); // Clearing any previous errors
        }
    };

    //Function for select model

    const changeModel = (e) =>{
        setSelectedModel({model: e.target.value});
    }

    // Handler for deleting an image
    const handleDelete = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setFileObjects((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

       // Function to set the clicked image as large
       const handleImageClick = (image,index) => {
        setLargeImage(image);
        setCurrentImageIndex(index)
    };

    const closeLargeImage = () => {
        setLargeImage(null);
        setCurrentImageIndex(null);
    };

    const showNextImage = () =>{
        if(selectedImages.length>0){   
            const nextIndex = (currentImageIndex +1)% selectedImages.length;
            setLargeImage(selectedImages[nextIndex])
            setCurrentImageIndex(nextIndex);
        }
    }
    const showPreviousImage = () => {
        if (selectedImages.length > 0) {
            const prevIndex = (currentImageIndex - 1 + selectedImages.length) % selectedImages.length;
            setLargeImage(selectedImages[prevIndex]);
            setCurrentImageIndex(prevIndex);
        }
    };


    const predictResult =async ()=>{
        console.log(selectedModel);
       
        if(selectedModel.model!== ""){
            try{
                const prediction = await sendImagesForPrediction(fileObjects, selectedModel.model);
                setPrediction(prediction)
                setShowResult(true);
            // navigate(('/result'));
             }catch{
                setError('Failed to get prediction');
             }
        }else{
            alert("Select a model")
        }
    };

    return (
        <div className="prediction-page">
            <h2>Choose a model</h2>
            <select className="model-dropdown" onChange={changeModel}>
                <option value="">Select the model</option>
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
                <button className="predict-button" onClick={predictResult}>Upload and Predict</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Display selected images */}
            {selectedImages.length > 0 && (
                <div className="image-display-section">
                    <h3 className='image-display-header'>Selected Images</h3>
                    <div className="image-gallery">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="image-container">
                                <img src={image} alt={`selected-preview-${index}`} className="selected-image" onClick={()=> handleImageClick(image, index)} />
                                <button onClick={() => handleDelete(index)} className="delete-button">×</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
             {largeImage && (
                 <div className="large-image-overlay">
                 <div className="large-image-container">
                   <button className="close-large-image" onClick={closeLargeImage}>
                     ×
                   </button>
                   <img src={largeImage} alt="Large View" className="large-image" />
                 </div>
               </div>
            )}
            {showResult && (
              <div className="result-container fancy-result">
              <div className="result-header">Prediction Result</div>
              <div className="result-content">
                <div className="result-value">The probability of a brain tumor is <strong>{prediction}%</strong></div>
                <div className="result-icon">🧠</div>
              </div>
            </div>
            )}
           
        </div>
    );
};

export default PredictionPage;
