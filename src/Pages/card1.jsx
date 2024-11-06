import React, { useState } from "react";
import { FiCreditCard, FiMail, FiUser, FiTruck } from "react-icons/fi";
import './card1.css';

const HoverDevCards = () => {
  return (
    <div className="p-4">
      {/* Ensure 4 columns in a single row on larger screens */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Best Brand - Best Quality" subtitle="Premium quality crackers" />
        <Card title="Minimum Order" subtitle="For Tamil Nadu & Pondicherry - Rs. 2500/-"  />
        <Card title="For Orders" subtitle="" />
        <Card title="Super Fast Delivery" subtitle="Best Transport Facility"  />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, href }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => setClicked(!clicked);

  // Dynamic icon based on title
  const renderIcon = () => {
    switch (title) {
      case "Super Fast Delivery":
        return <FiTruck />;
      case "Minimum Order":
        return <FiCreditCard />;
      case "Best Brand - Best Quality":
        return <FiUser />;
      case "For Orders":
        return <FiMail />;
      default:
        return <FiUser />;
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white ${
        clicked ? "hover-effect" : ""
      }`}
    >
      <div
        className={`absolute inset-0 ${
          clicked ? "bg-red-600" : "bg-gradient-to-r from-violet-600 to-indigo-600"
        } translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300`}
      />
      <div className="relative z-10">
        <div className="icon-container">{renderIcon()}</div>
        <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative duration-300">
          {title}
        </h3>
        <p className="text-slate-400 group-hover:text-violet-200 relative duration-300">
          {subtitle}
        </p>
      </div>
    </a>
  );
};

export default HoverDevCards;
