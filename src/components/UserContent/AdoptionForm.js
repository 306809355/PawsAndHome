import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authorization/AuthContext';
import './AdoptionForm.css';
import front from '../images/Petadopt.jpg';
import { FaCheckCircle, FaTimesCircle, FaHeart } from 'react-icons/fa';
import Footer from '../HeaderandFooter/Footer';

const AdoptionFactor = ({ icon, title, description }) => (
  <div className="grid-item">
    <div className="icon" aria-label={title}>
      {icon}
    </div>
    <strong>{title}</strong>
    <p>{description}</p>
  </div>
);

const AdoptionForm = () => {
  const { petId } = useParams();
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    petName: '',
    email: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    signature: '',
    agreeToTerms: false,
  });
  const [applicationId, setApplicationId] = useState(null);
  const navigate = useNavigate();

  const factors = [
    {
      icon: <FaCheckCircle />,
      title: 'Commitment',
      description: 'Adopting a pet is a long-term commitment. Be prepared for the responsibility of caring for another life for many years.',
    },
    {
      icon: <FaCheckCircle />,
      title: 'Routine',
      description: 'Pets require daily care, including feeding, exercise, and grooming. Adjust your daily routine to accommodate their needs.',
    },
    {
      icon: <FaCheckCircle />,
      title: 'Budget',
      description: 'Owning a pet involves expenses such as food, vet visits, grooming, and other costs. Be financially prepared.',
    },
    {
      icon: <FaCheckCircle />,
      title: 'Healthcare',
      description: 'Regular vet visits are essential. Make sure your pet is vaccinated and treated for parasites. Also, consider microchipping for easy identification if your pet gets lost.',
    },
    {
      icon: <FaTimesCircle />,
      title: 'Time Commitment',
      description: 'Pets require time and attention. If you have a busy schedule or travel frequently, it can be challenging to meet their needs.',
    },
    {
      icon: <FaTimesCircle />,
      title: 'Allergies',
      description: 'Some people are allergic to pet dander. Make sure no one in your household has severe allergies before adopting a pet.',
    }
  ];

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/users/profile/${userId}`)
        .then(response => response.json())
        .then(data => {
          setFormData(prevData => ({
            ...prevData,
            name: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            postalCode: data.pincode,
          }));
        })
        .catch(error => console.error('Error fetching user details:', error));
    }

    fetch(`http://localhost:8080/api/pets/${petId}`)
      .then(response => response.json())
      .then(data => {
        setFormData(prevData => ({
          ...prevData,
          petName: data.name,
        }));
      })
      .catch(error => console.error('Error fetching pet details:', error));
  }, [userId, petId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split('T')[0]; // Format as yyyy-mm-dd

    const submissionData = {
      user: { userId: userId }, // User reference
      pet: { id: petId }, // Pet reference
      applicationDate: currentDate,
    };

    fetch('http://localhost:8080/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.applicationId) {
          setApplicationId(data.applicationId);
          navigate(`/payment/${data.applicationId}`); // Redirect to Payment page with application ID
        } else {
          console.error('No application ID returned from the server.');
        }
      })
      .catch(error => console.error('Error submitting application:', error));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <label>Full Name*</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Pet Choice*</label>
            <input type="text" name="petName" value={formData.petName} readOnly />

            <label>Email Address*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Phone Number*</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

            <label>Address*</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />

            <label>Postal Code*</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
          </>
        );

      case 2:
        return (
          <>
            <div className="step4-container">
              <div className="step4-points">
                <ul>
                  <li>Agree to the adoption process and home check.</li>
                  <li>Agree to provide a lifetime commitment and not to surrender the pet.</li>
                  <li>Understand references will be checked.</li>
                  <li>Agree to indemnify Gone to the Dogs Rescue Inc. against any losses.</li>
                  <li>Understand health or behavior issues will be disclosed.</li>
                  <li>Verify all information provided is true and accurate.</li>
                </ul>
              </div>

              <div className="step4-content">
                <div className="agreement-section">
                  <label>
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                    />
                    I agree to the terms and conditions
                  </label>
                </div>
                <br />
                <div className="signature-section">
                  <label>
                    Signature*
                    <input
                      type="text"
                      name="signature"
                      value={formData.signature}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            <h1>Review and Submit</h1>
            <p><strong>Full Name:</strong> {formData.name}</p>
            <p><strong>Pet Choice:</strong> {formData.petName}</p>
            <p><strong>Email Address:</strong> {formData.email}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Postal Code:</strong> {formData.postalCode}</p>
            <p><strong>Signature:</strong> {formData.signature}</p>
          </>
        );
    }
  };

  return (
    <div className="adopt-page-container">
      <div className="adopt-background"></div>
      <div className="adopt-hero-container">
        <img src={front} alt="Pet" className="adopt-hero-image" />
        <div className="adopt-hero-text">Pet Adoption</div>
      </div>
      <div className="surrender-info grid-container">
        <div className="grid-header">
          <h2>Important Factors</h2>
          <p>Before proceeding with the pet adoption, please review the following factors that must be met for a successful adoption process:</p>
        </div>
        {factors.map((factor, index) => (
          <AdoptionFactor
            key={index}
            icon={factor.icon}
            title={factor.title}
            description={factor.description}
          />
        ))}
      </div>
      <div className="call-to-action grid-container">
        <div className="cta-item heart">
        <FaHeart className="heart-icon" aria-label="Heart Icon" />
          <span className="heart-text">Adopt, Don't Shop</span>
        </div>
        <div className="cta-item info">
          <p>#AdoptLove</p>
          <p>Approximately 1478 dogs & cats die every day on the road in India. ThePawsAndHome is on a mission to provide every dog and cat a home before 2035. It’s just one of the many ways ThePawsAndHome gives back and helps you become a part of something larger. Join ThePetStar Community and help set up pet houses in your surroundings for strays.</p>
        </div>
      </div>
      <div className="summary-and-form-grid">
        <div className="summary-section">
          <div className="summary-item">
            <h3>Total Number of Applications</h3>
            <p style={{ fontSize: '60px' }}>1234</p> {/* Replace with actual data */}
          </div>
          <div className="summary-item">
            <h3>Total Number of Pet Surrenders</h3>
            <p style={{ fontSize: '60px' }}>567</p> {/* Replace with actual data */}
          </div>
        </div>
        <form className="adoption-form" onSubmit={handleSubmit}>
          {renderStep()}
          <div className="form-navigation">
            {currentStep > 1 && <button type="button" onClick={previousStep} className="back-button">Back</button>}
            {currentStep < 2 && <button type="button" onClick={nextStep} className="next-button">Next</button>}
            {currentStep === 2 && <button type="submit" className="submit-button">Submit</button>}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AdoptionForm;
