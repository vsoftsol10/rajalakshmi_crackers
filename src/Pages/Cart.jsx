import React, { useEffect, useState } from 'react';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
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

    // Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

    useEffect(() => {
        if (storedUser.name && storedUser.mobile) {
            const fetchCartItems = async () => {
                const { name: userName, mobile: userMobile } = storedUser;

                console.log("Fetching cart for user:", userName, userMobile);

                const cartQuery = query(
                    collection(db, "Cart"),
                    where("userName", "==", userName),
                    where("userMobile", "==", userMobile)
                );

                const querySnapshot = await getDocs(cartQuery);
                if (querySnapshot.empty) {
                    console.log("No cart items found.");
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

                console.log("Items fetched:", items);
                console.log("Total amount:", total);

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

            if (paymentMethod === 'online') {
                const options = {
                    key: "rzp_test_DS4vEwjrMesmsa",
                    amount: totalAmount * 100,
                    currency: "INR",
                    name: "Vsoft Admin",
                    description: "Payment for Cart Order",
                    handler: async (response) => {
                        paymentStatus = 'Done (Online)';

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

                        await addDoc(collection(db, "deliveryDetails"), orderData);
                        if (emiOption) {
                            const emiDetails = {
                                totalAmount,
                                firstPayment: totalAmount * 0.2,
                                emiStatus: 'EMI Payment',
                                timestamp: new Date()
                            };
                            await addDoc(collection(db, "emiDetails"), emiDetails);
                        }

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
            } else {
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

                await addDoc(collection(db, "deliveryDetails"), orderData);
                if (emiOption) {
                    const emiDetails = {
                        totalAmount,
                        firstPayment: totalAmount * 0.2,
                        emiStatus: 'EMI Payment',
                        timestamp: new Date()
                    };
                    await addDoc(collection(db, "emiDetails"), emiDetails);
                }

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

                <h3 className='ch3'>Payment Options</h3>
                <div>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={handlePaymentMethodChange}
                    />
                    Cash on Delivery
                </div>
                <div>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={handlePaymentMethodChange}
                    />
                    Online Payment (Razorpay)
                </div>

                

                <button className='btn-cart' onClick={handlePayment}>
                    Place Order
                </button>

                {showPopup && (
                    <div className='popup'>
                        <p>{confirmationMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart; 