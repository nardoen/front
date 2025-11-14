import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaReceipt, FaHome, FaPhone } from 'react-icons/fa';
import '../assets/css/PaymentReturn.css';

function PaymentReturn() {
  const location = useLocation();
  const [status, setStatus] = useState('loading'); // loading, success, failed
  const [paymentDetails, setPaymentDetails] = useState({});
  
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
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
      setStatus(paymentStatus === 'failed' ? 'failed' : 'success');
    }, 1500);
  }, [location]);

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
                  <h2 className="payment-title mb-3">Processing Payment...</h2>
                  <p className="payment-text">Please wait while we verify your payment.</p>
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
                  <h2 className="payment-title success mb-3">Payment Successful! 🎉</h2>
                  <Alert variant="success" className="payment-alert">
                    <h5 className="mb-2">Thank you for your order!</h5>
                    <p className="mb-0">Your payment has been processed successfully.</p>
                  </Alert>
                  
                  <div className="payment-details">
                    <Row className="mb-3">
                      <Col xs={6} className="detail-label">Order Number:</Col>
                      <Col xs={6} className="detail-value">
                        <strong>{paymentDetails.orderNumber}</strong>
                      </Col>
                    </Row>
                    {paymentDetails.id && (
                      <Row className="mb-3">
                        <Col xs={6} className="detail-label">Payment ID:</Col>
                        <Col xs={6} className="detail-value">
                          <code>{paymentDetails.id}</code>
                        </Col>
                      </Row>
                    )}
                    <Row className="mb-4">
                      <Col xs={6} className="detail-label">Date:</Col>
                      <Col xs={6} className="detail-value">{paymentDetails.date}</Col>
                    </Row>
                  </div>

                  <div className="confirmation-info mb-4">
                    <div className="info-box">
                      <FaReceipt className="me-2" />
                      <span>A confirmation email has been sent to your email address.</span>
                    </div>
                    <div className="info-box">
                      <FaPhone className="me-2" />
                      <span>We'll contact you about pickup details soon.</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <Link to="/">
                      <Button className="payment-btn primary me-3">
                        <FaHome className="me-2" />
                        Back to Home
                      </Button>
                    </Link>
                    <Link to="/menu">
                      <Button variant="outline-primary" className="payment-btn secondary">
                        Order Again
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
                <h2 className="payment-title failed mb-3">Payment Failed</h2>
                <Alert variant="danger" className="payment-alert">
                  <h5 className="mb-2">Oops! Something went wrong</h5>
                  <p className="mb-0">Your payment could not be processed. Please try again.</p>
                </Alert>

                {paymentDetails.id && (
                  <div className="payment-details mb-4">
                    <Row>
                      <Col xs={6} className="detail-label">Reference ID:</Col>
                      <Col xs={6} className="detail-value">
                        <code>{paymentDetails.id}</code>
                      </Col>
                    </Row>
                  </div>
                )}

                <div className="action-buttons">
                  <Link to="/menu">
                    <Button className="payment-btn primary me-3">
                      Try Again
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline-secondary" className="payment-btn secondary">
                      Contact Support
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