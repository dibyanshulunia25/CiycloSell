// frontend/src/context/CartContext.jsx

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cartItems.find(item => item.bicycle === newItem.bicycle);
      const cartItems = existItem
        ? state.cartItems.map(item => item.bicycle === existItem.bicycle ? newItem : item)
        : [...state.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cartItems };
    }
    case 'REMOVE_ITEM': {
      const cartItems = state.cartItems.filter(item => item.bicycle !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cartItems };
    }
    case 'CLEAR_CART':
      localStorage.removeItem('cartItems');
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  }

  const value = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};