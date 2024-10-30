import React from 'react';
import Navbar from './navbar';
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { RiFacebookLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import Footer from './footer';
import './home.css'; 

function Home() {
  return (<div>
    <div className='navsmain'>
      <div className='div1'>
        <h4 className="heads">
          Sivakasi Crackers online, 2025 Diwali Booking Open/சிவகாசி பட்டாசுகள் ஆன்லைன், 2025 தீபாவளி முன்பதிவு திறந்துவிட்டது
          <BiPhoneCall className="phone-icon" />
          <a href="tel:9943870817" className="phone-number">9943870817</a>
        </h4>         
      </div>
      <Navbar />
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
