import React, { useState } from 'react';
import './PriceList.css';

const Prices = () => {
    const priceListData = {
        sparkles: { name: "Sparkles", content: "Colorful sparkles.", price: 100 },
        soundcracker: { name: "Sound Cracker", content: "Loud and fun.", price: 150 },
        bijili: { name: "Bijili", content: "Traditional firecracker.", price: 120 },
        "ground-chakkara": { name: "Ground Chakkara", content: "Spinning ground firecracker.", price: 80 },
        "flower-parts": { name: "Flower Parts", content: "Flower-shaped firecracker.", price: 200 },
        rockets: { name: "Rockets", content: "Sky-high rockets.", price: 250 },
        pencils: { name: "Pencils", content: "Pencil firecrackers.", price: 90 },
        "night-sky-cracker": { name: "Night Sky Cracker", content: "Nighttime fireworks.", price: 300 },
        whistle: { name: "Whistle", content: "Whistling firecracker.", price: 70 },
        // Add more firecrackers as needed
    };

    const [tableData, setTableData] = useState([]);
    const [selectedFirecracker, setSelectedFirecracker] = useState(null);

    // Function to handle button clicks
    const handleButtonClick = (type) => {
        const item = priceListData[type];
        setSelectedFirecracker(type); // Set the selected firecracker type

        setTableData((prevData) => [
            ...prevData,
            { ...item, qty: 1, amount: item.price } // Initialize quantity and amount
        ]);
    };

    // Function to update quantity and amount
    const handleQtyChange = (index, qty) => {
        const updatedData = [...tableData];
        updatedData[index].qty = qty;
        updatedData[index].amount = updatedData[index].price * qty;
        setTableData(updatedData);
    };

    // Function to add to cart (placeholder)
    const handleAddToCart = () => {
        alert('All selected items added to cart!');
        // Implement cart functionality here
    };

    return (
        <div className="price-list">
            <h2>Price List</h2>

            {/* Offers and Combos Section */}
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
                    {/* Add more offers as needed */}
                </div>
            </div>

            {/* Buttons Section */}
            <div className="buttons-section">
                <h3>Select Firecracker Type</h3>
                <div className="button-container">
                    {Object.keys(priceListData).map((type) => (
                        <button
                            key={type}
                            className="firecracker-button"
                            onClick={() => handleButtonClick(type)}
                        >
                            {priceListData[type].name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price List Table */}
            <div className="price-table">
                <h3>{selectedFirecracker ? `Selected: ${priceListData[selectedFirecracker].name}` : "Selected Price List"}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Content</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedFirecracker && tableData
                            .filter(item => item.name === priceListData[selectedFirecracker].name) // Filter by selected firecracker
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.content}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.qty}
                                            min="1"
                                            onChange={(e) => handleQtyChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td>{item.amount}</td>
                                    <td>
                                        <button className="add-to-cart">Add to Cart</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {selectedFirecracker && (
                    <button id="cart-button" onClick={handleAddToCart}>Add All to Cart</button>
                )}
            </div>
        </div>
    );
};

export default Prices;
