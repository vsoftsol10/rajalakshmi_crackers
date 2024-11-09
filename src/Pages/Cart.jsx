
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './PriceList.css';
import image1 from './images/offer1.webp';
import image2 from './images/offer2.webp';
import NavBar from './Navbar';

const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID",
    measurementId: "YOUR_FIREBASE_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Prices = () => {
    const [tableData, setTableData] = useState([]);
    const [selectedFirecracker, setSelectedFirecracker] = useState(null);
    const [priceListData, setPriceListData] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [loginPromptMessage, setLoginPromptMessage] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'crackers'));
            const data = {};
            querySnapshot.forEach((doc) => {
                const item = doc.data();
                data[doc.id] = item;
            });
            setPriceListData(data);
        };

        fetchData();
    }, []);

    const handleButtonClick = (type) => {
        const item = priceListData[type];
        if (item) {
            setSelectedFirecracker(type);
            setTableData((prevData) => [
                ...prevData,
                { ...item, qty: 1, amount: item.price }
            ]);
        }
    };

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

    const handleQtyChange = (index, qty) => {
        const updatedData = [...tableData];
        updatedData[index].qty = qty;
        updatedData[index].amount = updatedData[index].actualPrice * qty;
        setTableData(updatedData);
    };

    const handleAddToCart = (item) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            const totalAmount = item.actualPrice * item.qty; 
            const cartItem = { name: item.name, amount: totalAmount, qty: item.qty, ...item };
            const existingCart = JSON.parse(localStorage.getItem('cartData')) || [];
            existingCart.push(cartItem);
            localStorage.setItem('cartData', JSON.stringify(existingCart));
            setConfirmationMessage(`${item.name} added to cart!`);
            setTimeout(() => setConfirmationMessage(""), 2000);
        } else {
            setLoginPromptMessage("Please log in to add items to the cart.");
            setTimeout(() => setLoginPromptMessage(""), 3000);
        }
    };

    const handleProceedToCart = () => {
        navigate('/cart');
    };

    const handleRazorpayPayment = (amount, offerName) => {
        const options = {
            key: "rzp_test_DS4vEwjrMesmsa", // Razorpay Key
            amount: amount * 100, // Amount in paise
            currency: "INR",
            name: "Vsoft Solutions",
            description: `Payment for ${offerName}`,
            handler: function (response) {
                alert(`Payment successful for ${offerName}! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "Your Name",
                email: "your.email@example.com",
                contact: "1234567890",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="price-list">
            <NavBar isLoggedIn={isLoggedIn} handleCartClick={() => {}} handleLogout={handleLogout} />
            <h2>Price List</h2>

            <div className="offers-combos">
                <h3>Offers and Combos</h3>
                <div className="offers-grid">
                    <div className="offer" onClick={() => handleRazorpayPayment(4000, 'Combo 1')}>
                        <img src={image1} alt="Offer 1" />
                        <h4>Combo 1</h4>
                        <p>Price : ₹4000</p>
                    </div>
                    <div className="offer" onClick={() => handleRazorpayPayment(3000, 'Combo 2')}>
                        <img src={image2} alt="Offer 2" />
                        <h4>Combo 2</h4>
                        <p>Price : ₹3000</p>
                    </div>
                </div>
            </div>

            <div className="buttons-section">
                <h3>Select Firecracker Type</h3>
                <div className="button-container">
                    {Object.keys(priceListData).map((type) => (
                        <button
                            key={type}
                            className="firecracker-button"
                            onClick={() => handleButtonClick(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {confirmationMessage && <div className="confirmation">{confirmationMessage}</div>}
            {loginPromptMessage && <div className="login-prompt">{loginPromptMessage}</div>}

            <div className="price-table">
                <h3>{selectedFirecracker ? `Selected: ${priceListData[selectedFirecracker].name}` : "Selected Price List"}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Content</th>
                            <th>Price</th>
                            <th>Actual Price</th>
                            <th>Qty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedFirecracker && tableData
                            .filter(item => item.name === priceListData[selectedFirecracker].name)
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.content}</td>
                                    <td> ₹ {item.price}</td>
                                    <td>
                                        <span style={{ textDecoration: 'line-through', color: 'red' }}>
                                            ₹ {item.price}
                                        </span><br />
                                        ₹ {item.actualPrice}
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.qty}
                                            min="1"
                                            onChange={(e) => handleQtyChange(index, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <button className="add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {selectedFirecracker && (
                    <button id="cart-button" onClick={handleProceedToCart}>Proceed to Cart</button>
                )}
            </div>
        </div>
    );
};

export default Prices;
