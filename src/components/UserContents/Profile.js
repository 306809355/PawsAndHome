
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaCalendarAlt, FaHome, FaPencilAlt } from 'react-icons/fa';
import { useAuth } from '../Authorization/AuthContext';
import Avatar from 'react-avatar';

function Profile() {
  const { isLoggedIn, userId, userData } = useAuth();
  const [profileData, setProfileData] = useState(userData);
  const [loading, setLoading] = useState(!userData);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    if (!userId || isNaN(userId)) {
      setError('Invalid user ID');
      setLoading(false);
      return;
    }

    if (userData) {
      setProfileData(userData);
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/profile/${userId}`);
        setProfileData(response.data);
      } catch (err) {
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [isLoggedIn, userId, userData]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    // Add form submission logic here
    try {
      await axios.put(`http://localhost:8080/users/profile/${userId}`, profileData);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile data.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="profile-loading">Loading your profile...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  return (
    <div className="profile-page-container">
      <div className='profile-background'></div>
      <h1 className="profile-title">Your Profile</h1>
      <div className="profile-card">
        <div className="profile-avatar">
          <Avatar
            name={profileData?.username || 'User'}
            size="100"
            round={true}
            color="#007bff"
            textSizeRatio={2}
          />
        </div>
        <div className="profile-details-grid">
          {Object.entries({
            username: { icon: FaUser, label: 'Name' },
            email: { icon: FaEnvelope, label: 'Email' },
            phoneNumber: { icon: FaPhone, label: 'Phone' },
            address: { icon: FaMapMarkedAlt, label: 'Address' },
            residentialType: { icon: FaHome, label: 'Residential Type' },
            pincode: { icon: FaPencilAlt, label: 'Pincode' },
            dob: { icon: FaCalendarAlt, label: 'Date of Birth' },
          }).map(([key, { icon: Icon, label }]) => (
            <div key={key} className="profile-info">
              <Icon className="profile-icon" />
              <div className="profile-detail">
                <label className="profile-label">{label}:</label>
                {isEditing ? (
                  <input
                    type={key === 'dob' ? 'date' : 'text'}
                    name={key}
                    value={profileData[key] || ''}
                    onChange={handleInputChange}
                    className="profile-edit-input"
                  />
                ) : (
                  <span className="profile-value">{profileData[key]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="profile-edit-button" onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}

export default Profile;
