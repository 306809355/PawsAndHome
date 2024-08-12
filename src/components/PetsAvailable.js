import React, { useState, useEffect } from 'react';
import './PetsAvailable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCat, faCalendarAlt, faTransgender } from '@fortawesome/free-solid-svg-icons';

const PetsAvailable = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch pets data from the API
    fetch('http://localhost:8080/api/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  // Handle the card click event to show the pet details modal
  const handleCardClick = (pet) => {
    setSelectedPet(pet);
  };

  // Handle closing the pet details modal
  const handleCloseModal = () => {
    setSelectedPet(null);
  };

  // Filter the pets based on the selected filter
  const filteredPets = pets.filter(pet => filter === 'all' || pet.species.toLowerCase() === filter);

  return (
    <div className="pets-available">
      <h1>Pets Available for Adoption</h1>
      
      {/* Filter buttons to filter the pets by type */}
      <div className="filter-buttons">
        <button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-button ${filter === 'dog' ? 'active' : ''}`} onClick={() => setFilter('dog')}>Dogs</button>
        <button className={`filter-button ${filter === 'cat' ? 'active' : ''}`} onClick={() => setFilter('cat')}>Cats</button>
      </div>
      
      {/* List of pets */}
      <div className="pets-list">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="pet-card" onClick={() => handleCardClick(pet)}>
            <img src={`data:image/jpeg;base64,${pet.photo}`} alt={pet.name} className="pet-image" />
            <div className="pet-info">
              <h2>{pet.name}</h2>
              <p className="pet-breed">
                <FontAwesomeIcon icon={pet.species.toLowerCase() === 'cat' ? faCat : faDog} />
                {pet.breed}
              </p>
              <p className="pet-age">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {pet.age}
              </p>
              <p className="pet-gender">
                <FontAwesomeIcon icon={faTransgender} />
                {pet.gender}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to display selected pet details */}
      {selectedPet && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>Close</button>
            <img src={`data:image/jpeg;base64,${selectedPet.photo}`} alt={selectedPet.name} className="modal-image" />
            <div className="modal-info">
              <h2>{selectedPet.name}</h2>
              <p><strong>Breed:</strong> {selectedPet.breed}</p>
              <p><strong>Age:</strong> {selectedPet.age}</p>
              <p><strong>Gender:</strong> {selectedPet.gender}</p>
              <p className="modal-description">{selectedPet.description}</p>
              <button className="adopt-button">Adopt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetsAvailable;
