import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentReturn = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get('id');

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>Thank you for your payment!</h2>
      {paymentId && <p>Your payment ID: <b>{paymentId}</b></p>}
      <p>Your payment has been processed. You will receive a confirmation email shortly.</p>
    </div>
  );
};

export default PaymentReturn;
