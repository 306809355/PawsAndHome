import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaCalendarAlt, FaHome, FaPencilAlt } from 'react-icons/fa';
import { useAuth } from '../Authorization/AuthContext';
import Avatar from 'react-avatar';

function Profile() {
  const { isLoggedIn, userId, userData } = useAuth();
  const [profileData, setProfileData] = useState(userData);
  const [loading, setLoading] = useState(!userData); // Loading only if no userData
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="profile-loading">Loading your profile...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>
      <div className="profile-card">
        <div className="profile-avatar">
          <Avatar
            name={profileData?.username || 'User'}
            size="100"
            round={true}
            color="#007bff" // Custom color for the avatar background
            textSizeRatio={2} // Adjust text size
          />
        </div>
        <div className="profile-info">
          <FaUser className="profile-icon" />
          <div className="profile-detail">
            <label className="profile-label">Name:</label>
            <span className="profile-value">{profileData?.username}</span>
          </div>
        </div>
        <div className="profile-info">
          <FaEnvelope className="profile-icon" />
          <div className="profile-detail">
            <label className="profile-label">Email:</label>
            <span className="profile-value">{profileData?.email}</span>
          </div>
        </div>
        <div className="profile-info">
          <FaPhone className="profile-icon" />
          <div className="profile-detail">
            <label className="profile-label">Phone:</label>
            <span className="profile-value">{profileData?.phoneNumber}</span>
          </div>
        </div>
        <div className="profile-info">
          <FaMapMarkedAlt className="profile-icon" />
          <div className="profile-detail">
            <label className="profile-label">Address:</label>
            <span className="profile-value">{profileData?.address}</span>
          </div>
        </div>
        <div className="profile-info">
          <FaHome className="profile-icon" />
          <div className="profile-detail">
            <label className="profile-label">Residential Type:</label>
            <span className="profile-value">{profileData?.residentialType}</span>
          </div>
        </div>
        <div className="profile-info">
          <FaPencilAlt className="profile-icon" />
          <div className="profile-detail">
            <label className="profile-label">Pincode:</label>
            <span className="profile-value">{profileData?.pincode}</span>
          </div>
        </div>
        <div className="profile-info">
          <FaCalendarAlt className="profile-icon" />
          <div className="profile-detail">
            <label className="profile-label">Date of Birth:</label>
            <span className="profile-value">{profileData?.dob}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
