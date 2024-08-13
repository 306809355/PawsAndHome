import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewApplication.css'; // Import the CSS file

const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState('All');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/applications');
        setApplications(response.data);
        setFilteredApplications(response.data);
      } catch (err) {
        setError('Failed to fetch applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = [...applications];

    if (statusFilter !== 'All') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (startDateFilter) {
      filtered = filtered.filter(app => new Date(app.applicationDate) >= new Date(startDateFilter));
    }

    if (endDateFilter) {
      filtered = filtered.filter(app => new Date(app.applicationDate) <= new Date(endDateFilter));
    }

    setFilteredApplications(filtered);
  }, [statusFilter, startDateFilter, endDateFilter, applications]);

  const handleApprove = async (applicationId) => {
    try {
      await axios.post(`http://localhost:8080/applications/${applicationId}/approve`);
      setApplications(prev => prev.map(app =>
        app.applicationId === applicationId ? { ...app, status: 'approved' } : app
      ));
    } catch (err) {
      setError('Failed to approve application.');
    }
  };

  const handleDeny = async (applicationId) => {
    try {
      await axios.post(`http://localhost:8080/applications/${applicationId}/deny`);
      setApplications(prev => prev.map(app =>
        app.applicationId === applicationId ? { ...app, status: 'denied' } : app
      ));
    } catch (err) {
      setError('Failed to deny application.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="viewapplication-container">
      <h1>Applications List</h1>
      <div className="viewapplication-summary">
        <div className="viewapplication-summary-item">
          <p>Approved:</p>
          <p>{applications.filter(app => app.status === 'approved').length}</p>
        </div>
        <div className="viewapplication-summary-item">
          <p>Denied:</p>
          <p>{applications.filter(app => app.status === 'denied').length}</p>
        </div>
        <div className="viewapplication-summary-item">
          <p>Pending:</p>
          <p>{applications.filter(app => app.status === 'pending').length}</p>
        </div>
      </div>
      
      <div className="viewapplication-filters">
        <label>Status:
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="pending">Pending</option>
          </select>
        </label>
        
        <label>Start Date:
          <input
            type="date"
            value={startDateFilter}
            onChange={e => setStartDateFilter(e.target.value)}
          />
        </label>
        
        <label>End Date:
          <input
            type="date"
            value={endDateFilter}
            onChange={e => setEndDateFilter(e.target.value)}
          />
        </label>
      </div>
      
      <br />
      <br />
      <table className="viewapplication-table">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>User ID</th>
            <th>Pet ID</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>Comments</th>
            <th>Payment Reference ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map(application => (
            <tr key={application.applicationId}>
              <td>{application.applicationId}</td>
              <td>{application.user ? application.user.userId : 'N/A'}</td>
              <td>{application.pet ? application.pet.petId : 'N/A'}</td>
              <td>{new Date(application.applicationDate).toLocaleDateString()}</td>
              <td>{application.status}</td>
              <td>{application.comments || 'N/A'}</td>
              <td>{application.paymentReferenceId || 'N/A'}</td>
              <td>
                {application.status === 'pending' && (
                  <>
                    <button className="approve" onClick={() => handleApprove(application.applicationId)}>Approve</button>
                    <button className="deny" onClick={() => handleDeny(application.applicationId)}>Deny</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplication;
