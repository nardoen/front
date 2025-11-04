import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import '../assets/css/LoginRegistration.css';

function LoginRegistration({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Registration form state
  const [regForm, setRegForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    zipcode: '',
    phone: '',
  });

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleSwitchView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // JWT login endpoint (only returns access token)
  const res = await axios.post(`${API_URL}/api/login/`, loginForm);
      if (res.data.access) {
        setSuccess('Login successful.');
        // Store JWT access token in localStorage
        localStorage.setItem('accessToken', res.data.access);
        // If used as modal, call onAuthSuccess
        if (onAuthSuccess) {
          setTimeout(() => {
            onAuthSuccess();
          }, 800);
        } else {
          // Redirect to landing page after login
          setTimeout(() => {
            navigate('/');
          }, 800);
        }
      } else {
        setError(res.data.detail || res.data.error || 'Login failed.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
  const res = await axios.post(`${API_URL}/api/register/`, regForm);
      if (res.data.success) {
        setSuccess(res.data.success);
        setRegForm({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          address: '',
          zipcode: '',
          phone: '',
        });
        // Switch to login view after successful registration
        setTimeout(() => {
          setIsLoginView(true);
          setSuccess('');
          // If used as modal, auto-login after registration
          if (onAuthSuccess) {
            onAuthSuccess();
          }
        }, 1200);
      } else {
        setError(res.data.error || 'Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
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
                      <Form.Control type="email" placeholder="Enter email" required value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" required value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 auth-button" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </Form>
                ) : (
                  <Form onSubmit={handleRegister}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="regFirstname">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="John" required value={regForm.firstname} onChange={e => setRegForm(f => ({ ...f, firstname: e.target.value }))} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="regLastname">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Doe" required value={regForm.lastname} onChange={e => setRegForm(f => ({ ...f, lastname: e.target.value }))} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="regEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" required value={regForm.email} onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Create a password" required value={regForm.password} onChange={e => setRegForm(f => ({ ...f, password: e.target.value }))} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" placeholder="123 Main St" value={regForm.address} onChange={e => setRegForm(f => ({ ...f, address: e.target.value }))} />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="regZipcode">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control type="text" placeholder="90210" value={regForm.zipcode} onChange={e => setRegForm(f => ({ ...f, zipcode: e.target.value }))} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4" controlId="regPhone">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="tel" placeholder="(123) 456-7890" value={regForm.phone} onChange={e => setRegForm(f => ({ ...f, phone: e.target.value }))} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="w-100 auth-button" disabled={loading}>
                      {loading ? 'Registering...' : 'Register'}
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
