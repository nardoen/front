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
      setError(err.response?.data?.error || 'Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="login-card mx-auto p-4">
        <h2 className="text-center mb-4 form-title">Controleer Uw E-mail</h2>
        <Alert variant="success" className="text-center">
          <div className="mb-3">
            <i className="fas fa-envelope fa-3x text-success mb-3"></i>
          </div>
          {message}
        </Alert>
        <div className="text-center">
          <p className="mb-3">Geen e-mail ontvangen? Controleer uw spammap of probeer het opnieuw.</p>
          <Button 
            variant="outline-secondary" 
            onClick={() => {
              setSubmitted(false);
              setEmail('');
              setMessage('');
            }}
            className="me-2"
          >
            Probeer Opnieuw
          </Button>
          <Link to="/login">
            <Button variant="primary" className="auth-button">
              Terug naar Inloggen
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-card mx-auto p-4">
      <h2 className="text-center mb-4 form-title">Wachtwoord Resetten</h2>
      <p className="text-center text-muted mb-4">
        Voer uw e-mailadres in en we sturen u een link om uw wachtwoord te resetten.
      </p>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="forgotEmail">
          <Form.Label>E-mailadres</Form.Label>
          <Form.Control
            type="email"
            placeholder="Voer uw e-mailadres in"
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
              Verzenden...
            </>
          ) : 'Reset Link Verzenden'}
        </Button>
      </Form>
      
      <div className="text-center">
        <Link to="/login">
          <Button variant="link" className="switch-view-button">
            Terug naar Inloggen
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;