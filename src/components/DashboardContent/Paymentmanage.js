import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Paymentmanage.css'; // Ensure you have a CSS file for styling

const PaymentManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/applications');
        setApplications(response.data);
      } catch (err) {
        setError('Failed to fetch applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const viewDetails = (applicationId) => {
    // Implement the logic to view details, possibly redirect to another page or open a modal
    console.log(`Viewing details for Application ID: ${applicationId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="paymentmanagement-container">
      <h1>Payment Management</h1>
      <table className="paymentmanagement-table">
        <thead>
          <tr>
            <th>S.No</th> {/* Serial Number Header */}
            <th>Application ID</th>
            <th>Payment Reference ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={application.applicationId}>
              <td>{index + 1}</td> {/* Serial Number */}
              <td>{application.applicationId}</td>
              <td>{application.paymentReferenceId || 'N/A'}</td>
              <td>
                <button className="view-details" onClick={() => viewDetails(application.applicationId)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;
