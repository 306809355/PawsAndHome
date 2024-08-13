import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/HeaderandFooter/NavBar';
import Login from './components/Validation/LogIn';
import Home from './components/UserContents/Home';
import SignUp from './components/Validation/SignUp';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import AdoptionForm from './components/UserContent/AdoptionForm';
import PetSurrender from './components/UserContent/PetSurrender';
import AdoptPet from './components/UserContent/AdoptPet';
import PetDetail from './components/UserContent/PetDetail';
import Profile from './components/UserContents/Profile';
import Payment from './components/UserContent/Payment';

import { AuthProvider, useAuth } from './components/Authorization/AuthContext';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MyApplications from './components/UserContent/MyApplication';
import ChangePassword from './components/UserContent/ChangePassword';
import ThankYouPage from './components/UserContent/ThankYouPage';

function App() {
  const { isLoggedIn, userId } = useAuth();

  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} userId={userId} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard/*"
              element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
            />
            <Route path="/available" element={<AdoptPet />} />
            <Route path="/PetPickUp" element={<PetSurrender />} />
            <Route path="/availablepets" element={<AdoptPet />} />
            <Route path="/pet/:id" element={<PetDetail />} />
            <Route path="/adopt/:petId" element={<AdoptionForm />} />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/payment/:applicationId" element={<Payment />} />
            <Route
  path="/myapplication"
  element={isLoggedIn ? <MyApplications/> : <Navigate to="/login" />}
/>
            <Route
  path="/change-password"
  element={isLoggedIn ? <ChangePassword/> : <Navigate to="/login" />}
/>
            <Route path="/thank/page" element = {<ThankYouPage/>}/>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
