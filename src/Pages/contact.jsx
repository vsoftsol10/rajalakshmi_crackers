
import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import Footer from './footer';
import image from './images/contact.webp'
import './contact.css';
import animation from './images/rss.gif';
import gifd from './images/gifd.gif';
const ContactPage = () => {   const [isLoggedIn, setIsLoggedIn] = useState(false);

 
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

    <div >
        <NavBar isLoggedIn={isLoggedIn} handleCartClick={() => {}} handleLogout={handleLogout} />
        <div className='imgssd'><img src={animation} alt="anima" /></div>
       
    <section className="contact-page">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Reach out to us with any questions or concerns.</p>
    
      <div className="contact-container">
        <div className="contact-info">
          <img src={image} alt="Contact Us" className="contact-image" />
          <h3>Contact Information</h3>
          <p><strong>Phone:</strong> +91 88070 60809</p>
          <p><strong>Email:</strong> info@radhecrackers.com</p>
          <p><strong>Address:</strong> 123 Street, Sivakasi, India</p>
        </div>
  
        <form className="contact-form">
        <h3 style={{ color: 'white' }}>Send Us a Message</h3>

          <label  style={{ color: 'white' }} >Name</label>
          <input type="text" placeholder="Your Name" required />
  
          <label  style={{ color: 'white' }} >Email</label>
          <input type="email" placeholder="Your Email" required />
  
          <label  style={{ color: 'white' }} >Message</label>
          <textarea placeholder="Your Message" required></textarea>
  
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
    <Footer />
  </div>
  
  );
};

export default ContactPage;
