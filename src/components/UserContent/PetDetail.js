import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PetDetail.css'; // Import your CSS file if you have one

const PetDetail = () => {
  const { id } = useParams(); // Get the pet ID from the URL
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/pets/${id}`)
      .then(response => response.json())
      .then(data => setPet(data))
      .catch(error => console.error('Error fetching pet details:', error));
  }, [id]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pet-detail-container">
      <h1>{pet.name}</h1>
      <img src={`data:image/jpeg;base64,${pet.photo}`} alt={pet.name} className="pet-detail-image" />
      <div className="pet-detail-info">
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Gender:</strong> {pet.gender}</p>
        <p><strong>Description:</strong> {pet.description}</p>
        <p><strong>Amount:</strong> ₹{pet.amount}</p>
      </div>
    </div>
  );
};

export default PetDetail;
