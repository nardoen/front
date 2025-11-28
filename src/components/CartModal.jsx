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
  const { isLoggedIn, login } = useAuth();
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
      getOffDayDates(); 
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

  // Helper function to handle payment start requests
  const startPayment = async (data) => {
    const deliveryDateISO = deliveryDate.toISOString();
    const payload = { ...data, deliveryDate: deliveryDateISO };
    try {
      return await authAxios.post('/api/payment/start/', payload);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
    }
  };

  // Validate token with backend before proceeding
  const handleCheckout = async () => {
    setCheckoutError('');
    // Check if delivery date is selected
    if (!deliveryDate) {
      setCheckoutError('Selecteer een bezorgdatum voordat u doorgaat naar de kassa.');
      return;
    }
    if (isLoggedIn) {
      // Logged in: proceed directly to payment
      setLoginLoading(true);
      try {
        const response = await startPayment({
          cart: cartItems,
          total: cartTotal,
        });
        if (response.data && response.data.checkout_url) {
          window.location.href = response.data.checkout_url;
        } else {
          setCheckoutError('Betaling kon niet worden gestart. Probeer het opnieuw.');
        }
      } catch (err) {
        setCheckoutError(err.message);
      } finally {
        setLoginLoading(false);
      }
      return;
    }
    // Not logged in: show auth modal/guest form
    setShowAuthModal(true);
    setShowGuestForm(false);
  }

  const handleAuthSuccess = async (user) => {
    setAuthSuccess(true);
    setShowAuthModal(false);
    setLoginLoading(true);
    try {
      // Update global login state using the `login` function
      login(user); // Notify the app of the login state change
      // Start payment process
      const response = await startPayment({
        cart: cartItems,
        total: cartTotal,
      });
      if (response.data && response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        setCheckoutError('Betaling kon niet worden gestart. Probeer het opnieuw.');
      }
    } catch (err) {
      setCheckoutError(err.message || 'Er is een onverwachte fout opgetreden tijdens de betaling.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAuthSuccessWrapper = async (user) => {
    try {
      await handleAuthSuccess(user); // Call the original handleAuthSuccess
    } catch (error) {
      // Update error state and ensure the modal remains open
      setCheckoutError(error.message || 'Er is een fout opgetreden tijdens het inloggen.');
      setShowAuthModal(true);
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
      setGuestError('Voer uw naam en e-mailadres in.');
      setGuestLoading(false);
      return;
    }
    try {
      await authAxios.post('/api/guest-checkout/', { name, email, is_guest: true });
      // Now start Mollie payment for guest
      try {
        const response = await startPayment({
          name: name,
          email: email,
          cart: cartItems,
          total: cartTotal,
        });
        if (response.data && response.data.checkout_url) {
          // Show loading while redirecting
          setGuestLoading(true);
          window.location.href = response.data.checkout_url;
        } else {
          setGuestError('Gastbetaling kon niet worden gestart. Probeer het opnieuw.');
        }
      } catch (err) {
        setGuestError(err.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.detail || 'Doorgaan als gast is mislukt.';
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
            <span style={{ marginLeft: '1rem' }}>Verwerken, een moment geduld alstublieft...</span>
          </div>
        </div>
      )}
      <div className="cart-modal-overlay" onClick={toggleCart}>
        <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>Uw Winkelwagen</h2>
          <button className="cart-close-button" onClick={toggleCart}>&times;</button>
        </div>
        
        {cartItems.length === 0 ? (
          <p className="cart-empty-message">Uw winkelwagen is leeg.</p>
        ) : (
          <>
            <ul className="cart-items-list">
              {cartItems.map((item, idx) => {
                const priceNum = Number(item.price);
                return (
                  <li key={item.id + '-' + idx} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
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
                <h4>Een drankje of extra toevoegen?</h4>
                {itemsLoading ? (
                  <div>Extra's laden...</div>
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
                          Bestellen
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Price Section */}
            <div className="cart-modal-footer">
              <div className="cart-total">Totaal: €{cartTotal}</div>
              <div
                className="date-picker-container"
                style={{ marginBottom: '1rem', textAlign: 'left' }}
              >
                <label
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    display: 'block',
                  }}
                >
                  Afhaaldatum (om 18:00 uur)
                </label>cx
                <DatePicker
                  key={isCartOpen}
                  selected={deliveryDate || getMinDate()}
                  onChange={updateOrderDeliveryDate}
                  minDate={getMinDate()}
                  excludeDates={getOffDayDates()}
                  dateFormat="MMMM d, yyyy"
                  className="form-control beautiful-datepicker"
                  placeholderText="Selecteer een bezorgdatum (verplicht)"
                  openToDate={getMinDate()}
                  filterDate={(date) => !isOffDay(date)}
                  required
                />
              </div>
              <button className="checkout-button" onClick={handleCheckout}>Ga verder naar Betaling</button>
              {/* Display checkoutError below the button if it exists */}
              {checkoutError && (
                <div
                  className="text-danger mt-2"
                  style={{ textAlign: 'center', fontSize: '0.9rem' }}
                >
                  {checkoutError}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      </div>
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="cart-auth-modal-overlay">
          <div className="cart-auth-modal-content">
            <button
              className="cart-close-button"
              onClick={() => {
                setShowAuthModal(false);
                setShowGuestForm(false);
                setCheckoutError('');
              }}
            >
              &times;
            </button>
            {/* Display checkoutError prominently in a styled box at the top of the modal */}
            {checkoutError && (
              <div
                className="auth-modal-error-box"
                style={{
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  padding: '1rem',
                  borderRadius: '5px',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  border: '1px solid #f5c6cb',
                }}
              >
                {checkoutError}
              </div>
            )}
            {!showGuestForm ? (
              <div className="login-card mx-auto p-4">
                {/* Pass loading props so Login disables button and shows spinner in modal */}
                <Login
                  onAuthSuccess={handleAuthSuccessWrapper}
                  loginLoading={loginLoading}
                  onLoginStart={() => setLoginLoading(true)}
                  onLoginEnd={() => setLoginLoading(false)}
                />
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <span style={{ color: '#888' }}>of</span>
                  <br />
                  <button
                    className="guest-link-btn"
                    onClick={handleGuestContinue}
                    disabled={loginLoading}
                  >
                    Doorgaan als een gast
                  </button>
                </div>
              </div>
            ) : (
              <div className="login-card mx-auto p-4">
                <form onSubmit={handleGuestSubmit} className="guest-form">
                  <h4 className="form-title text-center mb-4">Doorgaan als Gast</h4>
                  <div className="mb-3">
                    <label className="form-label">Naam</label>
                    <input type="text" ref={guestNameRef} className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input type="email" ref={guestEmailRef} className="form-control" required />
                  </div>
                  <input type="hidden" name="is_guest" value="true" />
                  {guestError && (
                    <div
                      className="text-danger mb-3"
                      style={{ textAlign: 'center' }}
                    >
                      {guestError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 auth-button"
                    disabled={guestLoading}
                  >
                    {guestLoading ? (
                      <span>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{' '}
                        Doorverwijzen naar Mollie...
                      </span>
                    ) : (
                      'Doorgaan naar Betaling'
                    )}
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
