import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Registration from '../components/Registration';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuthSuccess = (user) => {
    login(user); // Update the global state
    navigate('/'); // Redirect to home page
  };
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <div className="login-page-bg">
        {showLogin ? (
          <Login onAuthSuccess={handleAuthSuccess} onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <Registration onSwitchToLogin={() => setShowLogin(true)} onAuthSuccess={handleAuthSuccess} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
