import React from 'react';
import image1 from './images/s2.webp';
import image2 from './images/s3.webp';
import './offers.css'; 
 const  OffersPage = () =>{
  return (
    <div className="offers-container">
      <h2 className="offers-heading">Offers</h2>
      <p className="emi-note">EMI available for purchases above ₹5000. EMI is available in 3 months.</p>
      
      <div className="offers-row">
     
        <div className="offer-card discount-banner">
          <div className="offer-text">
            <h3 className='off'>Flat 20% Off</h3>
            <p className="offer-details">Hurry up! Limited period offer.</p>
          </div>
          <div className="offer-image-container">
            <img src={image1} alt="Discount" className="offer-image" />
            <div className="image-hover-text">Additional details about the discount can go here!</div>
          </div>
        </div>

        {/* Second Column - EMI Banner */}
        <div className="offer-card emi-banner">
          <div className="offer-text">
            <h3 className='off' > EMI Available</h3>
            <p className="offer-details">Get 3-month EMI options on purchases over ₹5000.</p>
          </div>
          <div className="offer-image-container">
            <img src= {image2} alt="EMI" className="offer-image" />
            <div className="image-hover-text">Learn more about the EMI terms and conditions!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OffersPage;
