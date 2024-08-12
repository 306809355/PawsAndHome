import React from 'react';
import './Footer.css';

const Footer = () => {
  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="stay-connected">
          <h3>Let's stay connected</h3>
          <p>Connect with us for updates on our activities, upcoming events, and pet care information.</p>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Cancellation and Refund</li>
          </ul>
        </div>
        <div className="contact-info">
          <h3>Looking to adopt a pet?</h3>
          <p>Please get in touch with one of our members:</p>
          <ul>
            <li><span className="icon">&#9993;</span> Mail us at :<span onClick={() => openLink('mailto:hello@iadopt.in')} style={{cursor: 'pointer', color: '#fff', textDecoration: 'underline'}}>hello@iadopt.in</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-content">
        <div className="social-media">
          <p>Follow us at:</p>
          <span className="fab fa-facebook" onClick={() => openLink('https://facebook.com')} aria-label="Facebook" role="button"></span>
          <span className="fab fa-instagram" onClick={() => openLink('https://instagram.com')} aria-label="Instagram" role="button"></span>
          <span className="fab fa-twitter" onClick={() => openLink('https://twitter.com')} aria-label="Twitter" role="button"></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
