import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { db } from './firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import './sign.css'
import { backIn } from "framer-motion";

const Signup = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        try {
            // Reference to Firestore collection
            const userRef = collection(db, "userdetails");

            // Add user details to Firestore
            await addDoc(userRef, {
                name,
                address,
                mobile,
                password  // Note: Consider hashing the password before storing it
            });

            alert("Signup successful!");
            navigate("/login");
        } catch (error) {
            console.error("Error saving user details:", error);
            alert("Signup failed. Please try again.");
        }
    };
    const backss = async () => {
        window.history.back();
    };
    

    return (
        <div className="signup-container">
            <h2 className="s2">Signup</h2>
            <div className="signup-form">
                <input className="sn"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input className="sn"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input className="sn"
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                <input className="sn" 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input className="sn"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button  className="snb" onClick={handleSignup}>Signup</button>
                <button  className="snb" onClick={backss}>Back</button>
            </div>
        </div>
    );
};

export default Signup;


 
