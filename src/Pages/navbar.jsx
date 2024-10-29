import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./Searchss.jsx";
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
            <Link color="foreground" href="#">
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
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
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
