import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faFileAlt, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import './DashboardLayout.css';

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isPetsExpanded, setIsPetsExpanded] = React.useState(false);
  const [isRequestsExpanded, setIsRequestsExpanded] = React.useState(false);
  const [isUsersExpanded, setIsUsersExpanded] = React.useState(false);

  const handleExpand = (setter) => () => {
    setter(prev => !prev);
  };

  const handleNavigation = (path) => () => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-content">
        {/* Menu Icon */}
        <div className="sidebar-item" onClick={handleNavigation('/dashboard/overview')}>
          <FontAwesomeIcon icon={faBars} className="sidebar-icon" />
          {isExpanded && 'Dashboard'}
        </div>
        <div className="sidebar-item" onClick={handleExpand(setIsPetsExpanded)}>
          <FontAwesomeIcon icon={faPaw} className="sidebar-icon" />
          {isExpanded && 'Pet Management'}
          {isExpanded && (
            <FontAwesomeIcon
              icon={isPetsExpanded ? 'chevron-up' : 'chevron-down'}
              className="expand-icon"
            />
          )}
        </div>
        {isPetsExpanded && isExpanded && (
          <div className="sub-menu">
            <div className="sidebar-item" onClick={handleNavigation('/dashboard/pets/add')}>Add Pet</div>
            <div className="sidebar-item" onClick={handleNavigation('/dashboard/pets/update')}>Update Pet</div>
            <div className="sidebar-item" onClick={handleNavigation('/dashboard/pets/remove')}>Remove Pet</div>
          </div>
        )}
        <div className="sidebar-item" onClick={handleExpand(setIsRequestsExpanded)}>
          <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
          {isExpanded && 'Adoption Requests Management'}
          {isExpanded && (
            <FontAwesomeIcon
              icon={isRequestsExpanded ? 'chevron-up' : 'chevron-down'}
              className="expand-icon"
            />
          )}
        </div>
        {isRequestsExpanded && isExpanded && (
          <div className="sub-menu">
            <div className="sidebar-item" onClick={handleNavigation('/dashboard/requests/view')}>View Requests</div>
            <div className="sidebar-item" onClick={handleNavigation('/dashboard/requests/approve')}>Approve Requests</div>
            <div className="sidebar-item" onClick={handleNavigation('/dashboard/requests/history')}>Request History</div>
          </div>
        )}
        <div className="sidebar-item" onClick={handleExpand(setIsUsersExpanded)}>
          <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
          {isExpanded && 'User Management'}
          {isExpanded && (
            <FontAwesomeIcon
              icon={isUsersExpanded ? 'chevron-up' : 'chevron-down'}
              className="expand-icon"
            />
          )}
        </div>
        {isUsersExpanded && isExpanded && (
          <div className="sub-menu">
            <div className="sidebar-item" onClick={handleNavigation('/dashboard/users/profiles')}> Manage User Profiles</div>
          </div>
        )}

      </div>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isExpanded ? '<' : '>'}
      </div>
    </div>
  );
};

export default Sidebar;
