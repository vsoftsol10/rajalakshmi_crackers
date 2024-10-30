import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";

import './nav.css';  
import { CgLogIn } from "react-icons/cg";

import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";

export default function App() {
  // Assume you have a way to check if a user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual login state logic

  return (
    <Navbar isBordered className="navbar"> 
      <NavbarContent className="navbar-columns"> 
        <NavbarBrand className="navbar-brand"> 
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">RajaLakshmi Crackers</p>
        </NavbarBrand>

        <NavbarContent className="navbar-links"> 
          <NavbarItem>
            <Link color="foreground" href="/pricelist">
              Crackers
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Gallery
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>

      
        <NavbarContent as="div" className="navbar-actions">
         
          <NavbarContent as="div" className="users">
            <div className="privacy-icon1">  <Link href="/login" >
            <CgLogIn />
            </Link></div>
           <div className="privacy-icon2"> <Link href={isLoggedIn ? "/cart" : "/login"} >
              <IoCartOutline />
            </Link></div>
            
          </NavbarContent>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
