import React, { useState } from 'react';
import axios from 'axios';
import './AddPet.css';

const AddPet = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [species, setSpecies] = useState('');
    const [status, setStatus] = useState('');
    const [photo, setPhoto] = useState(null);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('age', age);
        formData.append('breed', breed);
        formData.append('gender', gender);
        formData.append('species', species);
        formData.append('status', status);
        formData.append('amount', amount);

        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/pets/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Pet registered:', response.data);
            setMessage('Pet added successfully!');
            resetForm(); // Reset the form fields after successful submission
        } catch (error) {
            console.error('There was an error!', error);
            if (error.response && error.response.data) {
                setError(`Error: ${error.response.data.message || 'There was an error submitting the form. Please try again.'}`);
            } else {
                setError('There was an error submitting the form. Please try again.');
            }
            setMessage('Not able to add pet.');
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setAge('');
        setBreed('');
        setGender('');
        setSpecies('');
        setStatus('');
        setPhoto(null);
        setAmount('');
    };

    const handleAgeChange = (event) => {
        const value = event.target.value;
        if (value === '' || (value >= 0 && !isNaN(value))) {
            setAge(value);
        }
    };

    const handleAmountChange = (event) => {
        const value = event.target.value;
        if (value === '' || (value >= 0 && !isNaN(value))) {
            setAmount(value);
        }
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(file);
        }
    };

    const removePhoto = () => {
        setPhoto(null);
    };

    return (
        <div className="add-pet-form-container">
            <h1>Add New Pet</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group-custom">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-custom">
                    <label>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-custom">
                    <label>Age:</label>
                    <input 
                        type="number" 
                        value={age} 
                        onChange={handleAgeChange} 
                        min="0" 
                        required 
                    />
                </div>
                <div className="form-group-custom">
                    <label>Breed:</label>
                    <input 
                        type="text" 
                        value={breed} 
                        onChange={(e) => setBreed(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-custom">
                    <label>Gender:</label>
                    <select 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)} 
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <div className="form-group-custom">
                    <label>Species:</label>
                    <input 
                        type="text" 
                        value={species} 
                        onChange={(e) => setSpecies(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-custom">
                    <label>Status:</label>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Adopted">Adopted</option>
                        <option value="Pending">Pending</option>
                        <option value="Reserved">Reserved</option>
                    </select>
                </div>
                <div className="form-group-custom">
                    <label>Amount:</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={handleAmountChange} 
                        min="0" 
                        required 
                    />
                </div>
                <div className="form-group-custom">
                    <label>Photo:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoChange} 
                    />
                    {photo && (
                        <div className="photo-preview">
                            <img src={URL.createObjectURL(photo)} alt="Pet" />
                            <div className="photo-details">
                                <p>{photo.name}</p>
                                <button type="button" onClick={removePhoto}>X</button>
                            </div>
                        </div>
                    )}
                </div>
                <button type="submit" className="add-pet-button">Add Pet</button>
                {message && <p className="form-message">{message}</p>}
                {error && <p className="form-error">{error}</p>}
            </form>
        </div>
    );
};

export default AddPet;
