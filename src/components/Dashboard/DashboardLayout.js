import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import PetsAvailable from '../PetsAvailable';
import AddPet from '../DashboardContent/AddPet.js';
import './DashboardLayout.css';
import PetUpdate from '../DashboardContent/PetUpdate.js';
import UserDetail from '../DashboardContent/UserDetail.js';
import PetDelete from '../DashboardContent/PetDelete.js';
import ViewApplication from '../DashboardContent/ViewApplication.js';
import PaymentManagement from '../DashboardContent/Paymentmanage.js';
import PetPickup from '../DashboardContent/PetPickup.js';

const DashboardLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={`dashboard-layout ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <div className="content">
        <Routes>
          <Route path="/" element={<h2>Welcome to the Overview</h2>} />
          <Route path="pets" element={<PetsAvailable />} />
          <Route path="pets/update" element={<PetUpdate/>} />
          <Route path="pets/add" element={<AddPet/>} />
          <Route path="pets/remove" element={<PetDelete/>} />
          <Route path="users/profiles" element={<UserDetail/>} />
          <Route path="view/application" element={<ViewApplication/>} />
          <Route path="payment/manage" element={<PaymentManagement/>} />
          <Route path="pickup/manage" element={<PetPickup/>} />


          {/* Other routes */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
