import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Payment.css';
import payment from '../images/UPI.jpg';

const Payment = () => {
  const { applicationId } = useParams(); // Extract applicationId from URL parameters
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [referenceId, setReferenceId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReferenceIdChange = (e) => {
    setReferenceId(e.target.value);
  };

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess('');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('referenceId', referenceId);
    if (screenshot) {
      formData.append('screenshot', screenshot);
    }

    try {
      const response = await fetch(`http://localhost:8080/applications/${applicationId}/update-payment`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Set success message
        setSubmitSuccess('Application Submitted');

        // Redirect to home page after 10 seconds
        setTimeout(() => {
          navigate('/thank/page');
        }, 1500);
      } else {
        const errorData = await response.text(); // Adjust to parse text if the server returns a plain message
        setErrorMessage(errorData || 'Failed to submit payment.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <div className="upi-scanner">
        <img src={payment} alt="UPI Scanner" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="referenceId">Payment Reference ID:</label>
          <input
            type="text"
            id="referenceId"
            value={referenceId}
            onChange={handleReferenceIdChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="screenshot">Upload Payment Screenshot:</label>
          <input
            type="file"
            id="screenshot"
            accept="image/*"
            onChange={handleScreenshotChange}
            required
          />
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Payment'}
        </button>
      </form>
      {submitSuccess && <p className="success-message">{submitSuccess}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Payment;
