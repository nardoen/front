import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ForgotPassword from '../components/ForgotPassword';

function ForgotPasswordPage() {
  return (
    <div>
      <Header />
      <div className="login-page-bg">
        <ForgotPassword />
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;