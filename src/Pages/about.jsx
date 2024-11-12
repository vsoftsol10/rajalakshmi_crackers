import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import './About.css';
import rocketImage from './images/rocket.gif';
import gifd from './images/gifd.gif'
import aboutImage from './images/aboutImage.webp';
import founderImage from './images/founderImage.webp';
import Footer from './footer';
import images from './images/diwalisale.webp';
import { FaHome, FaClipboardCheck, FaHeadset, FaTags } from 'react-icons/fa';

function About() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="about-container">
      <NavBar isLoggedIn={isLoggedIn} handleCartClick={() => {}} handleLogout={handleLogout} />
      <section className="hero-banner">
        <img src={aboutImage} alt="Hero" className="banner-image" />
        <div className="banner-text">
          <h1 style={{color : 'Black'}}> RajaLakshmi Crackers</h1>
          <p  style={{color : 'Black'}}>Celebrating Tradition with Premium Quality Crackers</p>
        </div>
      </section>

      <section className="founder-section">
        <img src={founderImage} alt="Founder" className="founder-image" />
        <div className="founder-info">
          <h3>Our Founder</h3>
          <p>
            Inspired by a passion for craftsmanship and community, our founder established RajaLakshmi Crackers to bring joy to celebrations across India. Today, we continue that legacy, focusing on quality, safety, and customer satisfaction.
          </p>
        </div>
        <div className='ig'><img src={rocketImage} alt="Rocket" /></div>
        <div className='igd'><img src={gifd} alt="Rocket" /></div>
        
      </section>
      <section className="about-content">
  <h2>Our Story</h2>
  <ul>
    <li><i className="fas fa-check-circle"></i><strong> Trusted Brand:</strong> A name you can rely on for high-quality, eco-friendly fireworks.</li>
    <li><i className="fas fa-shield-alt"></i><strong> Safety First:</strong> We combine tradition with safety, ensuring every celebration is worry-free.</li>
    <li><i className="fas fa-gift"></i><strong> Wide Range:</strong> A vast selection of fireworks for every occasion, from small gatherings to grand events.</li>
    <li><i className="fas fa-leaf"></i><strong> Eco-Friendly:</strong> Committed to sustainability, we create fireworks that reduce environmental impact.</li>
    <li><i className="fas fa-lightbulb"></i><strong> Innovative Designs:</strong> Constantly innovating to enhance your experience with breathtaking fireworks.</li>
  </ul>
</section>



      {/* Highlights Section */}
      <section className="highlights-section">
        <div className="highlights-content">
          <h2>WE OFFERS</h2>
          <p>
            One can buy crackers from us year-round. Buying quality crackers during all seasons, we came up with the solution to buy crackers. The following are the advantages you can enjoy by buying from us:
          </p>
          <ul>
            <li><FaHome className="icon" /> Shop from home with a click, no need to stand in queues.</li>
            <li><FaClipboardCheck className="icon" /> Simpler selection process.</li>
            <li><FaHeadset className="icon" /> Dedicated customer service.</li>
            <li><FaTags className="icon" /> Detailed descriptions of all our products.</li>
          </ul>
        </div>
        <div className="highlights-image">
          <img src={images} alt="Quality Products" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
