// ErrorLogger.js

import { BaseUrl } from "utils/Constants";

const logError = (errorMessage, fileName) => {
  // Construct the request body
  const requestBody = {
    error_message: errorMessage, // Use the key 'error_message' as expected by the API
    file_name: fileName          // Use the key 'file_name' as expected by the API
  };

  console.log("in logError");

  // Send a POST request to the server endpoint
  fetch(`${BaseUrl}python/reactsaveError`, { // Adjust the URL to match your server
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    if (data.success) {
      console.warn('Error logged successfully');
    } else {
      throw new Error(data.message || 'Failed to log error');
    }
  })
  .catch(error => {
    console.error('Error logging error:', error);
  });
};
  export default logError;
  