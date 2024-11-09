import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './firebaseconfig';  
import './Auth.css';

const Login = () => {
    const [nameOrMobile, setNameOrMobile] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const userRef = collection(db, "userdetails");
        const q = query(userRef, where("mobile", "==", nameOrMobile), where("password", "==", password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming there is only one matching user, we retrieve the first document
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data(); // Retrieve user data

            // Save all user details in localStorage
            localStorage.setItem("loggedInUser", JSON.stringify(userData));

            alert("Login successful!");
            navigate("/"); 
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="logins">
            <h2 className="h2l">Login</h2>
            <input 
                type="text" 
                placeholder="Name or Mobile" 
                value={nameOrMobile} 
                onChange={(e) => setNameOrMobile(e.target.value)} 
            />
            <input  className="il"
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button  className="bl"onClick={handleLogin}>Login</button>
            <p className=" p.">New User? <a  href="/signuppage" className="al" >Signup here</a></p>
        </div>
    );
};

export default Login;
