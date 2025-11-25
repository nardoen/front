import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ItemContext = createContext();

export const useItems = () => {
  return useContext(ItemContext);
};

const API_URL = import.meta.env.VITE_API_URL || '';

export const ItemProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await axios.get(`${API_URL}/api/items/`);
        const filteredItems = res.data.reduce((acc, item) => {
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

        setMenuItems(orderedItems);
      } catch (err) {
        setError('Failed to load menu.');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);
  console.log(menuItems)

  const value = {
    menuItems,
    loading,
    error,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};