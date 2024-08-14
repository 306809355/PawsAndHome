import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';
import Footer from '../HeaderandFooter/Footer';

import Thank from '../images/Thank.jpg';



const ThankYouPage = () => {
    const navigate = useNavigate();
    const paymentDate = new Date();
    
    // Calculate the delivery date (7 days after payment)
    const deliveryDate = new Date(paymentDate);
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    
    return (
        <>
            <center>
                <div className="thank-you-container">
                    <img src={Thank} alt="Pet" className="thank-pet-image" />
                    <div className="thank-text-container">
                        <h2 className="thank-h2">Thank You for Adopting a Pet!</h2>
                        <p className="thank-p">
                            Congratulations on your new companion! Your pet will be available for pickup within the next 7 days. 
                            Our shelter will contact you a day before the pet reaches your destination. Your estimated delivery 
                            date is <strong className="thank-strong">{deliveryDate.toDateString()}</strong>. We hope you enjoy many happy moments together!
                            Contact the shelter via <span className="thank-span">pawandhome@gmail.com</span> in case of any queries.
                        </p>
                        <button className="thank-back-button" onClick={() => navigate('/')}>Back</button>
                    </div>
                </div>
            </center>
            <Footer />
        </>
    );
};

export default ThankYouPage;
