import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Add your CSS for styling the cart

// Firebase configuration
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

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // default to Cash on Delivery
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: '',
        address: '',
        phone: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartData')) || [];
        setCartItems(storedCart);
        // Calculate total amount
        const total = storedCart.reduce((acc, item) => acc + item.amount, 0);
        setTotalAmount(total);
    }, []);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleDeliveryDetailsChange = (event) => {
        const { name, value } = event.target;
        setDeliveryDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handlePayment = async () => {
        // Prepare delivery data
        const deliveryData = {
            items: cartItems.map(item => ({
                name: item.name,
                quantity: item.qty, // Assuming qty is stored in cart items
                amount: item.amount
            })),
            totalAmount,
            ...deliveryDetails,
            paymentStatus: paymentMethod === 'cod' ? 'Payment on delivery' : 'Payment confirmed (online)',
        };

        try {
            // Store delivery details in Firestore
            await addDoc(collection(db, 'deliveryDetails'), deliveryData);
            console.log("Delivery details saved successfully!", deliveryData);
            // Optionally clear the cart
            localStorage.removeItem('cartData');
            // Navigate to a success page or cart page
            navigate('/success'); // Change this to your desired route
        } catch (error) {
            console.error("Error saving delivery details: ", error);
        }
    };

    return (
        <div className="cart">
            <h2>Cart</h2>
            <h3>Products:</h3>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.name} - ₹{item.amount} (Quantity: {item.qty})
                    </li>
                ))}
            </ul>
            <h3>Total Amount: ₹{totalAmount}</h3>

            <h3>Delivery Details</h3>
            <form onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={deliveryDetails.name}
                    onChange={handleDeliveryDetailsChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Delivery Address"
                    value={deliveryDetails.address}
                    onChange={handleDeliveryDetailsChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={deliveryDetails.phone}
                    onChange={handleDeliveryDetailsChange}
                    required
                />

                <div>
                    <label>
                        <input
                            type="radio"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={handlePaymentMethodChange}
                        />
                        Cash on Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="online"
                            checked={paymentMethod === 'online'}
                            onChange={handlePaymentMethodChange}
                        />
                        Pay Online (Razorpay)
                    </label>
                </div>

                <button type="button" onClick={handlePayment}>Pay Now</button>
            </form>
        </div>
    );
};

export default Cart;
