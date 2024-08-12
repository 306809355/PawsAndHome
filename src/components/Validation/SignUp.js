import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaHome } from 'react-icons/fa';
import { GoogleLogin } from 'react-google-login';
import './SignUp.css'; 
import signupimage from '../images/login.jpg'; // Ensure the correct path and extension
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    dob: '',
    email: '',
    phoneNumber: '',
    address: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    residentialType: '',
    otherResidentialType: '',
    extraField: '' // Added extra field for CAPTCHA or similar
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'password' || name === 'confirmPassword') {
      validatePassword();
    }
  };

  const validateStep = (currentStep) => {
    let errors = {};
    
    if (currentStep === 1) {
      if (!formData.username.trim()) errors.username = 'Username is required';
      if (!formData.dob.trim()) errors.dob = 'Date of Birth is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      else if (!isValidEmail(formData.email)) errors.email = 'Invalid email format';
      if (!formData.phoneNumber.trim()) errors.phone = 'Phone number is required';
    } else if (currentStep === 2) {
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.pincode.trim()) errors.pincode = 'Pincode is required';
      if (formData.residentialType === 'other' && !formData.otherResidentialType.trim()) {
        errors.otherResidentialType = 'Please specify other residential type';
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors).join('\n'));
      setShowErrorModal(true);
      return false;
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      try {
        
        const requestData = { ...formData};

        // Replace with your Spring Boot backend URL
        const response = await axios.post('http://localhost:8080/users', requestData);
        console.log('User registered:', response.data);
        navigate('/login'); // Navigate to home or wherever after successful signup
      } catch (error) {
        console.error('There was an error!', error);
        setErrorMessage('There was an error during registration.');
        setShowErrorModal(true);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGoogleSignIn = (response) => {
    if (response.error) {
      console.error('Google Sign-In Error:', response.error);
    } else {
      console.log('Google Sign-In Success:', response)
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className='signup-page-container'>
      {showErrorModal && (
        <div className="error-modal">
          <div className="error-modal-content">
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button onClick={handleCloseErrorModal}>Close</button>
          </div>
        </div>
      )}
      <div className='signup-background'></div>
      <div className='signup-content'>
        <div className='signup-image-section'>
          <img src={signupimage} alt='Sign Up' className='signup-hero-image' />
        </div>
        <div className='signup-content-section'>
          <div className='signup-form-container'>
            <h1 className="signup-h1">Create Your Account</h1>
            <div className="signup-progress">
              <div className={`progress-step ${step >= 1 ? 'active' : ''}`} data-step="1"></div>
              <div className={`progress-line ${step > 1 ? 'active' : ''}`}></div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`} data-step="2"></div>
              <div className={`progress-line ${step > 2 ? 'active' : ''}`}></div>
              <div className={`progress-step ${step >= 3 ? 'active' : ''}`} data-step="3"></div>
            </div>
            <form className="signup-form" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <FaUser className="signup-icon" />
                      <input
                        type="text"
                        className="signup-usernameInput"
                        placeholder='Username'
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.username && <div className="signup-error">{errors.username}</div>}
                  </div>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <FaBirthdayCake className="signup-icon" />
                      <input
                        type="date"
                        className="signup-dobInput"
                        placeholder='Date of Birth'
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.dob && <div className="signup-error">{errors.dob}</div>}
                  </div>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <FaEnvelope className="signup-icon" />
                      <input
                        type="email"
                        className="signup-emailInput"
                        placeholder='Email'
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && <div className="signup-error">{errors.email}</div>}
                  </div>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <FaPhone className="signup-icon" />
                      <input
                        type="text"
                        className="signup-phoneInput"
                        placeholder='PhoneNumber'
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phone && <div className="signup-error">{errors.phone}</div>}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <FaHome className="signup-icon" />
                      <input
                        type="text"
                        className="signup-addressInput"
                        placeholder='Address'
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.address && <div className="signup-error">{errors.address}</div>}
                  </div>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <FaMapMarkerAlt className="signup-icon" />
                      <input
                        type="text"
                        className="signup-pincodeInput"
                        placeholder='Pincode'
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.pincode && <div className="signup-error">{errors.pincode}</div>}
                  </div>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <select
                        className="signup-residentialTypeInput"
                        id="residentialType"
                        name="residentialType"
                        value={formData.residentialType}
                        onChange={handleChange}
                      >
                        <option value="">Select Residential Type</option>
                        <option value="own">Own House</option>
                        <option value="rent">Rent House</option>
                        <option value="apartment">Apartment</option>
                        <option value="separate">Separate House</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {formData.residentialType === 'other' && (
                      <div className="signup-form-group">
                        <div className="signup-input-box">
                          <input
                            type="text"
                            className="signup-otherResidentialTypeInput"
                            placeholder="Specify Other"
                            id="otherResidentialType"
                            name="otherResidentialType"
                            value={formData.otherResidentialType}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.otherResidentialType && <div className="signup-error">{errors.otherResidentialType}</div>}
                      </div>
                    )}
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <FaEye className="signup-icon" />
                      <input
                        type="password"
                        className="signup-passwordInput"
                        placeholder='Password'
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    {passwordError && <div className="signup-error">{passwordError}</div>}
                  </div>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <FaEyeSlash className="signup-icon" />
                      <input
                        type="password"
                        className="signup-confirmPasswordInput"
                        placeholder='Confirm Password'
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {passwordError && <div className="signup-error">{passwordError}</div>}
                  </div>
                  <div className="signup-form-group">
                    <div className="signup-input-box">
                      <input
                        type="text"
                        className="signup-extraFieldInput"
                        placeholder='Captcha'
                        id="extraField"
                        name="extraField"
                        value={formData.extraField}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="signup-navigation-buttons">
                {step > 1 && (
                  <button type="button" className="signup-nav-btn" onClick={() => setStep(step - 1)}>
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button type="button" className="signup-nav-btn" onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="signup-nav-btn"
                    disabled={
                      !formData.password ||
                      !formData.confirmPassword ||
                      formData.password !== formData.confirmPassword
                    }
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>
            <div className="signup-or">
              <div className="signup-or-line"></div>
              <div className="signup-or-text">or</div>
              <div className="signup-or-line"></div>
            </div>
            <div className="signup-google-signin">
              <GoogleLogin
                clientId="YOUR_CLIENT_ID" // Replace with your Google Client ID
                buttonText="Sign up with Google"
                onSuccess={handleGoogleSignIn}
                onFailure={handleGoogleSignIn}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="signup-footer">
              <p>Already have an account? <Link to="/">Log In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

