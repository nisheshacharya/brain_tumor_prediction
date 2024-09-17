import axios from 'axios';

/**
 * Sends selected images and the chosen model to the backend for prediction.
 * 
 * @param {File[]} images - Array of image files selected by the user.
 * @param {string} model - The selected model.
 * @returns {Promise<number>} - The predicted result as a number from the backend.
 * @throws {Error} - Throws an error if the request fails.
 */
export const sendImagesForPrediction = async (images, model) => {
    try {
        const formData = new FormData();
        
        // Append images to FormData
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });
        
        // Append model name
        formData.append('model', model);

        // Send POST request to backend
        const response = await axios.post('backend enpoint', formData, { // write backend endpoint
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Assuming the backend returns a number as a response
        return response.data.prediction;
    } catch (error) {
        console.error('Error during prediction:', error);
        throw new Error('Failed to get prediction');
    }
};
