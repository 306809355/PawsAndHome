import React from 'react';
import './Pickup.css'; // Updated CSS file

const PetPickup = () => {
  // Sample data for requests
  const requests = [
    { id: 308, user: 'View User', petDetail: 'View Pet Details', location: 'CVc', status: 'Declined', requestDate: '2024-08-08' },
    { id: 352, user: 'View User', petDetail: 'View Pet Details', location: 'Bhjgt', status: 'Accepted', requestDate: '2024-08-09' }
  ];

  return (
    <div className="pickup-main-content">
      <header className="pickup-header">
        <h2>Pet Pickup Requests</h2>
      </header>
      <section className="pickup-stats">
        <div className="pickup-stat-box">
          <h3>Pending Requests</h3>
          <p>0</p>
        </div>
        <div className="pickup-stat-box">
          <h3>Accepted Requests</h3>
          <p>1</p>
        </div>
        <div className="pickup-stat-box">
          <h3>Declined Requests</h3>
          <p>1</p>
        </div>
      </section>
      <section className="pickup-request-table">
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User</th>
              <th>Pet Detail</th>
              <th>Location</th>
              <th>Status</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td><button className="pickup-view-button">{request.user}</button></td>
                <td><button className="pickup-view-button">{request.petDetail}</button></td>
                <td>{request.location}</td>
                <td>{request.status}</td>
                <td>{request.requestDate}</td>
                <td>
                  <button className="pickup-action-button pickup-accept">Accept</button>
                  <button className="pickup-action-button pickup-decline">Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PetPickup;
