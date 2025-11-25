import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { addDays } from 'date-fns';
import authAxios from '../api/authAxios';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const getMinDate = () => {
  // Always allow tomorrow as the earliest delivery date
  return addDays(new Date(), 1);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });

  const [deliveryDate, setDeliveryDate] = useState(() => {
    try {
      const localData = localStorage.getItem('deliveryDate');
      if (localData && localData !== 'null') {
        const parsed = JSON.parse(localData);
        const date = new Date(parsed);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return null;
    } catch (error) {
      console.error("Could not parse delivery date from localStorage", error);
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [extraItems, setExtraItems] = useState({ drink: [], other: [] });
  const [extraLoading, setExtraLoading] = useState(false);
  const [extraError, setExtraError] = useState('');

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('deliveryDate', JSON.stringify(deliveryDate));
  }, [deliveryDate]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(i =>
          i.id === itemId ? { ...i, quantity } : i
        )
      );
    }
  };

  const updateOrderDeliveryDate = (date) => {
    setDeliveryDate(date);
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
    setDeliveryDate(null);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('deliveryDate');
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const fetchExtras = useCallback(async () => {
    setExtraLoading(true);
    setExtraError('');
    try {
      const res = await authAxios.get(`${import.meta.env.VITE_API_URL}/api/items/`);
      const filteredItems = res.data.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
      }, {});
      setExtraItems({
        drink: filteredItems.drink || [],
        other: filteredItems.other || []
      });
    } catch (err) {
      setExtraError('Failed to load extras.');
    } finally {
      setExtraLoading(false);
    }
  }, []);

  const cartTotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(2);

  const value = {
    cartItems,
    deliveryDate,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateOrderDeliveryDate,
    clearCart,
    getMinDate,
    isCartOpen,
    toggleCart,
    cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    cartTotal,
    extraItems,
    extraLoading,
    extraError,
    fetchExtras,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Utility function to order items by type
const orderItemsByType = (items) => {
  const filteredItems = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const orderedItems = {};
  ['dish', 'side', 'drink', 'other'].forEach((type) => {
    if (filteredItems[type]) {
      orderedItems[type] = filteredItems[type];
    }
  });

  return orderedItems;
};

// Export the utility function
export { orderItemsByType };
