import React, { useState } from 'react';
import './PetSurrender.css'; // Ensure you have this CSS file for styling
import front from '../images/PetSurrenderimg/pet.jpg'; // Update the path as necessary
import Footer from '../HeaderandFooter/Footer';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PetSurrender = () => {
  const [formData, setFormData] = useState({
    petType: '',
    locationFound: '',
    dogStatus: '',
    description: '',
    dateFound: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      dogStatus: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending the data to a server
    console.log(formData);
  };

  // Placeholder counts
  const totalApplications = 0; // Replace with dynamic data
  const totalSurrenders = 0; // Replace with dynamic data

  return (
    <div className="surrender-page-container">
      <div className="surrender-background"></div>
      <div className="surrender-hero-container">
        <img src={front} alt="Pet" className="surrender-hero-image" />
        <div className="surrender-hero-text">Pet Pickup Request</div>
      </div>

      <div className="surrender-info grid-container">
        <div className="grid-header">
          <h2>Criteria</h2>
          <p>Before proceeding with the pet Pickup Request, please review the following criteria that must be met for a successful adoption process:</p>
        </div>

        <div className="grid-item">
          <div className="icon"><FaCheckCircle /></div>
          <strong>Animals at Risk of Euthanasia</strong>
          <p>Highest priority is given to animals in immediate danger of being euthanized.</p>
        </div>
        <div className="grid-item">
          <div className="icon"><FaCheckCircle /></div>
          <strong>Injured or Unhealthy Animals</strong>
          <p>We also prioritize animals needing urgent medical attention that their current owners cannot provide.</p>
        </div>
        <div className="grid-item">
          <div className="icon"><FaCheckCircle /></div>
          <strong>Smooth Transition</strong>
          <p>We are committed to ensuring a smooth transition for the pet.</p>
        </div>
        <div className="grid-item">
          <div className="icon"><FaCheckCircle /></div>
          <strong>Lack of Socialization</strong>
          <p>Pets that have not been properly socialized may face challenges in rehoming. Behavioral assessments might be necessary.</p>
        </div>
        <div className="grid-item">
          <div className="icon"><FaTimesCircle /></div>
          <strong>Pets Not Owned by the Surrenderer</strong>
          <p>We cannot accept pets that are not owned by the person surrendering them. Proof of ownership is required.</p>
        </div>
        <div className="grid-item">
          <div className="icon"><FaTimesCircle /></div>
          <strong>Pet Boarding Not Allowed</strong>
          <p>We do not accept pets for temporary boarding. We only handle surrenders where the pet is permanently rehomed.</p>
        </div>
      </div>

      <div className="summary-and-form-grid">
        <div className="summary-section">
          <div className="summary-item">
            <h3>Total Number of Applications</h3>
            <p style={{fontSize:'60px'}}>{totalApplications}</p>
          </div>
          <div className="summary-item">
            <h3>Total Number of Pet Surrenders</h3>
            <p style={{fontSize:'60px'}}>{totalSurrenders}</p>
          </div>
        </div>
        <div className="form-section">
        <form className="pet-surrender-form" onSubmit={handleSubmit}>
  <label htmlFor="petType">Pet Type*</label>
  <input
    id="petType"
    type="text"
    name="petType"
    value={formData.petType}
    onChange={handleChange}
    required
  />

  <label htmlFor="locationFound">Where Did You Find the Pet?*</label>
  <input
    id="locationFound"
    type="text"
    name="locationFound"
    value={formData.locationFound}
    onChange={handleChange}
    required
  />

  <label htmlFor="dateFound">When Did You Find the Pet?*</label>
  <input
    id="dateFound"
    type="date"
    name="dateFound"
    value={formData.dateFound}
    onChange={handleChange}
    required
  />

  <fieldset>
    <legend style={{ textAlign: 'left' }}>Dog Status*</legend>
    <div className="radio-options">
      <label>
        <input
          type="radio"
          name="dogStatus"
          value="Injury"
          checked={formData.dogStatus === 'Injury'}
          onChange={handleRadioChange}
          required
        />
        Injury
      </label>
      <label>
        <input
          type="radio"
          name="dogStatus"
          value="Unhealthy"
          checked={formData.dogStatus === 'Unhealthy'}
          onChange={handleRadioChange}
          required
        />
        Unhealthy
      </label>
      <label>
        <input
          type="radio"
          name="dogStatus"
          value="Lost"
          checked={formData.dogStatus === 'Lost'}
          onChange={handleRadioChange}
          required
        />
        Lost
      </label>
      <label>
        <input
          type="radio"
          name="dogStatus"
          value="Other"
          checked={formData.dogStatus === 'Other'}
          onChange={handleRadioChange}
          required
        />
        Other
      </label>
    </div>
  </fieldset>

  <label htmlFor="description">Description*</label>
  <textarea
    id="description"
    name="description"
    value={formData.description}
    onChange={handleChange}
    rows="5" // Adjust the number of visible rows
    cols="100" // Adjust the number of visible columns
    required
  ></textarea>
  <br></br>

  <button type="submit" className="submit-button">Submit</button>
</form>


        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PetSurrender;
