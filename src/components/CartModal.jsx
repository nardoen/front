import React from 'react';
import DatePicker from 'react-datepicker';
import { useCart } from '../context/CartContext';
import '../assets/css/CartModal.css';
import '../assets/css/DatePicker.css'; 
import { FaTrashAlt } from 'react-icons/fa';

const CartModal = () => {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, deliveryDate, updateOrderDeliveryDate, getMinDate } = useCart();

  if (!isCartOpen) {
    return null;
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
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
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <p>${item.price.toFixed(2)}</p>
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
              ))}
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
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
