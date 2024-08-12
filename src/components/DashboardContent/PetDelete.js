import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PetDelete.css';

const PetDelete = () => {
    const [pets, setPets] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pets');
            setPets(response.data);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };

    const handleDeleteClick = (pet) => {
        setSelectedPet(pet);
        setDeleteMode(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedPet) {
            try {
                await axios.delete(`http://localhost:8080/api/pets/${selectedPet.id}`);
                alert('Pet deleted successfully!');
                setDeleteMode(false);
                fetchPets();
            } catch (error) {
                console.error('Error deleting pet:', error);
                alert('Failed to delete pet.');
            }
        }
    };

    const countPetsByStatus = (status) => {
        return pets.filter(pet => pet.status === status).length;
    };

    return (
        <div className="pet-delete-container">
            <div className="stats-grid">
                <div className="stat-box">
                    <h2>{countPetsByStatus('Available')}</h2>
                    <p>Number of Pets Available</p>
                </div>
                <div className="stat-box">
                    <h2>{countPetsByStatus('Adopted')}</h2>
                    <p>Number of Pets Adopted</p>
                </div>
            </div>
            {deleteMode && selectedPet && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Are you sure you want to delete this pet?</h2>
                        <p><strong>Name:</strong> {selectedPet.name}</p>
                        <p><strong>Age:</strong> {selectedPet.age}</p>
                        <p><strong>Breed:</strong> {selectedPet.breed}</p>
                        <button onClick={handleDeleteConfirm}>Yes, Delete</button>
                        <button onClick={() => setDeleteMode(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <table className="pet-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Breed</th>
                        <th>Gender</th>
                        <th>Species</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, index) => (
                        <tr key={pet.id}>
                            <td>{index + 1}</td>
                            <td>{pet.name}</td>
                            <td>{pet.age}</td>
                            <td>{pet.breed}</td>
                            <td>{pet.gender}</td>
                            <td>{pet.species}</td>
                            <td>{pet.status}</td>
                            <td>{pet.amount}</td>
                            <td>
                                <button onClick={() => handleDeleteClick(pet)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PetDelete;
