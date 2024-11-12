import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc,setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import animation from './images/rss.gif';
import { useNavigate } from 'react-router-dom';
import './PriceList.css';
import Footer from './footer';
import image1 from './images/offer1.webp';
import image2 from './images/offer2.webp';
import NavBar from './Navbar';

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
    const [loginPromptMessage, setLoginPromptMessage] = useState("");
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          
            const isItemAlreadyInTable = tableData.some(data => data.name === item.name);
    
            if (!isItemAlreadyInTable) {
                // Clear the tableData and set the selected item
                setTableData([{ ...item, qty: 1, amount: item.price }]);
            }
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
       
        updatedData[index].qty = isNaN(qty) || qty < 0 ? 1 : qty;
        updatedData[index].amount = updatedData[index].actualPrice * updatedData[index].qty;
        setTableData(updatedData);
    };


    const handleAddToCart = async (item) => {
        const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    
        // Check if username and mobile number are available in local storage
        if (userData && userData.name && userData.mobile) {
            const cartItem = {
                ...item,
                qty: item.qty || 1,
                amount: item.actualPrice * (item.qty || 1),
                userName: userData.name,
                userMobile: userData.mobile,
            };
    
            try {
                // Create a reference to the user's cart document using their userName and userMobile
                const cartDocRef = doc(db, 'Cart', `${userData.name}_${userData.mobile}`);
    
                // Check if the cart document already exists
                const docSnap = await getDoc(cartDocRef);
    
                if (docSnap.exists()) {
                    // If document exists, update it by adding the new item
                    const existingItems = docSnap.data().items || [];
                    existingItems.push(cartItem);
    
                    // Update the document with the new items list
                    await updateDoc(cartDocRef, { items: existingItems });
                    setConfirmationMessage(`${item.name} added to cart!`);
                } else {
                    // If no document exists, create a new one with the current item
                    await setDoc(cartDocRef, {
                        userName: userData.name,
                        userMobile: userData.mobile,
                        items: [cartItem]
                    });
                    setConfirmationMessage(`${item.name} added to cart!` );
                }
    
                // Hide the confirmation message after 2 seconds
                setTimeout(() => setConfirmationMessage(""), 2000);
            } catch (error) {
                console.error("Error adding item to cart in Firestore: ", error);
            }
        } else {
            // Prompt user to log in if username or mobile number is missing
            setLoginPromptMessage("Please log in to add items to the cart.");
            setTimeout(() => setLoginPromptMessage(""), 3000);
        }
    };
    


    const handleProceedToCart = () => {

       navigate('/cart')
    };
    const handleRazorpayPayment = (amount, offerName) => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const userMobile = loggedInUser?.mobile || "0000000000";
        const userName = loggedInUser?.name || "Guest";
    
        const options = {
            key: "rzp_test_DS4vEwjrMesmsa", 
            amount: amount * 100, 
            currency: "INR",
            name: "Vsoft Solutions",
            description: `Payment for ${offerName}`,
            handler: function (response) {
                alert(`Payment successful for ${offerName}! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: userName,
                contact: userMobile,
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
            <h2 style={{ color: 'black' }}>Price List</h2>

           
            <div className="offers-combos">
            <h3 style={{ color: 'black' }}>Offers and Combos</h3>

                <div className="offers-grid">
                    <div className="offer" onClick={() => handleRazorpayPayment(4000, 'Combo 1')}>
                        <img src={image1} alt="Offer 1" />
                        <h4 style={{ color: 'black' }}>Combo 1</h4>
                        <p style={{ color: 'black' }}>Price : ₹4000</p>
                    </div>
                    <div className="offer" onClick={() => handleRazorpayPayment(3000, 'Combo 2')}>
                        <img src={image2} alt="Offer 2" />
                        <h4 style={{ color: 'black' }}>Combo 2</h4>
                        <p style={{ color: 'black' }}>Price : ₹3000</p>
                    </div>
               
                </div>
                
            </div>

            <div className="buttons-section">
                <h3 style={{ color: 'black' }}>Select Firecracker Type</h3>
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

            {confirmationMessage && <div  style={{ color: 'black' }}>{confirmationMessage}</div>}
            {loginPromptMessage && <div  style={{ color: 'black' }}>{loginPromptMessage}</div>}

            <div className="price-table">
                <h3  style={{ color: 'black'} }>{selectedFirecracker ? `Selected: ${priceListData[selectedFirecracker].name}` : "Selected Price List"}</h3>
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
                                    <td style={{ color: 'black' }}>{item.name}</td>
                                    <td style={{ color: 'black' }}>{item.content}</td>
                                    <td style={{ color: 'black' }}> ₹ {item.price}</td>
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
                                           min={0}
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
            <Footer />
        </div>
    );
};

export default Prices;
