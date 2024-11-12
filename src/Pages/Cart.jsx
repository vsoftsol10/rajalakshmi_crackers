import React, { useEffect, useState } from 'react';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import NavbarComponent from './Navbar.jsx';
import './Cart.css';

const firebaseConfig = {
    apiKey: "AIzaSyAZdEOLvUbpGuL4s2qYMETvKuU9FZjtDFM",
    authDomain: "vsoftadmin-29f4f.firebaseapp.com",
    projectId: "vsoftadmin-29f4f",
    storageBucket: "vsoftadmin-29f.appspot.com",
    messagingSenderId: "654111268361",
    appId: "1:654111268361:web:18d69557a90a9c8599a2d8",
    measurementId: "G-JKTCSL34SJ"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [emiOption, setEmiOption] = useState(false);
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: '',
        address: '',
        phone: ''
    });
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

    useEffect(() => {
        if (storedUser.name && storedUser.mobile) {
            const fetchCartItems = async () => {
                const { name: userName, mobile: userMobile } = storedUser;

                const cartQuery = query(
                    collection(db, "Cart"),
                    where("userName", "==", userName),
                    where("userMobile", "==", userMobile)
                );

                const querySnapshot = await getDocs(cartQuery);
                if (querySnapshot.empty) {
                    setCartItems([]);
                    setTotalAmount(0);
                    return;
                }

                let items = [];
                let total = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.items) {
                        items = [...items, ...data.items];
                        total += data.items.reduce((acc, item) => acc + item.amount, 0);
                    }
                });

                setCartItems(items);
                setTotalAmount(total);
            };

            fetchCartItems();
        }
    }, [storedUser, db]);

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleEmiOptionChange = () => {
        setEmiOption(!emiOption);
    };

    const handleDeliveryDetailsChange = (event) => {
        const { name, value } = event.target;
        setDeliveryDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const clearUserCart = async () => {
        if (!storedUser.name || !storedUser.mobile) {
            console.error("User details are missing or invalid.");
            return;
        }

        try {
            const cartQuery = query(
                collection(db, "Cart"),
                where("userName", "==", storedUser.name),
                where("userMobile", "==", storedUser.mobile)
            );

            const querySnapshot = await getDocs(cartQuery);

            if (querySnapshot.empty) {
                console.log("No cart document found for this user.");
                return;
            }

            querySnapshot.forEach(async (docSnap) => {
                await deleteDoc(doc(db, "Cart", docSnap.id));
                console.log(`Deleted cart document with ID: ${docSnap.id}`);
            });
        } catch (error) {
            console.error("Error deleting cart document:", error);
        }
    };

    const handlePayment = async () => {
        try {
            let paymentStatus = paymentMethod === 'cod' ? 'Pending (COD)' : 'Processing';
            let emiStatus = emiOption ? 'EMI selected' : 'No EMI';
    
            // Check if EMI option is valid for the order total
            if (emiOption && totalAmount <= 6000) {
                alert("EMI option is only available for orders greater than ₹6000.");
                setEmiOption(false);
                return;
            }
    
            // If EMI is selected, calculate the first payment and balance
            let firstPayment = emiOption ? totalAmount * 0.2 : totalAmount; // 20% of total if EMI, otherwise full amount
            let balanceAmount = emiOption ? totalAmount - firstPayment : 0;
            const emiDuration = emiOption ? (balanceAmount <= 10000 ? 3 : 6) : 0; // 3 or 6 months based on balance amount
            let permontpay =    emiOption ? ( balanceAmount % 6) : 0;
           
    
            // Common order data for Firestore
            const orderData = {
                deliveryDetails,
                paymentMethod,
                emiStatus,
                paymentStatus,
                totalAmount,
                items: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    amount: item.amount
                })),
                timestamp: new Date()
            };
    
            // Handle online payment
            if (paymentMethod === 'online') {
                const options = {
                    key: "rzp_test_DS4vEwjrMesmsa",
                    amount: firstPayment * 100, // Charge only firstPayment if EMI, or totalAmount if no EMI
                    currency: "INR",
                    name: "Vsoft Admin",
                    description: "Payment for Cart Order",
                    handler: async (response) => {
                        paymentStatus = 'Done (Online)';
                        await addDoc(collection(db, "deliveryDetails"), orderData);
    
                        // Store EMI details if EMI is selected
                        if (emiOption) {
                            const emiDetails = {
                                totalAmount,
                                firstPayment,
                                emiStatus: 'EMI Payment',
                                balanceAmount,
                                emiDuration,
                                timestamp: new Date()
                            };
                            await addDoc(collection(db, "emiDetails"), emiDetails);
                        }
    
                        // Clear cart and show confirmation
                        await clearUserCart();
                        localStorage.removeItem('cartData');
                        setCartItems([]);
                        setConfirmationMessage('Order placed successfully!');
                        setShowPopup(true);
                        setTimeout(() => {
                            setShowPopup(false);
                            setConfirmationMessage('');
                            navigate('/');
                        }, 2000);
                    },
                    prefill: {
                        name: deliveryDetails.name,
                        contact: deliveryDetails.phone
                    },
                    notes: {
                        address: deliveryDetails.address
                    },
                    theme: {
                        color: "#F37254"
                    }
                };
    
                const razorpay = new window.Razorpay(options);
                razorpay.open();
    
            } else if (paymentMethod === 'cod') {
                // Handle COD payment, no online gateway needed
                await addDoc(collection(db, "deliveryDetails"), orderData);

                function getDateSixMonthsFromNow() {
                    const date = new Date();
                    date.setMonth(date.getMonth()  <= 10000 ? 3 : 6); // Add 6 months to the current month
                    return date;
                }
                
                // Store EMI details if EMI is selected for COD
                if (emiOption) {
                    const emiDetails = {
                        totalAmount,
                        firstPayment,
                        emiStatus: 'EMI Payment (COD)',
                        balanceAmount,
                        permontpay,
                        emiDuration,
                        timestamp: new Date(),
                        lastMonthPay: getDateSixMonthsFromNow()
                        
                    };
                    await addDoc(collection(db, "Emidetails"), emiDetails);
                }
    
                // Clear cart and show confirmation
                await clearUserCart();
                localStorage.removeItem('cartData');
                setCartItems([]);
                setConfirmationMessage('Order placed successfully!');
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    setConfirmationMessage('');
                    navigate('/');
                }, 2000);
            }
    
        } catch (error) {
            console.error("Error processing payment: ", error);
            alert("Failed to process order.");
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    return (
        <div className='cart1'>
            <NavbarComponent 
                isLoggedIn={isLoggedIn} 
                handleLogout={handleLogout} 
            />
            <div className="carts">
                <h2 className='ch'>Cart For {storedUser.name}</h2>
                <h3 className='ch3'>Products:</h3>
                <ul className='uls'>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} (Quantity: {item.qty}) - ₹{item.amount}
                        </li>
                    ))}
                </ul>
                <h3 className='ch3'>Total Amount: ₹{totalAmount}</h3>

                <h3 className='ch3'>Delivery Details</h3>
                <form onSubmit={e => e.preventDefault()} className='f3'>
                    <input className='i'
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={deliveryDetails.name}
                        onChange={handleDeliveryDetailsChange}
                        required
                    />
                    <input className='i'
                        type="text"
                        name="address"
                        placeholder="Delivery Address"
                        value={deliveryDetails.address}
                        onChange={handleDeliveryDetailsChange}
                        required
                    />
                    <input className='i'
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={deliveryDetails.phone}
                        onChange={handleDeliveryDetailsChange}
                        required
                    />
                </form>

                <label className="check-cont">
                    EMI Option (Available for orders over ₹6000)
                    <input type="checkbox" checked={emiOption} onChange={handleEmiOptionChange} />
                    <span className="checkmark"></span>
                </label>

                {emiOption && totalAmount > 6000 && (
                    <div className="emi-info " style={{ color: 'white'}}>
                        <p >EMI Payment (20% upfront)</p>
                        <p >First Payment: ₹{totalAmount * 0.2}</p>
                    </div>
                )}

                <div className='pay'>
                    <h3 style={{ color: 'white'}}>Payment Options:</h3>
                    <div className="paymentMethod" style={{ color: 'white'}} >
                        <label>
                            <input 
                                type="radio" 
                                value="cod" 
                                checked={paymentMethod === 'cod'} 
                                onChange={handlePaymentMethodChange} 
                            />
                            Cash on Delivery (COD)
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="online" 
                                checked={paymentMethod === 'online'} 
                                onChange={handlePaymentMethodChange} 
                            />
                            Online Payment (via Razorpay)
                        </label>
                    </div>
                </div>

                <button className='check' onClick={handlePayment}>Place Order</button>

                {showPopup && (
                    <div className="popup">
                        <p>{confirmationMessage}</p>
                    </div>
                )}
            </div>
<div className='cf'>  <Footer /></div>
          
        </div>
    );
};

export default Cart;
