import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import authAxios from '../api/authAxios';
import '../assets/css/Loginregistration.css';

function Registration({ onAuthSuccess, onSwitchToLogin }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [regForm, setRegForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repeatPassword: '',
    address: '',
    zipcode: '',
    phone: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Simple validation
    if (regForm.password !== regForm.repeatPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { repeatPassword, ...payload } = regForm;
      const res = await authAxios.post(`/api/register/`, payload);
      if (res.data.success) {
        setSuccess(res.data.success);
        // Automatically log the user in
        if (onAuthSuccess) {
          // Assuming the backend logs the user in and returns the user data
          // upon successful registration.
          onAuthSuccess(res.data.user);
        }
      } else {
        setError(res.data.error || 'Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Live validation for each field
  const validateFields = (fields) => {
    const errors = {};
    if (!fields.lastname) {
      errors.lastname = 'Last Name is required.';
    }
    if (!fields.email) {
      errors.email = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fields.email)) {
        errors.email = 'Please enter a valid email address.';
      }
    }
    if (!fields.password) {
      errors.password = 'Password is required.';
    }
    if (fields.password !== fields.repeatPassword) {
      errors.repeatPassword = 'Passwords do not match.';
    }
    return errors;
  };

  // Validate on every change
  const handleFieldChange = (field, value) => {
    setRegForm((prev) => {
      const updated = { ...prev, [field]: value };
      setFieldErrors(validateFields(updated));
      return updated;
    });
    setError('');
  };

  return (
    <div className="login-card mx-auto p-4">
      <h2 className="text-center mb-4 form-title">Create an Account</h2>
      {error && (
        <div style={{ background: '#ffe6e6', color: '#b30000', border: '1px solid #ffb3b3', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', textAlign: 'left', fontWeight: '600', whiteSpace: 'pre-line' }}>
          {error.split('\n').map((err, idx) => (
            <div key={idx}>• {err}</div>
          ))}
        </div>
      )}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleRegister}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="regFirstname">
              <Form.Label>First Name <span style={{ color: '#888', fontWeight: '400', fontSize: '0.95em' }}>(optional)</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                value={regForm.firstname}
                onChange={(e) => handleFieldChange('firstname', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="regLastname">
              <Form.Label>Last Name <span style={{ color: '#ff5722', fontWeight: '400', fontSize: '0.95em' }}>*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                value={regForm.lastname}
                onChange={(e) => handleFieldChange('lastname', e.target.value)}
                isInvalid={!!fieldErrors.lastname}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.lastname}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="regEmail">
          <Form.Label>Email address <span style={{ color: '#ff5722', fontWeight: '400', fontSize: '0.95em' }}>*</span></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={regForm.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            isInvalid={!!fieldErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="regPassword">
          <Form.Label>Password <span style={{ color: '#ff5722', fontWeight: '400', fontSize: '0.95em' }}>*</span></Form.Label>
          <Form.Control
            type="password"
            placeholder="Create a password"
            value={regForm.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            isInvalid={!!fieldErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="regRepeatPassword">
          <Form.Label>Repeat Password <span style={{ color: '#ff5722', fontWeight: '400', fontSize: '0.95em' }}>*</span></Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat your password"
            value={regForm.repeatPassword}
            onChange={(e) => handleFieldChange('repeatPassword', e.target.value)}
            isInvalid={!!fieldErrors.repeatPassword}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.repeatPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="regAddress">
          <Form.Label>Address <span style={{ color: '#888', fontWeight: '400', fontSize: '0.95em' }}>(optional)</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="123 Main St"
            value={regForm.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="regZipcode">
              <Form.Label>Zip Code <span style={{ color: '#888', fontWeight: '400', fontSize: '0.95em' }}>(optional)</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="90210"
                value={regForm.zipcode}
                onChange={(e) => handleFieldChange('zipcode', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="regPhone">
              <Form.Label>Phone <span style={{ color: '#888', fontWeight: '400', fontSize: '0.95em' }}>(optional)</span></Form.Label>
              <Form.Control
                type="tel"
                placeholder="(123) 456-7890"
                value={regForm.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
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
