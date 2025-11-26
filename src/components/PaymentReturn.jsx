import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaHome } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import authAxios from '../api/authAxios';
import '../assets/css/PaymentReturn.css';

function PaymentReturn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading'); // loading, success, failed
  const [paymentDetails, setPaymentDetails] = useState({});
  
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await authAxios.get('/api/payment/return/');
        const data = response.data;

        setPaymentDetails({
          id: data.payment_id,
          status: data.status,
          amount: data.amount,
          message: data.message,
          date: new Date().toLocaleString('nl-NL')
        });

        setStatus(data.status); // Directly use the status from the backend
      } catch (error) {
        setStatus('error');
        setPaymentDetails({
          message: 'Fout bij het ophalen van de betalingsstatus.'
        });
      }
    };

    fetchPaymentStatus();
  }, []);

  // Effect to clear cart on successful payment
  useEffect(() => {
    if (status === 'paid') {
      clearCart();
    }
  }, [status, clearCart]);

  if (status === 'loading') {
    return (
      <section className="payment-return-section">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Card className="payment-card text-center">
                <Card.Body className="py-5">
                  <div className="payment-icon mb-4">
                    <FaSpinner className="fa-spin" size={60} />
                  </div>
                  <h2 className="payment-title mb-3">Betaling verwerken...</h2>
                  <p className="payment-text">Even geduld terwijl we uw betaling verifiëren.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="payment-return-section">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="payment-card">
              <Card.Body className="text-center py-5">
                <div
                  className={`payment-icon mb-4 ${status === 'paid' ? 'success' : 'failed'}`}
                >
                  {status === 'paid' ? (
                    <FaCheckCircle size={80} color="green" />
                  ) : (
                    <FaTimesCircle size={80} color="red" />
                  )}
                </div>
                <h2
                  className={`payment-title mb-3 ${status === 'paid' ? 'success' : 'failed'}`}
                >
                  {status === 'paid' ? 'Betaling geslaagd! 🎉' : 'Betaling mislukt'}
                </h2>
                <Alert
                  variant={status === 'paid' ? 'success' : 'danger'}
                  className="payment-alert"
                >
                  <h5 className="mb-2">{paymentDetails.message}</h5>
                  <p className="mb-0">{paymentDetails.amount}</p>
                </Alert>

                <div className="payment-details">
                  {paymentDetails.id && (
                    <Row className="mb-3">
                      <Col xs={6} className="detail-label">Betalings-ID:</Col>
                      <Col xs={6} className="detail-value">
                        <code>{paymentDetails.id}</code>
                      </Col>
                    </Row>
                  )}
                  <Row className="mb-4">
                    <Col xs={6} className="detail-label">Datum:</Col>
                    <Col xs={6} className="detail-value">{paymentDetails.date}</Col>
                  </Row>
                </div>

                <div className="action-buttons">
                  <Button
                    className="payment-btn primary me-3"
                    onClick={() => navigate('/')}
                  >
                    <FaHome className="me-2" />
                    Ga naar homepage
                  </Button>
                  <Link to="/menu">
                    <Button variant="outline-primary" className="payment-btn secondary">
                      Opnieuw bestellen
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PaymentReturn;