import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaReceipt, FaHome, FaPhone } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../assets/css/PaymentReturn.css';

function PaymentReturn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading'); // loading, success, failed
  const [paymentDetails, setPaymentDetails] = useState({});
  const [countdown, setCountdown] = useState(5);
  const didClearCart = useRef(false); // Use ref to track if cart was cleared
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('id');
    const paymentStatus = params.get('status') || 'success'; // Default to success if not provided
    
    // Simulate payment verification (replace with actual API call)
    setTimeout(() => {
      setPaymentDetails({
        id: paymentId,
        status: paymentStatus,
        amount: params.get('amount'),
        orderNumber: params.get('order') || `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString('nl-NL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
      setStatus(paymentStatus === 'failed' ? 'failed' : 'success');
    }, 1500);
  }, [location.search]);

  // Effect to clear cart on successful payment
  useEffect(() => {
    if (status === 'success' && !didClearCart.current) {
      clearCart();
      didClearCart.current = true; // Mark that the cart has been cleared
    }
  }, [status, clearCart]);

  // Effect for countdown on successful payment
  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      // Cleanup function to clear the interval if the component unmounts
      return () => clearInterval(timer);
    }
  }, [status]);

  // Separate effect to handle navigation when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

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

  if (status === 'success') {
    return (
      <section className="payment-return-section">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Card className="payment-card">
                <Card.Body className="text-center py-5">
                  <div className="payment-icon success mb-4">
                    <FaCheckCircle size={80} />
                  </div>
                  <h2 className="payment-title success mb-3">Betaling geslaagd! 🎉</h2>
                  <Alert variant="success" className="payment-alert">
                    <h5 className="mb-2">Bedankt voor uw bestelling!</h5>
                    <p className="mb-0">Uw betaling is succesvol verwerkt.</p>
                  </Alert>
                  
                  <div className="payment-details">
                    <Row className="mb-3">
                      <Col xs={6} className="detail-label">Bestelnummer:</Col>
                      <Col xs={6} className="detail-value">
                        <strong>{paymentDetails.orderNumber}</strong>
                      </Col>
                    </Row>
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

                  <div className="confirmation-info mb-4">
                    <div className="info-box">
                      <FaReceipt className="me-2" />
                      <span>Een bevestigingsmail is naar uw e-mailadres verzonden.</span>
                    </div>
                    <div className="info-box">
                      <FaPhone className="me-2" />
                      <span>We nemen binnenkort contact met u op over de afhaaldetails.</span>
                    </div>
                  </div>

                  <div className="countdown-info mb-4">
                    <Alert variant="info" className="text-center">
                      <FaHome className="me-2" />
                      U wordt binnen <strong>{countdown}</strong> seconden doorgestuurd naar de homepage...
                    </Alert>
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

  // Failed payment
  return (
    <section className="payment-return-section">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="payment-card">
              <Card.Body className="text-center py-5">
                <div className="payment-icon failed mb-4">
                  <FaTimesCircle size={80} />
                </div>
                <h2 className="payment-title failed mb-3">Betaling mislukt</h2>
                <Alert variant="danger" className="payment-alert">
                  <h5 className="mb-2">Oeps! Er is iets misgegaan</h5>
                  <p className="mb-0">Uw betaling kon niet worden verwerkt. Probeer het opnieuw.</p>
                </Alert>

                {paymentDetails.id && (
                  <div className="payment-details mb-4">
                    <Row>
                      <Col xs={6} className="detail-label">Referentie-ID:</Col>
                      <Col xs={6} className="detail-value">
                        <code>{paymentDetails.id}</code>
                      </Col>
                    </Row>
                  </div>
                )}

                <div className="action-buttons">
                  <Link to="/menu">
                    <Button className="payment-btn primary me-3">
                      Probeer opnieuw
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline-secondary" className="payment-btn secondary">
                      Neem contact op met support
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