import React, { createContext, useState, useContext, useEffect } from 'react';
import authAxios from '../api/authAxios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent UI flicker

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // This request will succeed if the user has a valid session cookie
        const response = await authAxios.get('/api/check-auth/');
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        // If it fails (e.g., 401 error), it means the user is not logged in.
        setUser(null);
      } finally {
        // We're done checking, so we can show the UI.
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []); // This runs only once when the app loads

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authAxios.post('/api/logout/');
      setUser(null);
      window.location.href = '/login'; // Redirect to login after logout
    } catch (error) {
      console.error('Uitloggen mislukt:', error);
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
  };

  // We don't render the app until the auth check is complete
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
