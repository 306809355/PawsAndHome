import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PetUpdate.css';

const PetUpdate = () => {
    const [pets, setPets] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedField, setSelectedField] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        age: '',
        breed: '',
        gender: '',
        species: '',
        status: '',
        amount: '',
        photo: null
    });

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

    const handleUpdateClick = (pet) => {
        setSelectedPet(pet);
        setFormData({
            name: pet.name,
            description: pet.description,
            age: pet.age,
            breed: pet.breed,
            gender: pet.gender,
            species: pet.species,
            status: pet.status,
            amount: pet.amount,
            photo: null
        });
        setUpdateMode(true);
    };

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [selectedField]: event.target.value });
    };

    const handlePhotoChange = (event) => {
        setFormData({ ...formData, photo: event.target.files[0] });
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();

        if (selectedPet) {
            const updateData = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    updateData.append(key, formData[key]);
                }
            });

            try {
                await axios.put(`http://localhost:8080/api/pets/${selectedPet.id}`, updateData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert('Pet updated successfully!');
                setUpdateMode(false);
                fetchPets();
            } catch (error) {
                console.error('Error updating pet:', error);
                alert('Failed to update pet.');
            }
        }
    };

    const countPetsByStatus = (status) => {
        return pets.filter(pet => pet.status === status).length;
    };

    return (
        <div className="pet-update-container">
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

            {updateMode && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setUpdateMode(false)}>×</button>
                        <h2>Update Pet Details</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div>
                                <p>Select field to update:</p>
                                {Object.keys(formData).map((field) => (
                                    field !== 'photo' && (
                                        <div key={field}>
                                            <input
                                                type="radio"
                                                id={field}
                                                name="updateField"
                                                value={field}
                                                checked={selectedField === field}
                                                onChange={handleFieldChange}
                                            />
                                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                        </div>
                                    )
                                ))}
                            </div>
                            {selectedField && (
                                <div>
                                    <label>{selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}:</label>
                                    <input
                                        type="text"
                                        value={formData[selectedField]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}
                            <div>
                                <label>Photo:</label>
                                <input type="file" onChange={handlePhotoChange} />
                            </div>
                            <button type="submit">Update Pet</button>
                        </form>
                    </div>
                </div>
            )}

            <table className="pet-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Description</th>
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
                            <td>{pet.description}</td>
                            <td>{pet.age}</td>
                            <td>{pet.breed}</td>
                            <td>{pet.gender}</td>
                            <td>{pet.species}</td>
                            <td>{pet.status}</td>
                            <td>{pet.amount}</td>
                            <td>
                                <button onClick={() => handleUpdateClick(pet)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PetUpdate;
