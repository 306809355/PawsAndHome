import React, { useState } from 'react';
import './Payment.css';

import payment from '../images/UPI.jpg';

const Payment = () => {
  const [referenceId, setReferenceId] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const handleReferenceIdChange = (e) => {
    setReferenceId(e.target.value);
  };

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log('Reference ID:', referenceId);
    console.log('Screenshot:', screenshot);
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
        <button type="submit" className="submit-btn">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;
