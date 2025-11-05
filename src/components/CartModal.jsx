import React, { useState } from 'react';
import axios from '../api/authAxios';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import { useCart } from '../context/CartContext';
import '../assets/css/CartModal.css';

import '../assets/css/DatePicker.css'; 
import { FaTrashAlt } from 'react-icons/fa';
import Login from './Login';

const CartModal = () => {

  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, deliveryDate, updateOrderDeliveryDate, getMinDate } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [guestError, setGuestError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const guestNameRef = useRef();
  const guestEmailRef = useRef();
  // No registration in modal, only login

  if (!isCartOpen) {
    return null;
  }

  // Check login status
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const total = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(2);

  // Validate token with backend before proceeding
  const handleCheckout = async () => {
    console.log('Checkout clicked');
    setCheckoutError('');
    const token = localStorage.getItem('accessToken');
    console.log('Token:', token, 'AuthSuccess:', authSuccess);
    if (!token && !authSuccess) {
      console.log('No token and not authenticated, showing auth modal');
      setShowAuthModal(true);
      setShowGuestForm(false);
      return;
    }
    try {
      console.log('Validating token with backend...');
      await axios.get('/api/user/');
      alert('Payment coming soon!');
    } catch (err) {
      console.log('Token validation failed:', err);
      localStorage.removeItem('accessToken');
      setShowAuthModal(true);
      setShowGuestForm(false);
      setCheckoutError(
        err?.response?.status === 401
          ? 'Session expired. Please log in again or continue as a guest.'
          : 'Could not validate user. Please log in or continue as guest.'
      );
    }
  };

  const handleAuthSuccess = () => {
    console.log('Auth success!');
    setAuthSuccess(true);
    setShowAuthModal(false);
    setTimeout(() => {
      alert('Payment coming soon!');
    }, 300);
  };

  const handleGuestContinue = () => {
  console.log('Continue as guest clicked');
  setShowGuestForm(true);
  setGuestError('');
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    setGuestLoading(true);
    setGuestError('');
    const name = guestNameRef.current.value.trim();
    const email = guestEmailRef.current.value.trim();
    console.log('Guest submit:', { name, email });
    if (!name || !email) {
      setGuestError('Please enter your name and email.');
      setGuestLoading(false);
      return;
    }
    try {
      // Send guest info to backend (adjust endpoint as needed)
      console.log('Sending guest info to backend...');
      await axios.post('/api/guest-checkout/', { name, email, is_guest: true });
      setShowAuthModal(false);
      setShowGuestForm(false);
      setTimeout(() => {
        alert('Payment coming soon!');
      }, 300);
    } catch (err) {
      console.log('Guest checkout failed:', err);
      setGuestError('Failed to continue as guest.');
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <>
      <div className="cart-modal-overlay" onClick={toggleCart}>
        <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>Your Cart</h2>
          <button className="cart-close-button" onClick={toggleCart}>&times;</button>
        </div>
        
        {cartItems.length === 0 ? (
          <p className="cart-empty-message">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items-list">
              {cartItems.map((item, idx) => {
                const priceNum = Number(item.price);
                return (
                  <li key={item.id + '-' + idx} className="cart-item">
                    <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <p>${!isNaN(priceNum) ? priceNum.toFixed(2) : item.price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="quantity-input"
                        min="1"
                      />
                      <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="cart-modal-footer">
              <div className="cart-total">Total: ${total}</div>
              <div className="date-picker-container" style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Delivery Date:</label>
                <DatePicker
                  key={isCartOpen}
                  selected={deliveryDate || undefined}
                  onChange={updateOrderDeliveryDate}
                  minDate={getMinDate()}
                  dateFormat="MMMM d, yyyy"
                  className="form-control beautiful-datepicker"
                  placeholderText="Choose your delivery date"
                  openToDate={getMinDate()}
                />
              </div>
              <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
      </div>
      {/* Auth Modal */}
      {console.log('Render: showAuthModal', showAuthModal, 'showGuestForm', showGuestForm)}
      {showAuthModal && (
        <div className="cart-auth-modal-overlay">
          <div className="cart-auth-modal-content">
            <button className="cart-close-button" onClick={() => { 
              console.log('Closing auth modal');
              setShowAuthModal(false); setShowGuestForm(false); setCheckoutError(''); }}>&times;</button>
            {checkoutError && (
              <div className="text-danger mb-3" style={{ textAlign: 'center' }}>{checkoutError}</div>
            )}
            {!showGuestForm ? (
              <div className="login-card mx-auto p-4">
                <Login onAuthSuccess={handleAuthSuccess} />
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <span style={{ color: '#888' }}>or</span>
                  <br />
                  <button className="guest-link-btn" onClick={handleGuestContinue}>
                    Continue as a guest
                  </button>
                </div>
              </div>
            ) : (
              <div className="login-card mx-auto p-4">
                <form onSubmit={handleGuestSubmit} className="guest-form">
                  <h4 className="form-title text-center mb-4">Continue as Guest</h4>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" ref={guestNameRef} className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" ref={guestEmailRef} className="form-control" required />
                  </div>
                  <input type="hidden" name="is_guest" value="true" />
                  {guestError && <div className="text-danger mb-2">{guestError}</div>}
                  <button type="submit" className="btn btn-primary w-100 auth-button" disabled={guestLoading}>
                    {guestLoading ? 'Continuing...' : 'Continue to Payment'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
