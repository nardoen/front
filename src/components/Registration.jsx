import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../assets/css/Loginregistration.css';

const API_URL = import.meta.env.VITE_API_URL;

function Registration({ onAuthSuccess, onSwitchToLogin }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [regForm, setRegForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    zipcode: '',
    phone: '',
  });

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
        setTimeout(() => {
          setSuccess('');
          if (onSwitchToLogin) {
            onSwitchToLogin();
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
    <div className="login-card mx-auto p-4">
      <h2 className="text-center mb-4 form-title">Create an Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleRegister}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="regFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                required
                value={regForm.firstname}
                onChange={(e) => setRegForm((f) => ({ ...f, firstname: e.target.value }))}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="regLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                required
                value={regForm.lastname}
                onChange={(e) => setRegForm((f) => ({ ...f, lastname: e.target.value }))}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="regEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={regForm.email}
            onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Create a password"
            required
            value={regForm.password}
            onChange={(e) => setRegForm((f) => ({ ...f, password: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="regAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="123 Main St"
            value={regForm.address}
            onChange={(e) => setRegForm((f) => ({ ...f, address: e.target.value }))}
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="regZipcode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="90210"
                value={regForm.zipcode}
                onChange={(e) => setRegForm((f) => ({ ...f, zipcode: e.target.value }))}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="regPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="(123) 456-7890"
                value={regForm.phone}
                onChange={(e) => setRegForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="w-100 auth-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
      {onSwitchToLogin && (
        <div className="mt-4 text-center switch-view-text">
          Already have an account?
          <Button variant="link" onClick={onSwitchToLogin} className="switch-view-button">
            Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default Registration;
