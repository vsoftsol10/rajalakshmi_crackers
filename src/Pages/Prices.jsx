import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './PriceList.css';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAZdEOLvUbpGuL4s2qYMETvKuU9FZjtDFM",
    authDomain: "vsoftadmin-29f4f.firebaseapp.com",
    projectId: "vsoftadmin-29f4f",
    storageBucket: "vsoftadmin-29f4f.appspot.com",
    messagingSenderId: "654111268361",
    appId: "1:654111268361:web:18d69557a90a9c8599a2d8",
    measurementId: "G-JKTCSL34SJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Prices = () => {
    const [tableData, setTableData] = useState([]);
    const [selectedFirecracker, setSelectedFirecracker] = useState(null);
    const [priceListData, setPriceListData] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const navigate = useNavigate();

    // Fetch data from Firestore
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

    const handleQtyChange = (index, qty) => {
        const updatedData = [...tableData];
        updatedData[index].qty = qty;
        updatedData[index].amount = updatedData[index].actualPrice * qty;
        setTableData(updatedData);
    };

    // Add item to cart and show confirmation
    const handleAddToCart = (item) => {
        const totalAmount = item.actualPrice * item.qty; 

        const cartItem = {
            name: item.name,
            amount: totalAmount,
            qty: item.qty,
            ...item
        };

        const existingCart = JSON.parse(localStorage.getItem('cartData')) || [];
        existingCart.push(cartItem);
        localStorage.setItem('cartData', JSON.stringify(existingCart));

        setConfirmationMessage(`${item.name} added to cart!`);
        setTimeout(() => setConfirmationMessage(""), 2000);
    };

    const handleProceedToCart = () => {
       
        navigate('/cart');
    };

    return (
        <div className="price-list">
            <h2>Price List</h2>

            <div className="offers-combos">
                <h3>Offers and Combos</h3>
                <div className="offers-grid">
                    <div className="offer">
                        <img src="./images/offer1.png" alt="Offer 1" />
                        <h4>Combo 1</h4>
                        <p>Details about Combo 1.</p>
                    </div>
                    <div className="offer">
                        <img src="./images/offer2.png" alt="Offer 2" />
                        <h4>Combo 2</h4>
                        <p>Details about Combo 2.</p>
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
