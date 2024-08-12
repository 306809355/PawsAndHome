import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faUser, faSignInAlt, faUserPlus, faBars, faSignOutAlt, faKey, faCog } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

function NavBar({ isLoggedIn, onLogout }) {
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleServiceDropdown = () => {
    setServiceDropdownOpen(prev => !prev);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target) &&
        !event.target.closest('.service-dropdown')
      ) {
        setServiceDropdownOpen(false);
      }
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target) &&
        !event.target.closest('.account-dropdown')
      ) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout(); // Call onLogout prop to update login state
    setAccountDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FontAwesomeIcon icon={faPaw} className="logo-icon" />
        <span className="logo-text">Paws And Home</span>
      </Link>
      <ul className="navbar-links">
        <li className={`service-dropdown ${serviceDropdownOpen ? 'open' : ''}`} ref={serviceDropdownRef}>
          <div onClick={toggleServiceDropdown}>
            <FontAwesomeIcon icon={faBars} /> Services
          </div>
          {serviceDropdownOpen && (
            <div className="dropdown-menu">
              {/* First Column */}
              <div className="dropdown-column">
                <h4>Adoption Services</h4>
                <Link to="/available" onClick={() => setServiceDropdownOpen(false)}>
                  Adopt a Pet
                </Link>
                <Link to="/petpickup" onClick={() => setServiceDropdownOpen(false)}>
                  Pet Pickup Request
                </Link>
              </div>

              {/* Second Column */}
              <div className="dropdown-column">
                <h4>Resources</h4>
                <Link to="/pet-care-tips" onClick={() => setServiceDropdownOpen(false)}>
                  Pet Care Tips
                </Link>
                <Link to="/pet-behavior-help" onClick={() => setServiceDropdownOpen(false)}>
                  Pet Behavior Help
                </Link>
              </div>
              {/* Third Column */}
              <div className="dropdown-column">
                <h4>Support</h4>
                <Link to="/myapplication" onClick={() => setServiceDropdownOpen(false)}>
                  Application status
                </Link>
              </div>
            </div>
          )}
        </li>

        <li className="navbar-item">
          <Link to="/about-us">About Us</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact-us">Contact Us</Link>
        </li>
        <li className="account-dropdown" ref={accountDropdownRef}>
          <FontAwesomeIcon icon={faUser} onClick={toggleAccountDropdown} />
          {accountDropdownOpen && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" onClick={() => setAccountDropdownOpen(false)}>
                    <FontAwesomeIcon icon={faCog} /> view Profile
                  </Link>
                  <Link to="/change-password" onClick={() => setAccountDropdownOpen(false)}>
                    <FontAwesomeIcon icon={faKey} /> Change Password
                  </Link>
                  <Link to="/" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setAccountDropdownOpen(false)}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                  <Link to="/signup" onClick={() => setAccountDropdownOpen(false)}>
                    <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
