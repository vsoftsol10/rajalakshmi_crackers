import React, { useState } from 'react';
import './card3.css'; // Update the path if necessary
import image1 from './images/s3.webp';
import image2 from './images/s2.webp';
import image3 from './images/s3.webp';
import image4 from './images/s2.webp'; // Add any additional images you need

const crackers = [
  {
    name: 'Butter Crackers',
    image: image1, // Use the imported image
    price: 50,
  },
  {
    name: 'Salt Crackers',
    image: image2, // Use the imported image
    price: 30,
  },
  {
    name: 'Cheese Crackers',
    image: image3, // Use the imported image
    price: 40,
  },
  {
    name: 'Spicy Crackers',
    image: image4, // Use the imported image
    price: 35,
  },
  // Add more cards here
];

const Card = ({ name, image, price }) => (
  <div className="cards">
    <h3>{name}</h3>
    <img src={image} alt={name} />
    <div className="details">
      <div className="price">
        <span>₹{price}</span>
      </div>
      <div className="explore">
        <button>Explore</button>
      </div>
    </div>
  </div>
);

const CardsRows = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : crackers.length - 1));
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex < crackers.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="card-containers">
      <button className="swipe-btn" onClick={handleSwipeLeft}>&lt;</button>
      <div className="card-row">
        {crackers
          .slice(currentIndex, currentIndex + 4) // Show 4 cards at a time
          .map((cracker, index) => (
            <Card key={index} name={cracker.name} image={cracker.image} price={cracker.price} />
          ))}
      </div>
      <button className="swipe-btn" onClick={handleSwipeRight}>&gt;</button>
    </div>
  );
};

export default CardsRows;
