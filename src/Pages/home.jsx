import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { CgLogIn } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import './nav.css';
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { RiFacebookLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { Link } from 'react-router-dom'; 
import Footer from './footer';

import './home.css'; 

function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <div className='navsmain'>
        <div className='div1'>
          <h4 className="heads">
            Sivakasi Crackers online, 2025 Diwali Booking Open/சிவகாசி பட்டாசுகள் ஆன்லைன், 2025 தீபாவளி முன்பதிவு திறந்துவிட்டது
            <BiPhoneCall className="phone-icon" />
            <a href="tel:9943870817" className="phone-number">9943870817</a>
          </h4>         
        </div>
        <div>
          <Navbar isBordered className="navbar"> 
            <NavbarContent className="navbar-columns"> 
              <NavbarBrand className="navbar-brand"> 
                <AcmeLogo />
                <p className="hidden sm:block font-bold text-inherit">RajaLakshmi Crackers</p>
              </NavbarBrand>

              <NavbarContent className="navbar-links"> 
                <NavbarItem>
                  <Link to="/Prices" className="nav-link">Crackers</Link> {/* Replace href with to */}
                </NavbarItem>
                <NavbarItem isActive>
                  <Link to="/about" className="nav-link" aria-current="page">About</Link> {/* Replace href with to */}
                </NavbarItem>
                <NavbarItem>
                  <Link to="/gallery" className="nav-link">Gallery</Link> {/* Replace href with to */}
                </NavbarItem>
                <NavbarItem>
                  <Link to="/contact" className="nav-link">Contact</Link> {/* Replace href with to */}
                </NavbarItem>
              </NavbarContent>

              <NavbarContent as="div" className="navbar-actions">
                <NavbarContent as="div" className="users">
                  <Link to="/login" className="icon-link">
                    <CgLogIn />
                  </Link>
                  <Link to={isLoggedIn ? "/cart" : "/login"} className="icon-link">
                    <IoCartOutline />
                  </Link>
                </NavbarContent>
              </NavbarContent>
            </NavbarContent>
          </Navbar>
        </div>
        <div className='divs2'>
          <ul className='socialIcons'>
            <li><a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer"><PiWhatsappLogoDuotone /></a></li>
            <li><a href="https://www.facebook.com/yourfacebooklink" target="_blank" rel="noopener noreferrer"><RiFacebookLine /></a></li>
            <li><a href="https://www.instagram.com/yourinstagramlink" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
            <li><a href="https://www.youtube.com/youryoutubechannel" target="_blank" rel="noopener noreferrer"><IoLogoYoutube /></a></li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
