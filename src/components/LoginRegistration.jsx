import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import '../assets/css/LoginRegistration.css';

function LoginRegistration() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSwitchView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setSuccess('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder for login logic
    setError('Login functionality is not yet implemented.');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Placeholder for registration logic
    setError('Registration functionality is not yet implemented.');
  };

  return (
    <div className="login-page-bg">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="w-100">
          <Col md={10} lg={8} xl={6} className="mx-auto">
            <Card className="login-card">
              <Card.Body className="p-4 p-md-5">
                <h2 className="text-center mb-4 form-title">
                  {isLoginView ? 'Welcome Back' : 'Create an Account'}
                </h2>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                {isLoginView ? (
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="loginEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 auth-button">
                      Login
                    </Button>
                  </Form>
                ) : (
                  <Form onSubmit={handleRegister}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="regFirstname">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="John" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="regLastname">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Doe" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="regEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Create a password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" placeholder="123 Main St" />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="regZipcode">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control type="text" placeholder="90210" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4" controlId="regPhone">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="tel" placeholder="(123) 456-7890" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="w-100 auth-button">
                      Register
                    </Button>
                  </Form>
                )}

                <div className="mt-4 text-center switch-view-text">
                  {isLoginView ? "Don't have an account?" : 'Already have an account?'}
                  <Button variant="link" onClick={handleSwitchView} className="switch-view-button">
                    {isLoginView ? 'Sign Up' : 'Login'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginRegistration;
