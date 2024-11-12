import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { CgLogIn } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { RiFacebookLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import is from './images/ckd.gif';
import './nav.css';

function NavbarComponent({ isLoggedIn, handleLogout, handleCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='navsmain'>
      <div className='is'>
        <img src={is} alt="is" />
      </div>
     
      <div className='div1'>
        <h4 className="heads">
          Sivakasi Crackers online, 2025 Diwali Booking Open/சிவகாசி பட்டாசுகள் ஆன்லைன், 2025 தீபாவளி முன்பதிவு திறந்துவிட்டது
          <BiPhoneCall className="phone-icon" />
          <a href="tel:9943870817" className="phone-number">9943870817</a>
        </h4>    
      </div>

      <Navbar isBordered className="navbar">
        <NavbarContent className="navbar-columns">
          <NavbarBrand className="navbar-brand">
            <p className="hidden sm:block font-bold text-inherit">RajaLakshmi Crackers</p>
          </NavbarBrand>

          <div 
            className={`mobile-menu-icon ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
          >
            <span className="hamburger-icon"></span>
          </div>

          {/* Desktop menu */}
          <NavbarContent className={`navbar-links ${menuOpen ? "open" : ""}`}>
            <NavbarItem>
              <Link to="/" className="nav-link">Home</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/Prices" className="nav-link">Crackers</Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link to="/about" className="nav-link" aria-current="page">About</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/gallery" className="nav-link">Gallery</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/contact" className="nav-link">Contact</Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent as="div" className="navbar-actions">
            <div className="users">
              {!isLoggedIn ? (
                <button className="icon-link" onClick={() => navigate('/login')}>
                  <CgLogIn /> Login
                </button>
              ) : (
                <button className="icon-link" onClick={handleLogout}>
                  Logout
                </button>
              )}
              <button className="icon-link" onClick={handleCartClick}>
                <IoCartOutline />
              </button>
            </div>
          </NavbarContent>
        </NavbarContent>
      </Navbar>

      <div className='divs2'>
        <ul className='socialIcons'>
          <li><a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer"><PiWhatsappLogoDuotone /></a></li>
          <li><a href="https://www.facebook.com/yourfacebooklink" target="_blank" rel="noopener noreferrer"><RiFacebookLine /></a></li>
          <li><a href="https://www.instagram.com/yourinstagramlink" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
          <li><a href="https://www.youtube.com/youryoutubechannel" target="_blank" rel="noopener noreferrer"><IoLogoYoutube /></a></li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarComponent;
