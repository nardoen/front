import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { addDays } from 'date-fns';
import authAxios from '../api/authAxios';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const getMinDate = () => {
  const now = new Date();
  const amsterdamTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Amsterdam"}));
  const day = amsterdamTime.getDay(); // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const hour = amsterdamTime.getHours();
  let minDate = new Date(amsterdamTime);

  if (day >= 1 && day <= 4) { // Mon-Thu: always next day
    minDate = addDays(minDate, 1);
  } else { // Fri-Sun: if before 12:00, same day; else next day
    if (hour >= 12) {
      minDate = addDays(minDate, 1);
    }
  }

  // Set to start of day
  minDate.setHours(0, 0, 0, 0);
  return minDate;
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
        const date = new Date(localData);
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

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('deliveryDate', deliveryDate ? deliveryDate.toISOString().split('T')[0] : 'null');
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
      toast.success(`${item.name} is toegevoegd aan de winkelwagen!`);
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
