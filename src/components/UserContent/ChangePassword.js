import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Authorization/AuthContext'; // Adjust the path as necessary
import './ChangePassword.css'; // Import the CSS file

function ChangePassword() {
  const { userId } = useAuth(); // Retrieve the current userId from context
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/change-password', {
        userId,
        oldPassword,
        newPassword,
        confirmPassword
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.error || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="profilepass-page">
      <div className="profilepass-container">
        <h2 className="profilepass-header">Change Password</h2>
        {error && <p className="profilepass-error">{error}</p>}
        {message && <p className="profilepass-message">{message}</p>}
        <form className="profilepass-form" onSubmit={handleSubmit}>
          <div className="profilepass-form-group">
            <label htmlFor="oldPassword" className="profilepass-label">Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              className="profilepass-input"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="profilepass-form-group">
            <label htmlFor="newPassword" className="profilepass-label">New Password:</label>
            <input
              type="password"
              id="newPassword"
              className="profilepass-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="profilepass-form-group">
            <label htmlFor="confirmPassword" className="profilepass-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="profilepass-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="profilepass-submit">Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
