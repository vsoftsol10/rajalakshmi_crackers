import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { RiFacebookLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import './footer.css'; // Import the CSS file here

export default function Footer() {
  return (
    <MDBFooter className='footer text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>
        <div className='socialIcons'>
 <a href="https://www.instagram.com/yourinstagramlink" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>

          <a href="https://www.youtube.com/youryoutubechannel" target="_blank" rel="noopener noreferrer"><IoLogoYoutube /></a>
          
          <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer"><PiWhatsappLogoDuotone /></a>
        </div>

       
      </section>

      <MDBContainer className="text-center text-md-start mt-5 footer">
    <MDBRow className="mt-3 footer-grid">
        {/* First Column - Logo */}
        <MDBCol md="3" lg="4" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                RAJALAKSHMICRACKERS
            </h6>
        </MDBCol>

        {/* Second Column - Useful Links */}
        <MDBCol md="4" lg="2" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
            <p><a href="#!" className="text-reset">Pricing</a></p>
            <p><a href="#!" className="text-reset">Settings</a></p>
            <p><a href="#!" className="text-reset">Orders</a></p>
            <p><a href="#!" className="text-reset">Help</a></p>
        </MDBCol>
        
        <MDBCol md="4" lg="3" className="mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p className='ps'><MDBIcon icon="home" className="me-2" /> Sivaksi, TN</p>
            <p  className='ps'><MDBIcon icon="phone" className="me-3" /> + 01 234 567 88</p>
            <p  className='ps'><MDBIcon icon="print" className="me-3" /> + 01 234 567 89</p>
        </MDBCol>
    </MDBRow>
</MDBContainer>


      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright: <a className='text-reset fw-bold' href='/'>RajaLakshmi</a>
      </div>
    </MDBFooter>
  );
}
