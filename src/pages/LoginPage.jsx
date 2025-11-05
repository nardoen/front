import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Registration from '../components/Registration';

function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <Header />
      <div className="login-page-bg">
        {showLogin ? (
          <Login onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <Registration onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
