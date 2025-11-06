import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

  return (
    <div>
      <Header />
      <div className="login-page-bg">
        {showLogin ? (
          <Login onAuthSuccess={handleAuthSuccess} onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <Registration onSwitchToLogin={() => setShowLogin(true)} onAuthSuccess={handleAuthSuccess} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
