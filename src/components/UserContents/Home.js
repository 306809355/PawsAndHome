import React from 'react';
import { FaSearch, FaPaw, FaFileAlt, FaSmile, FaUserMd, FaDog, FaWalking, FaSyringe, FaCat, FaUserCircle } from 'react-icons/fa'; // Import additional icons
import './Home.css';
import { Link } from 'react-router-dom';
import front from '../images/home.jpg';
import petadopt from '../images/bookadopt.jpg';
import ahmedabadIcon from '../images/city/ahemadabad.svg';
import amritsarIcon from '../images/city/amristar.png';
import bengaluruIcon from '../images/city/bengalore.svg';
import bhopalIcon from '../images/city/Bhopal.svg';
import chandigarhIcon from '../images/city/Chandigarh.svg';
import chennaiIcon from '../images/city/chennai.svg';
import coimbatoreIcon from '../images/city/coimbatore.svg';
import dehradunIcon from '../images/city/dehradum.svg';
import delhiIcon from '../images/city/delhi.svg';
import goaIcon from '../images/city/goa.png';
import hyderabadIcon from '../images/city/hyderabad.svg';
import jaipurIcon from '../images/city/Jaipur.svg';
import kochiIcon from '../images/city/Kochi.svg';
import kolkataIcon from '../images/city/kolkata.svg';
import lucknowIcon from '../images/city/Lucknow.svg';
import mumbaiIcon from '../images/city/Mumbai.svg';
import nagpurIcon from '../images/city/nagpur.png';
import patialaIcon from '../images/city/patiala.png';
import pimpriIcon from '../images/city/pimpri-chinchwad.svg';
import puneIcon from '../images/city/pune.svg';
import vizagIcon from '../images/city/vizag.svg';
import Footer from '../HeaderandFooter/Footer';

