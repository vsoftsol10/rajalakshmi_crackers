import React, { useState } from 'react';
import './card3.css';
import image1 from './images/s3.webp';
import image2 from './images/s2.webp';
import image3 from './images/s3.webp';
import image4 from './images/s2.webp';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const crackers = [
  { name: 'Butter Crackers', image: image1, price: 50 },
  { name: 'Salt Crackers', image: image2, price: 30 },
  { name: 'Cheese Crackers', image: image3, price: 40 },
  { name: 'Spicy Crackers', image: image4, price: 35 },
];

const Card = ({ name, image, price, onExploreClick }) => (
  <div className="cards">
    <h3>{name}</h3>
    <img src={image} alt={name} />
    <div className="details">
      <div className="price"><span>₹{price}</span></div>
      <div className="explore">
        <button onClick={onExploreClick}>Explore</button>
      </div>
    </div>
  </div>
);

const CardsRows = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCracker, setSelectedCracker] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState({ name: '', mobile: '', address: '', paymentMethod: 'COD' });

  const handleSwipeLeft = () => setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : crackers.length - 1));
  const handleSwipeRight = () => setCurrentIndex((prevIndex) => (prevIndex < crackers.length - 1 ? prevIndex + 1 : 0));

  const openModal = (cracker) => setSelectedCracker(cracker);
  const closeModal = () => {
    setSelectedCracker(null);
    setQuantity(1);
    setDeliveryDetails({ name: '', mobile: '', address: '', paymentMethod: 'COD' });
  };

  const handleBuyNow = async () => {
    const totalAmount = selectedCracker.price * quantity;

    if (deliveryDetails.paymentMethod === 'COD') {
      await saveToFirebase();
      alert("Order placed successfully with Cash on Delivery!");
      closeModal();
    } else {
      const options = {
        key: 'rzp_test_DS4vEwjrMesmsa',
        amount: totalAmount * 100,
        currency: 'INR',
        name: selectedCracker.name,
        description: 'Purchase Crackers',
        handler: async function (response) {
          await saveToFirebase(response.razorpay_payment_id);
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          closeModal();
        },
        prefill: {
          name: deliveryDetails.name,
          email: 'vsoft@example.com',
          contact: deliveryDetails.mobile,
        },
        theme: { color: '#F37254' },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  };

  const saveToFirebase = async (paymentId = '') => {
    const orderData = {
      crackerName: selectedCracker.name,
      quantity,
      price: selectedCracker.price,
      totalAmount: selectedCracker.price * quantity,
      deliveryDetails: {
        name: deliveryDetails.name,
        mobile: deliveryDetails.mobile,
        address: deliveryDetails.address,
        paymentMethod: deliveryDetails.paymentMethod,
        paymentId,
      },
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, 'deliveryDetails'), orderData);
      console.log("Order saved to Firebase");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="card-containers">
      <button className="swipe-btn" onClick={handleSwipeLeft}>&lt;</button>
      <div className="card-row">
        {crackers.slice(currentIndex, currentIndex + 4).map((cracker, index) => (
          <Card key={index} {...cracker} onExploreClick={() => openModal(cracker)} />
        ))}
      </div>
      <button className="swipe-btn" onClick={handleSwipeRight}>&gt;</button>

      {selectedCracker && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedCracker.name}</h3>
            <img src={selectedCracker.image} alt={selectedCracker.name} />
            <p>Price per unit: ₹{selectedCracker.price}</p>
            <label>Quantity:
              <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" />
            </label>
            <p>Total: ₹{selectedCracker.price * quantity}</p>

            <div className="delivery-details">
              <label>Name: <input type="text" value={deliveryDetails.name} onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })} required /></label>
              <label>Mobile: <input type="text" value={deliveryDetails.mobile} onChange={(e) => setDeliveryDetails({ ...deliveryDetails, mobile: e.target.value })} required /></label>
              <label>Address: <textarea value={deliveryDetails.address} onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })} required /></label>
              <label>Payment Method:
                <select value={deliveryDetails.paymentMethod} onChange={(e) => setDeliveryDetails({ ...deliveryDetails, paymentMethod: e.target.value })}>
                  <option value="COD">Cash on Delivery</option>
                  <option value="Online">Pay Online</option>
                </select>
              </label>
            </div>

            <button className='csg' onClick={handleBuyNow}>Buy Now</button>
            <button className='cssg' onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardsRows;
