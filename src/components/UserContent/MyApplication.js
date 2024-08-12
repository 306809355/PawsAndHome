import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Authorization/AuthContext';
import './MyApplication.css';

const MyApplications = () => {
  const { userId } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/applications/user/${userId}`)
        .then(response => {
          setApplications(response.data);
          setFilteredApplications(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the applications!', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    // Filter applications based on search term
    setFilteredApplications(
      applications.filter(app => app.pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, applications]);

  // Calculate totals with case-insensitive status check
  const totalApplications = filteredApplications.length;
  const pendingApplications = filteredApplications.filter(app => app.status.toLowerCase() === 'pending').length;
  const approvedApplications = filteredApplications.filter(app => app.status.toLowerCase() === 'approved').length;

  return (
    <div className="applications-container">
      <h2>My Applications</h2>
      
      <div className="my-applications-summary">
        <div className="summary-item">
          <p>Total Applications:</p>
          <br></br>
          <p>{totalApplications}</p>
        </div>
        <div className="summary-item">
          <p>Pending Applications:</p>
        <br></br> 
          <p>{pendingApplications}</p>
        </div>
        <div className="summary-item">
          <p>Approved Applications:</p>
          <br></br>
          <p>{approvedApplications}</p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by Dog Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredApplications.length > 0 ? (
        <table className="applications-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Pet Name</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Payment Reference ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application, index) => (
              <tr key={application.applicationId}>
                <td>{index + 1}</td>
                <td>{application.pet.name}</td>
                <td>{new Date(application.applicationDate).toLocaleDateString()}</td>
                <td>{application.status}</td>
                <td>{application.comments || 'N/A'}</td>
                <td>{application.paymentReferenceId || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have not submitted any applications yet.</p>
      )}
    </div>
  );
};

export default MyApplications;
