// src/store.js
import { createStore } from 'redux';

// Initial state
const initialState = {
    cart: []
};

// Reducer function
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.name !== action.payload.name)
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};

// Create store
const store = createStore(cartReducer);

// Export the store
export default store;
