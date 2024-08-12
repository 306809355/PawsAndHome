import React, { useState } from 'react';
import './UserProfile.css'; // For styling

// Example user profiles data
const users = [
  { id: 1, name: 'Alice Johnson', age: 30, location: '123 Maple St, Springfield', image: 'path/to/image1.jpg', phoneNumber: '555-1234', adoptedPets: ['Buddy'], services: ['Grooming'], status: 'Regular' },
  { id: 2, name: 'Bob Smith', age: 25, location: '456 Oak St, Springfield', image: 'path/to/image2.jpg', phoneNumber: '555-5678', adoptedPets: [], services: ['Training'], status: 'Irregular' },
  { id: 3, name: 'Charlie Brown', age: 35, location: '789 Pine St, Springfield', image: 'path/to/image3.jpg', phoneNumber: '555-8765', adoptedPets: ['Whiskers'], services: ['Adoption'], status: 'Regular' },
  { id: 4, name: 'David Williams', age: 28, location: '101 Elm St, Springfield', image: 'path/to/image4.jpg', phoneNumber: '555-4321', adoptedPets: [], services: ['Grooming'], status: 'Irregular' },
  { id: 5, name: 'Emma Davis', age: 40, location: '202 Cedar St, Springfield', image: 'path/to/image5.jpg', phoneNumber: '555-6789', adoptedPets: ['Bella'], services: ['Training'], status: 'Regular' },
  { id: 6, name: 'Fiona Green', age: 33, location: '303 Birch St, Springfield', image: 'path/to/image6.jpg', phoneNumber: '555-3456', adoptedPets: [], services: ['Adoption'], status: 'Irregular' },
  { id: 7, name: 'George Martin', age: 26, location: '404 Maple St, Springfield', image: 'path/to/image7.jpg', phoneNumber: '555-7890', adoptedPets: [], services: ['Grooming'], status: 'Regular' },
  { id: 8, name: 'Hannah Lewis', age: 31, location: '505 Oak St, Springfield', image: 'path/to/image8.jpg', phoneNumber: '555-9876', adoptedPets: ['Max'], services: ['Training'], status: 'Irregular' },
  { id: 9, name: 'Ian Wilson', age: 29, location: '606 Pine St, Springfield', image: 'path/to/image9.jpg', phoneNumber: '555-5432', adoptedPets: [], services: ['Adoption'], status: 'Regular' },
  { id: 10, name: 'Jessica Moore', age: 27, location: '707 Elm St, Springfield', image: 'path/to/image10.jpg', phoneNumber: '555-2345', adoptedPets: [], services: ['Grooming'], status: 'Irregular' },
  { id: 11, name: 'Kevin White', age: 32, location: '808 Cedar St, Springfield', image: 'path/to/image11.jpg', phoneNumber: '555-6789', adoptedPets: ['Luna'], services: ['Training'], status: 'Regular' },
  { id: 12, name: 'Laura Adams', age: 38, location: '909 Birch St, Springfield', image: 'path/to/image12.jpg', phoneNumber: '555-3456', adoptedPets: [], services: ['Adoption'], status: 'Irregular' },
  { id: 13, name: 'Michael Brown', age: 24, location: '123 Oak St, Springfield', image: 'path/to/image13.jpg', phoneNumber: '555-5678', adoptedPets: ['Buddy'], services: ['Grooming'], status: 'Regular' },
  { id: 14, name: 'Natalie Davis', age: 29, location: '234 Pine St, Springfield', image: 'path/to/image14.jpg', phoneNumber: '555-8765', adoptedPets: [], services: ['Training'], status: 'Irregular' },
  { id: 15, name: 'Oliver Wilson', age: 37, location: '345 Elm St, Springfield', image: 'path/to/image15.jpg', phoneNumber: '555-4321', adoptedPets: ['Whiskers'], services: ['Adoption'], status: 'Regular' },
  { id: 16, name: 'Patricia Taylor', age: 42, location: '456 Cedar St, Springfield', image: 'path/to/image16.jpg', phoneNumber: '555-9876', adoptedPets: [], services: ['Grooming'], status: 'Irregular' },
  { id: 17, name: 'Quincy Adams', age: 31, location: '567 Birch St, Springfield', image: 'path/to/image17.jpg', phoneNumber: '555-5432', adoptedPets: [], services: ['Training'], status: 'Regular' },
  { id: 18, name: 'Rachel Green', age: 26, location: '678 Maple St, Springfield', image: 'path/to/image18.jpg', phoneNumber: '555-2345', adoptedPets: ['Max'], services: ['Adoption'], status: 'Irregular' },
  { id: 19, name: 'Steve Harris', age: 34, location: '789 Oak St, Springfield', image: 'path/to/image19.jpg', phoneNumber: '555-6789', adoptedPets: [], services: ['Grooming'], status: 'Regular' },
  { id: 20, name: 'Tina Martin', age: 28, location: '890 Pine St, Springfield', image: 'path/to/image20.jpg', phoneNumber: '555-3456', adoptedPets: [], services: ['Training'], status: 'Irregular' },
  { id: 21, name: 'Ursula Johnson', age: 35, location: '901 Elm St, Springfield', image: 'path/to/image21.jpg', phoneNumber: '555-5678', adoptedPets: [], services: ['Adoption'], status: 'Regular' },
  { id: 22, name: 'Victor Nelson', age: 29, location: '123 Cedar St, Springfield', image: 'path/to/image22.jpg', phoneNumber: '555-8765', adoptedPets: ['Buddy'], services: ['Grooming'], status: 'Irregular' },
  { id: 23, name: 'Wendy Clark', age: 30, location: '234 Birch St, Springfield', image: 'path/to/image23.jpg', phoneNumber: '555-4321', adoptedPets: [], services: ['Training'], status: 'Regular' },
  { id: 24, name: 'Xander Smith', age: 33, location: '345 Maple St, Springfield', image: 'path/to/image24.jpg', phoneNumber: '555-9876', adoptedPets: ['Luna'], services: ['Adoption'], status: 'Irregular' }
];

const UserProfiles = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-profiles">
      <h1>User Profiles</h1>
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="profiles-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="profile-card" onClick={() => handleCardClick(user)}>
            <div className="profile-image-wrapper">
              {user.image ? (
                <img src={user.image} alt={user.name} className="profile-image" />
              ) : (
                <div className="profile-placeholder">
                  <span>{user.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <h2 className="profile-name">{user.name}</h2>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>Close</button>
            <img src={selectedUser.image} alt={selectedUser.name} className="modal-image" />
            <div className="modal-info">
              <h2>{selectedUser.name}</h2>
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>Location:</strong> {selectedUser.location}</p>
              <p><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
              <p><strong>Adopted Pets:</strong> {selectedUser.adoptedPets.length > 0 ? selectedUser.adoptedPets.join(', ') : 'None'}</p>
              <p><strong>Services:</strong> {selectedUser.services.length > 0 ? selectedUser.services.join(', ') : 'None'}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default UserProfiles;
