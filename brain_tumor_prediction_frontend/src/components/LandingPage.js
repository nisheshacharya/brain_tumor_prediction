import React from 'react'; 
import '../styles/landingPage.css'; 
import {useNavigate} from 'react-router-dom';

const LandingPage = () => {
const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/predict');

    console.log("HandleStartClick clicked")
  };  

  return (
    <div className="landing-container">
      <h1>Brain Tumor Prediction</h1>
      <button className="start-button" onClick={handleStartClick}>
        Let's Start
      </button>
    </div>
  );
};

export default LandingPage;
