import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResetPassword from '../components/ResetPassword';

function ResetPasswordPage() {
  return (
    <div>
      <Header />
      <div className="login-page-bg">
        <ResetPassword />
      </div>
      <Footer />
    </div>
  );
}

export default ResetPasswordPage;