// UserDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetail.css'; // Assuming you have a separate CSS file for styling

const UserDetail = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersWithPets, setUsersWithPets] = useState(0);

  useEffect(() => {
    // Fetch all users
    axios.get('http://localhost:8080/users')
      .then(response => {
        setUsers(response.data);
        setTotalUsers(response.data.length);
        // Assuming there's a property in user data indicating pet adoption
        const adoptedUsers = response.data.filter(user => user.hasAdoptedPet).length;
        setUsersWithPets(adoptedUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Handle update action
  const handleUpdate = (userId) => {
    // Implement update logic here
    console.log(`Update user with ID: ${userId}`);
  };

  // Handle delete action
  const handleDelete = (userId) => {
    axios.delete(`http://localhost:8080/users/${userId}`)
      .then(response => {
        alert('User deleted successfully');
        setUsers(users.filter(user => user.id !== userId));
        setTotalUsers(totalUsers - 1);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      });
  };

  return (
    <div className="user-detail-container">
      <div className="stats-grid">
        <div className="stat-box">
          <h2>{totalUsers}</h2>
          <p>Total Users</p>
        </div>
        <div className="stat-box">
          <h2>{usersWithPets}</h2>
          <p>Users Adopted Pets</p>
        </div>
      </div>
      <div className="update-form">
        <h2>User Details</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Pincode</th>
              <th>Residential Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td> {/* Serial number */}
                <td>{user.username}</td>
                <td>{user.dob}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.pincode}</td>
                <td>{user.residentialType}</td>
                <td>
                  <button onClick={() => handleUpdate(user.id)} className="action-button update-button">Update</button>
                  <button onClick={() => handleDelete(user.id)} className="action-button delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetail;
