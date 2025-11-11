import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authAxios from '../api/authAxios';
import '../assets/css/Loginregistration.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await authAxios.post('/api/forgot-password/', {
        email: email.trim()
      });

      if (response.data.success) {
        setMessage(response.data.success);
        setSubmitted(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="login-card mx-auto p-4">
        <h2 className="text-center mb-4 form-title">Check Your Email</h2>
        <Alert variant="success" className="text-center">
          <div className="mb-3">
            <i className="fas fa-envelope fa-3x text-success mb-3"></i>
          </div>
          {message}
        </Alert>
        <div className="text-center">
          <p className="mb-3">Didn't receive an email? Check your spam folder or try again.</p>
          <Button 
            variant="outline-secondary" 
            onClick={() => {
              setSubmitted(false);
              setEmail('');
              setMessage('');
            }}
            className="me-2"
          >
            Try Again
          </Button>
          <Link to="/login">
            <Button variant="primary" className="auth-button">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-card mx-auto p-4">
      <h2 className="text-center mb-4 form-title">Reset Password</h2>
      <p className="text-center text-muted mb-4">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="forgotEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        
        <Button 
          variant="primary" 
          type="submit" 
          className="w-100 auth-button mb-3" 
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Sending...
            </>
          ) : 'Send Reset Link'}
        </Button>
      </Form>
      
      <div className="text-center">
        <Link to="/login">
          <Button variant="link" className="switch-view-button">
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;