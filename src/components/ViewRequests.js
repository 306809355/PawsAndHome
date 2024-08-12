import React, { useState } from 'react';
import './ViewRequests.css'; // For styling

const initialRequests = [
  { id: 1, requester: 'Preadeep', pet: 'Buddy', date: '2024-07-26', status: 'Pending' },
  { id: 2, requester: 'Preetham', pet: 'Whiskers', date: '2024-07-25', status: 'Approved' },
  { id: 3, requester: 'Sunil Roshan', pet: 'Max', date: '2024-07-24', status: 'Denied' },
  { id: 4, requester: 'Manivel', pet: 'Bella', date: '2024-07-23', status: 'Pending' },
  { id: 5, requester: 'Kumar', pet: 'Luna', date: '2024-07-22', status: 'Approved' },
  // Add more requests as needed
];

const ViewRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState('All');

  const updateStatus = (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const filteredRequests = filter === 'All'
    ? requests
    : requests.filter(request => request.status === filter);

  return (
    <div className="view-requests">
      <h1>Adoption Requests</h1>
      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'Pending' ? 'active' : ''}`}
          onClick={() => setFilter('Pending')}
        >
          Pending
        </button>
        <button
          className={`filter-button ${filter === 'Approved' ? 'active' : ''}`}
          onClick={() => setFilter('Approved')}
        >
          Approved
        </button>
        <button
          className={`filter-button ${filter === 'Denied' ? 'active' : ''}`}
          onClick={() => setFilter('Denied')}
        >
          Denied
        </button>
      </div>
      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requester</th>
            <th>Pet</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.requester}</td>
              <td>{request.pet}</td>
              <td>{request.date}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'Pending' && (
                  <>
                    <button className="approve-button" onClick={() => updateStatus(request.id, 'Approved')}>Approve</button>
                    <button className="deny-button" onClick={() => updateStatus(request.id, 'Denied')}>Deny</button>
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

export default ViewRequests;
