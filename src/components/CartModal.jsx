import React, { useState } from 'react';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOffDay } from '../context/OffDayContext';
import { useItems } from '../context/ItemContext';
import '../assets/css/CartModal.css';
import '../assets/css/DatePicker.css'; 
import { FaTrashAlt } from 'react-icons/fa';
import Login from './Login';
import authAxios from '../api/authAxios';

const CartModal = () => {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, deliveryDate, updateOrderDeliveryDate, getMinDate, cartTotal, addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { isOffDay, getOffDayDates } = useOffDay();
  const { menuItems, loading: itemsLoading, error: itemsError } = useItems();
  
  // Set default delivery date to tomorrow if not already set when cart opens
  React.useEffect(() => {
    if (isCartOpen && !deliveryDate) {
      updateOrderDeliveryDate(getMinDate());
    }
  }, [isCartOpen, deliveryDate, updateOrderDeliveryDate, getMinDate]);
  
  // Add useEffect to dynamically update off-day dates when the modal is toggled
  React.useEffect(() => {
    if (isCartOpen) {
      getOffDayDates(); // Ensure the latest off-day dates are fetched
    }
  }, [isCartOpen, getOffDayDates]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [guestError, setGuestError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const guestNameRef = useRef();
  const guestEmailRef = useRef();
  // No registration in modal, only login

  if (!isCartOpen) {
    return null;
  }

  // Validate token with backend before proceeding
  const handleCheckout = async () => {
    setCheckoutError('');
    
    // Check if delivery date is selected
    if (!deliveryDate) {
      setCheckoutError('Please select a delivery date before proceeding to checkout.');
      return;
    }
    
    if (isLoggedIn) {
      // Logged in: proceed directly to payment
      setLoginLoading(true);
      try {
        const response = await authAxios.post('/api/payment/start/', {
          cart: cartItems,
          deliveryDate,
          total: cartTotal,
        });
        if (response.data && response.data.checkout_url) {
          window.location.href = response.data.checkout_url;
        } else {
          setCheckoutError('Could not start payment. Please try again.');
        }
      } catch (err) {
        setCheckoutError('Could not start payment. Please try again.');
        console.error('Payment start error:', err);
      } finally {
        setLoginLoading(false);
      }
      return;
    }
    // Not logged in: show auth modal/guest form
    setShowAuthModal(true);
    setShowGuestForm(false);
  }

  const handleAuthSuccess = async () => {
    setAuthSuccess(true);
    setShowAuthModal(false);
    setLoginLoading(true);
    // Keep overlay until payment completes or fails
    try {
      const response = await authAxios.post('/api/payment/start/', {
        cart: cartItems,
        deliveryDate,
        total: cartTotal,
      });
      if (response.data && response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
        // Do not setLoginLoading(false) here, let redirect happen with overlay
      } else {
        setCheckoutError('Could not start payment. Please try again.');
        setLoginLoading(false);
      }
    } catch (err) {
      setCheckoutError('Could not start payment. Please try again.');
      console.error('Payment start error:', err);
      setLoginLoading(false);
    }
  };

  const handleGuestContinue = () => {
  setShowGuestForm(true);
  setGuestError('');
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    setGuestLoading(true);
    setGuestError('');
    const name = guestNameRef.current.value.trim();
    const email = guestEmailRef.current.value.trim();
    if (!name || !email) {
      setGuestError('Please enter your name and email.');
      setGuestLoading(false);
      return;
    }
    try {
      await authAxios.post('/api/guest-checkout/', { name, email, is_guest: true });
      setShowAuthModal(false);
      setShowGuestForm(false);
      // Now start Mollie payment for guest
      try {
        const response = await authAxios.post('/api/payment/start/', {
          email: email,
          cart: cartItems,
          deliveryDate,
          total: cartTotal,
        });
        if (response.data && response.data.checkout_url) {
          // Show loading while redirecting
          setGuestLoading(true);
          window.location.href = response.data.checkout_url;
        } else {
          setGuestError('Could not start payment. Please try again.');
        }
      } catch (err) {
        setGuestError('Could not start payment. Please try again.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.detail || 'Failed to continue as guest.';
      setGuestError(errorMessage);
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <>
      {(loginLoading || guestLoading) && (
        <div className="cart-modal-loading-overlay">
          <div className="cart-modal-loading-spinner">
            <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
            <span style={{ marginLeft: '1rem' }}>Processing, please wait...</span>
          </div>
        </div>
      )}
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
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
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
            {/* Extras Section */}
            {cartItems.length > 0 && (
              <div className="cart-extras-section">
                <h4>Add a Drink or Extra?</h4>
                {itemsLoading ? (
                  <div>Loading extras...</div>
                ) : itemsError ? (
                  <div className="text-danger">{itemsError}</div>
                ) : (
                  <div className="cart-extras-list">
                    {[...(menuItems.drink || []), ...(menuItems.other || [])].map((item) => (
                      <div key={item.id} className="cart-extra-item">
                        <img
                          src={item.details && item.details[0] ? `${import.meta.env.VITE_API_URL}/${item.details[0].path_img}` : ''}
                          alt={item.name}
                        />
                        <div>{item.name}</div>
                        <div className="cart-extra-price">€{Number(item.price).toFixed(2)}</div>
                        <button
                          className="add-to-basket-btn"
                          onClick={() =>
                            addToCart({
                              ...item,
                              imageUrl: item.details && item.details[0] ? `${import.meta.env.VITE_API_URL}/${item.details[0].path_img}` : '',
                            })
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Price Section */}
            <div className="cart-modal-footer">
              <div className="cart-total">Total: ${cartTotal}</div>
              <div className="date-picker-container" style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>Delivery Date:</label>
                <DatePicker
                  key={isCartOpen}
                  selected={deliveryDate || getMinDate()}
                  onChange={updateOrderDeliveryDate}
                  minDate={getMinDate()}
                  excludeDates={getOffDayDates()}
                  dateFormat="MMMM d, yyyy"
                  className="form-control beautiful-datepicker"
                  placeholderText="Select delivery date (required)"
                  openToDate={getMinDate()}
                  filterDate={(date) => !isOffDay(date)}
                  required
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
            <button className="cart-close-button" onClick={() => { 
              setShowAuthModal(false); setShowGuestForm(false); setCheckoutError(''); }}>&times;</button>
            {checkoutError && (
              <div className="text-danger mb-3" style={{ textAlign: 'center' }}>{checkoutError}</div>
            )}
            {!showGuestForm ? (
              <div className="login-card mx-auto p-4">
                {/* Pass loading props so Login disables button and shows spinner in modal */}
                <Login
                  onAuthSuccess={handleAuthSuccess}
                  loginLoading={loginLoading}
                  onLoginStart={() => setLoginLoading(true)}
                  onLoginEnd={() => setLoginLoading(false)}
                />
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <span style={{ color: '#888' }}>or</span>
                  <br />
                  <button className="guest-link-btn" onClick={handleGuestContinue} disabled={loginLoading}>
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
                    {guestLoading ? (
                      <span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Redirecting to Mollie...</span>
                    ) : 'Continue to Payment'}
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
