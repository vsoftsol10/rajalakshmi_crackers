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
            localStorage.setItem("loggedInUser", nameOrMobile);
            alert("Login successful!");
            navigate("/");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Name or Mobile" value={nameOrMobile} onChange={(e) => setNameOrMobile(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>New User? <a href="/signuppage">Signup here</a></p>
        </div>
    );
};

export default Login;