function Home() {
  const cities = [
    { name: "Ahmedabad", icon: ahmedabadIcon },
    { name: "Amritsar", icon: amritsarIcon },
    { name: "Bengaluru", icon: bengaluruIcon },
    { name: "Bhopal", icon: bhopalIcon },
    { name: "Chandigarh", icon: chandigarhIcon },
    { name: "Chennai", icon: chennaiIcon },
    { name: "Coimbatore", icon: coimbatoreIcon },
    { name: "Dehradun", icon: dehradunIcon },
    { name: "Delhi", icon: delhiIcon },
    { name: "Goa", icon: goaIcon },
    { name: "Hyderabad", icon: hyderabadIcon },
    { name: "Jaipur", icon: jaipurIcon },
    { name: "Kochi", icon: kochiIcon },
    { name: "Kolkata", icon: kolkataIcon },
    { name: "Lucknow", icon: lucknowIcon },
    { name: "Mumbai", icon: mumbaiIcon },
    { name: "Nagpur", icon: nagpurIcon },
    { name: "Patiala", icon: patialaIcon },
    { name: "Pimpri-Chinchwad", icon: pimpriIcon },
    { name: "Pune", icon: puneIcon },
    { name: "Vizag", icon: vizagIcon }
  ];

  return (
    <div className="home-page-container">
      <div className="home-background"></div>
      <div className="home-hero-container">
        <img src={front} alt="Front" className="home-hero-image" />
        <div className="home-hero-text">Pets Complete Your Family !!</div>
        <div className="search-container">
          <select className="search-select">
            <option value="">Please select the pet you are looking for</option>
            <option value="dogs">Dogs</option>
            <option value="cats">Cats</option>
            <option value="small pets">Small Pets</option>
            <option value="pet foods">Pet Foods</option>
          </select>
          <button className="search-button">Search</button>
        </div>
      </div>
      <div className="adoption-steps">
        <h1>How To Adopt</h1>
        <div className="step">
          <FaSearch className="icon" />
          <h3>Select a Pet</h3>
          <p>Visit our website or app to browse through the pets available for adoption. Choose the pet that best fits your family.</p>
        </div>
        <div className="step">
          <FaFileAlt className="icon" />
          <h3>Submit Application</h3>
          <p>Fill in the adoption application with your details and submit it for review. Our team will get back to you shortly.</p>
        </div>
        <div className="step">
          <FaPaw className="icon" />
          <h3>Adopt the Pet</h3>
          <p>Once approved, complete the adoption process by signing the necessary documents and paying the adoption fee.</p>
        </div>
        <div className="step">
          <FaSmile className="icon" />
          <h3>Enjoy & Relax</h3>
          <p>Welcome your new pet into your home and enjoy the love and companionship they bring. Relax knowing you've given a pet a loving home.</p>
        </div>
      </div>
     <br></br>
      <div className="join-us">
        <h2>Join Us</h2>
        <div className="join-us-options">
          <div className="join-us-item">
            <FaUserMd className="join-icon" />
            <h3>Join as a Breeder</h3>
          </div>
          <div className="join-us-item">
            <FaDog className="join-icon" />
            <h3>Join as a Sitter</h3>
          </div>
          <div className="join-us-item">
            <FaWalking className="join-icon" />
            <h3>Join as a Dog Trainer</h3>
          </div>
          <div className="join-us-item">
            <FaSyringe className="join-icon" />
            <h3>Join as a Dog Walker</h3>
          </div>
          <div className="join-us-item">
            <FaCat className="join-icon" />
            <h3>Join as a Dog Groomer</h3>
          </div>
          <div className="join-us-item">
            <FaUserMd className="join-icon" />
            <h3>Join as a Veterinarian</h3>
          </div>
        </div>
      </div>
      <br></br>
      <div className="reviews-section">
        <h2>Reviews from Our Happy Adopters</h2>
        <div className="reviews-row">
          <div className="review-wrapper">
            <div className="review">
              <div className="review-left">
                <FaUserCircle className="review-icon" />
                <div className="review-info">
                  <h3>Jane Doe</h3>
                  <p>"We adopted Max from this site, and he has been the perfect addition to our family. The process was smooth, and the support was amazing."</p>
                </div>
              </div>
              <div className="review-right">
                <img src="path/to/image1.jpg" alt="Review 1" className="review-image" />
                <img src="path/to/image2.jpg" alt="Review 2" className="review-image" />
              </div>
            </div>
            <div className="review">
              <div className="review-left">
                <FaUserCircle className="review-icon" />
                <div className="review-info">
                  <h3>John Smith</h3>
                  <p>"Excellent experience! The team helped us find the right pet for our family, and the follow-up was very reassuring."</p>
                </div>
              </div>
              <div className="review-right">
                <img src="path/to/image3.jpg" alt="Review 3" className="review-image" />
              </div>
            </div>
            <div className="review">
              <div className="review-left">
                <FaUserCircle className="review-icon" />
                <div className="review-info">
                  <h3>Alice Johnson</h3>
                  <p>"The staff was friendly and informative. Our new dog, Bella, is wonderful, and we are grateful for the service we received."</p>
                </div>
              </div>
              <div className="review-right">
                <img src="path/to/image4.jpg" alt="Review 4" className="review-image" />
              </div>
            </div>
            <div className="review">
              <div className="review-left">
                <FaUserCircle className="review-icon" />
                <div className="review-info">
                  <h3>Mark Lee</h3>
                  <p>"Great experience! The adoption process was clear and well-organized. Our new cat, Whiskers, is settling in nicely."</p>
                </div>
              </div>
              <div className="review-right">
                <img src="path/to/image5.jpg" alt="Review 5" className="review-image" />
              </div>
            </div>
            <div className="review">
            <div className="review-left">
                <FaUserCircle className="review-icon" />
                <div className="review-info">
                  <h3>Emma Davis</h3>
                  <p>"A wonderful organization that made the adoption process easy and enjoyable. Our new puppy, Charlie, is a joy."</p>
                </div>
              </div>
              <div className="review-right">
                <img src="path/to/image6.jpg" alt="Review 6" className="review-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="latest-stories">
        <h2>Stories</h2>
        <div className="latest-stories-grid">
          <div className="story">
            <h3>Role of Pets in Community and Social Life</h3>
            <p>Explore how pets contribute to community bonding and social interactions.</p>
            <Link to="/blog/role-of-pets">Read Blog</Link>
          </div>
          <div className="story">
            <h3>Rising Trend of Pet Wellness and Spa Services</h3>
            <p>Discover the growing trend of wellness and spa services for pets.</p>
            <Link to="/blog/pet-wellness">Read Blog</Link>
          </div>
          <div className="story">
            <h3>Safe Mating for Dogs and Cats - A Guide for Pet Owners</h3>
            <p>Learn the essential tips for ensuring safe mating practices for your pets.</p>
            <Link to="/blog/safe-mating">Read Blog</Link>
          </div>
          <div className="story">
            <h3>Seasonal Pet Care Tips: Navigating Summer Heat and Winter Cold</h3>
            <p>Find out how to care for your pets throughout the changing seasons.</p>
            <Link to="/blog/seasonal-pet-care">Read Blog</Link>
          </div>
          <div className="story">
            <h3>Traveling with Pets: A Comprehensive Guide</h3>
            <p>Get comprehensive advice on traveling with your furry friends.</p>
            <Link to="/blog/traveling-with-pets">Read Blog</Link>
          </div>
          <div className="story">
            <h3>Top 5 Best Medium Dog Breeds in India</h3>
            <p>Explore the best medium-sized dog breeds suited for Indian families.</p>
            <Link to="/blog/best-medium-dog-breeds">Read Blog</Link>
          </div>
          <div className="story">
            <h3>Meet Pet Care Service Providers at ThePetNest</h3>
            <p>Connect with top pet care service providers for your pet’s needs.</p>
            <Link to="/blog/pet-care-providers">Read Blog</Link>
          </div>
        </div>
      </div>

      <div className="adopt-your-pet-container">
        <h2>Ready to Adopt Your Perfect Pet?</h2>
        <p>Find your ideal pet and start the adoption process today!</p>
        <Link to="/available" className="application-button">Application</Link>
        <br></br>
        <br></br>
        <img src={petadopt} alt="Ready to Adopt" className="adopt-image" />
      </div>

      <div className="our-services">
        <h2>Our Services Now in Your City</h2>
        <div className="city-icons">
          {cities.map((city, index) => (
            <div className="city-icon" key={index}>
              <span className="city-name">{city.name}</span>
              <img src={city.icon} alt={city.name} className="city-image" />
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <Footer/>
    </div>
  );
}

export default Home;
