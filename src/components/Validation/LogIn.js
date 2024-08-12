import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaPhone, FaKey } from 'react-icons/fa';
import axios from 'axios';
import './LogIn.css';
import loginimage from '../images/login.jpg';
import { useAuth } from '../Authorization/AuthContext';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [method, setMethod] = useState('email');
  const [otpRequested, setOtpRequested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    setLoginData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm(loginData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const url = method === 'email'
          ? 'http://localhost:8080/users/login/email'
          : 'http://localhost:8080/users/login/phone';
  
        const response = await axios.post(url, loginData);
  
        // Log the entire response data to understand its structure
        console.log('Response data:', response.data);
  
        if (response.status === 200) {
          const { userId, userData } = response.data;
          console.log('Login successful:', response.data);
          console.log(`Your user id: ${userId}`); // Log user ID here
  
          login(userId, userData); // Update context with user data
          navigate('/dashboard');
        } else {
          setErrors({ apiError: 'Login failed' });
          setShowModal(true);
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ apiError: 'There was an error during login.' });
        setShowModal(true);
      }
    } else {
      setErrors(validationErrors);
      setShowModal(true);
    }
  };
  

  const validateForm = (data) => {
    let errors = {};
    if (method === 'email') {
      if (!data.email.trim()) {
        errors.email = 'Email is required';
      } else if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email format';
      }
      if (!data.password.trim()) {
        errors.password = 'Password is required';
      } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }
    } else if (method === 'phone') {
      if (!data.phone.trim()) {
        errors.phone = 'Phone number is required';
      }
      if (otpRequested && !data.otp.trim()) {
        errors.otp = 'OTP is required';
      }
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGetOtp = () => {
    if (!loginData.phone.trim()) {
      setErrors({ phone: 'Phone number is required to get OTP' });
      setShowModal(true);
      return;
    }
    console.log('OTP sent to:', loginData.phone);
    setOtpRequested(true);
    setErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (method === 'phone') {
        otpRequested ? handleSubmit(e) : handleGetOtp();
      } else if (method === 'email') {
        handleSubmit(e);
      }
    }
  };

  return (
    <div className='login-page-container'>
      <div className='login-background'></div>
      <div className='login-content'>
        <div className='login-image-section'>
          <img src={loginimage} alt='Login Hero' className='login-hero-image' />
        </div>
        <div className='login-content-section'>
          <div className='login-form-container'>
            <h1 className="login-h1">Welcome !!!</h1>
            <table className="login-toggle-table">
              <tbody>
                <tr>
                  <td
                    className={`login-toggle-table-cell ${method === 'email' ? 'active' : ''}`}
                    onClick={() => setMethod('email')}
                  >
                    Email
                  </td>
                  <td
                    className={`login-toggle-table-cell ${method === 'phone' ? 'active' : ''}`}
                    onClick={() => setMethod('phone')}
                  >
                    Phone Number
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <form className="login-form" onSubmit={handleSubmit}>
              {method === 'email' && (
                <>
                  <div className="login-form-group">
                    <div className="login-input-box">
                      <FaEnvelope className="login-icon" />
                      <input
                        type="email"
                        className="login-emailInput"
                        placeholder='Enter your e-mail'
                        id="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    {errors.email && <div className="login-error">{errors.email}</div>}
                  </div>
                  <div className="login-form-group">
                    <div className="login-input-box">
                      <FaLock className="login-icon" />
                      <input
                        type="password"
                        className="login-passwordInput"
                        placeholder='Enter your Password'
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    {errors.password && <div className="login-error">{errors.password}</div>}
                  </div>
                </>
              )}
              {method === 'phone' && (
                <>
                  <div className="login-form-group">
                    <div className="login-input-box">
                      <FaPhone className="login-icon" />
                      <input
                        type="text"
                        className="login-phoneNumberInput"
                        placeholder='Enter your phone number'
                        id="phone"
                        name="phone"
                        value={loginData.phone}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    {errors.phone && <div className="login-error">{errors.phone}</div>}
                  </div>
                  {!otpRequested && (
                    <button
                      type="button"
                      className="login-btn"
                      onClick={handleGetOtp}
                    >
                      Get OTP
                    </button>
                  )}
                  {otpRequested && (
                    <div className="login-form-group">
                      <div className="login-input-box">
                        <FaKey className="login-icon" />
                        <input
                          type="text"
                          className="login-otpInput"
                          placeholder='Enter OTP'
                          id="otp"
                          name="otp"
                          value={loginData.otp}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      {errors.otp && <div className="login-error">{errors.otp}</div>}
                    </div>
                  )}
                </>
              )}
              {(method === 'email' || otpRequested) && (
                <div className="login-form-buttons">
                  <button type="submit" className="login-btn">Log In</button>
                </div>
              )}
              <div className="login-additional-actions">
                <Link to="/signup">
                  <button type="button" className="login-btn">Sign Up</button>
                </Link>
                <button type="button" className="login-btn">Forgot Password?</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Error</h2>
            {Object.values(errors).map((error, index) => (
              <div key={index} className="modal-error-message">{error}</div>
            ))}
            <button onClick={closeModal} className="modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
