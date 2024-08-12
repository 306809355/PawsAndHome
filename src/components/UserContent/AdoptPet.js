import React, { useState, useEffect } from 'react';
import './AdoptPet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCat, faCalendarAlt, faTransgender } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdoptPet = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filters, setFilters] = useState({
    petType: 'all',
    minAge: '',
    maxAge: '',
    breed: '',
    maxAmount: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const handleCardClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    return pets.filter(pet => {
      const ageValid = (!filters.minAge || pet.age >= filters.minAge) &&
                       (!filters.maxAge || pet.age <= filters.maxAge);
      return (filters.petType === 'all' || pet.species.toLowerCase() === filters.petType.toLowerCase()) &&
             ageValid &&
             (!filters.breed || pet.breed.toLowerCase().includes(filters.breed.toLowerCase())) &&
             (!filters.maxAmount || pet.amount <= filters.maxAmount);
    });
  };

  const clearFilters = () => {
    setFilters({
      petType: 'all',
      minAge: '',
      maxAge: '',
      breed: '',
      maxAmount: ''
    });
  };

  const filteredPets = applyFilters();

  return (
    <div className="adopt-pet-container">
      <div className="adopt-pet-filter-sidebar">
        <h2>Filters</h2>
        <div className="adopt-pet-filter-group">
          <label>Pet Type</label>
          <select name="petType" value={filters.petType} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
          </select>
        </div>
        <div className="adopt-pet-filter-group">
          <label>Search by Age</label>
          <input type="number" name="minAge" value={filters.minAge} onChange={handleFilterChange} placeholder='Minimum Age'/>
          <input type="number" name="maxAge" value={filters.maxAge} onChange={handleFilterChange} placeholder='Maximum Age'/>
        </div>
        <div className="adopt-pet-filter-group">
          <label>Select by Breed</label>
          <input type="text" name="breed" value={filters.breed} onChange={handleFilterChange} placeholder='Type Breed Name' />
        </div>
        <div className="adopt-pet-filter-group">
          <label>Search by Amount</label>
          <input type="number" name="maxAmount" value={filters.maxAmount} onChange={handleFilterChange} placeholder='Maximum Amount'/>
        </div>
        <br></br>
        <button className="adopt-pet-apply-filter" onClick={applyFilters}>Apply Filters</button>
        <button className="adopt-pet-clear-filter" onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="adopt-pet-content">
        <h1 className="adopt-pet-heading">Pets Available For Adoption</h1>
        <div className="adopt-pet-list">
          {filteredPets.map((pet) => (
            <div key={pet.id} className="adopt-pet-card" onClick={() => handleCardClick(pet)}>
              <img src={`data:image/jpeg;base64,${pet.photo}`} alt={pet.name} className="adopt-pet-image" />
              <div className="adopt-pet-info">
                <h2>{pet.name}</h2>
                <p className="adopt-pet-breed">
                  <FontAwesomeIcon icon={pet.species === 'Cat' ? faCat : faDog} />
                  {pet.breed}
                </p>
                <p className="adopt-pet-age">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {pet.age}
                </p>
                <p className="adopt-pet-gender">
                  <FontAwesomeIcon icon={faTransgender} />
                  {pet.gender}
                </p>
              </div>
              <Link to={`/adopt/${pet.id}`} className="adopt-pet-adopt-button" >Adopt</Link>
            </div>
          ))}
        </div>

        {selectedPet && (
          <div className="adopt-pet-modal-overlay" onClick={handleCloseModal}>
            <div className="adopt-pet-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="adopt-pet-close-button" onClick={handleCloseModal}>Close</button>
              <img src={`data:image/jpeg;base64,${selectedPet.photo}`} alt={selectedPet.name} className="adopt-pet-modal-image" />
              <div className="adopt-pet-modal-info">
                <h2>{selectedPet.name}</h2>
                <p><strong>Breed:</strong> {selectedPet.breed}</p>
                <p><strong>Age:</strong> {selectedPet.age}</p>
                <p><strong>Gender:</strong> {selectedPet.gender}</p>
                <p><strong>Amount:</strong> ₹{selectedPet.amount}</p>

                <div className="adopt-pet-modal-buttons">
                  <Link to={`/adopt/${selectedPet.id}`}><button className="adopt-pet-viewmore-button">View More</button></Link>
                  <button className="adopt-pet-adopt-button">Adopt</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptPet;
