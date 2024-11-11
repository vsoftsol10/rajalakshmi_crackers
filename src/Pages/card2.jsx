import React, { useState } from "react";
import image1 from './images/s1.webp';
import image2 from './images/s2.webp';
import image3 from './images/s3.webp';
import './card2.css';

const HoverCard = ({ title, backgroundImage, backgroundColor }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    
    <div
      className={`card-container ${isClicked ? 'clicked' : ''}`}
      onClick={handleCardClick}
    >
      
      <div className="image-container">
        <img src={backgroundImage} alt={title} className="card-image" />
      </div>
      <div className="card-info">
        <h4 className="card-title">{title}</h4>
      </div>
    </div>
  );
};

const CardsRow = () => {
  return (
    <div>
      <h3 style={{ color: 'black'  , fontSize:'2rem'}}>Cracker Varities</h3>

        <div className="cards-row">
      
      <HoverCard
        title="Ear Boomers"
        backgroundImage={image1}
        backgroundColor="#ff7f50"
      />
      <HoverCard
        title="Eyes Catchers"
        backgroundImage={image2}
        backgroundColor="#6495ed"
      />
      <HoverCard
        title="Kids Favorite"
        backgroundImage={image3}
        backgroundColor="#ff6347"
      />
    </div>
    </div>
  
  );
};

export default CardsRow;
