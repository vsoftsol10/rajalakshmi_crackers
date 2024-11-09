// Home.jsx
import React, { useState, useEffect } from 'react';
import NavbarComponent from './Navbar.jsx';
import Card1 from './card1.jsx';
import CardsRow from './card2.jsx';
import CardsRows from './card3.jsx';
import Offers from './offers.jsx';
import rocketImage from './images/rocket.gif';
import animation from './images/rss.gif';
import Footer from './footer';
import crackermakeVideo from './images/crackermake.webm';
import './home.css';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true); // Show login prompt popup if not logged in
    } else {
      window.location.href = "/cart";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className='main'>
      <NavbarComponent 
        isLoggedIn={isLoggedIn} 
        handleCartClick={handleCartClick} 
        handleLogout={handleLogout} 
      />

      <div className="video-banner-container">
        <video autoPlay loop muted playsInline className="banner-video">
          <source src={crackermakeVideo} type="video/webm" />
        </video>
        <div className='img'><img src={rocketImage} alt="Rocket" /></div>
      </div>

      <div className='imgs'><img src={animation} alt="anima" /></div>
      <div className='card1'><Card1 /></div>
      <div className='card2'><CardsRow /></div>
      <div className='h44'><h4> New Arrivals</h4></div>
      <div className='card3'><CardsRows /></div>
      <div className='offers'><Offers /></div>
      <div className='footer'><Footer /></div>

      {showLoginPopup && (
        <div className="login-popup">
          <div className="popup-content">
            <h4>RajaLakshmi says: Please login first to see your cart.</h4>
            <button onClick={() => setShowLoginPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
