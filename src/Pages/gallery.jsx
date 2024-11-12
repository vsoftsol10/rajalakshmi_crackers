import React, { useState, useEffect } from 'react';
import NavbarComponent from './Navbar.jsx';
import Footer from './footer';
import { HiShoppingBag } from "react-icons/hi";

import './gallery.css';
import img1 from './images/s1.webp';
import img2 from './images/s2.webp';
import img3 from './images/s3.webp';
import img4 from './images/s3.webp';
import video1 from './videos/v1.mp4';
import video2 from './videos/v1.mp4';
import safetyImage from './images/safety.webp';

function Gallery() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [mediaType, setMediaType] = useState('photos');  // To switch between photos and videos

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
        <div className='gallery'>
            <div className='navs'>
                <NavbarComponent 
                    isLoggedIn={isLoggedIn} 
                    handleCartClick={handleCartClick} 
                    handleLogout={handleLogout} 
                />
            </div>

           

            {/* Navigation for switching between Photos and Videos */}
            <div className="gallery-navigation">
                <button 
                    className={`nav-button ${mediaType === 'photos' ? 'active' : ''}`}
                    onClick={() => setMediaType('photos')}
                >
                    Photos
                </button>
                <button 
                    className={`nav-button ${mediaType === 'videos' ? 'active' : ''}`}
                    onClick={() => setMediaType('videos')}
                >
                    Videos
                </button>
            </div>

            <div className="media-gallery">
                {mediaType === 'photos' ? (
                    <div className="photo-grid">
                        <img src={img1} alt="photo1" className="photo-item" />
                        <img src={img2} alt="photo2" className="photo-item" />
                        <img src={img3} alt="photo3" className="photo-item" />
                        <img src={img4} alt="photo4" className="photo-item" />
                    </div>
                ) : (
                    <div className="video-grid">
                        <video controls className="video-item">
                            <source src={video1} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <video controls className="video-item">
                            <source src={video2} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
 {/* Safety Measure Content - Left and Right Layout */}
 <div className="safety-measure">
                <div className="safety-content">
                    <h2>Safety Measures for Burning Crackers</h2>
                    <p>Burning crackers is fun but it's important to be safe. Always follow these safety tips:</p>
                    <ul >
                        <li>Wear protective eyewear and clothing.</li>
                        <li>Ensure there is a fire extinguisher nearby.</li>
                        <li>Burn crackers in open spaces, away from flammable objects.</li>
                        <li>Do not let children handle crackers unsupervised.</li>
                        <li>Ensure the area is well-ventilated.</li>
                    </ul>
                </div>
                <div className="safety-image">
                    <img src={safetyImage} alt="Safety Measure" />
                </div>
            </div>
            <div className='ft'>
                <Footer />
            </div>
        </div>
    );
}

export default Gallery;
