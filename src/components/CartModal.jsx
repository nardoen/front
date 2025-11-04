import React, { useState } from 'react';
import axios from '../api/authAxios';
import LoginRegistration from './LoginRegistration';
import DatePicker from 'react-datepicker';
import { useCart } from '../context/CartContext';
import '../assets/css/CartModal.css';
import '../assets/css/DatePicker.css'; 
import { FaTrashAlt } from 'react-icons/fa';

const CartModal = () => {

  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, deliveryDate, updateOrderDeliveryDate, getMinDate } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!isCartOpen) {
    return null;
  }

  // Check login status
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const total = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(2);

  // Validate token with backend before proceeding
  const handleCheckout = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token && !authSuccess) {
      setShowAuthModal(true);
      return;
    }
    try {
      // Call a protected endpoint to validate token (e.g., /api/validate-token/ or /api/user/)
      await axios.get('/api/user/');
      // If valid, proceed to payment
      alert('Payment coming soon!');
    } catch (err) {
      // If 401 or error, remove token and show login modal
      localStorage.removeItem('accessToken');
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setAuthSuccess(true);
    setShowAuthModal(false);
    setTimeout(() => {
      alert('Payment coming soon!');
    }, 300);
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
      {showAuthModal && (
        <div className="cart-auth-modal-overlay">
          <div className="cart-auth-modal-content">
            <button className="cart-close-button" onClick={() => setShowAuthModal(false)}>&times;</button>
            <LoginRegistration onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
