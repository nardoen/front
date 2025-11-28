import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authAxios from '../api/authAxios';
import '../assets/css/Loginregistration.css';

// Removed duplicate function definition
function Login({ onAuthSuccess, onSwitchToRegister, loginLoading, onLoginStart, onLoginEnd, onForgotPassword }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Use parent loading state if provided, otherwise use internal
  const effectiveLoading = typeof loginLoading === 'boolean' ? loginLoading : internalLoading;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (onLoginStart) {
      onLoginStart();
    } else {
      setInternalLoading(true);
    }
    try {
      const res = await authAxios.post(`/api/login/`, loginForm);
      if (res.data.success) {
        setSuccess('Inloggen gelukt.');
        // Call the callback from LoginPage to update global state and redirect
        if (onAuthSuccess) {
          setTimeout(() => onAuthSuccess(res.data.user), 800);
        }
      } else {
        setError(res.data.detail || res.data.error || 'Inloggen mislukt.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.error || 'Inloggen mislukt.');
    } finally {
      if (onLoginEnd) {
        onLoginEnd();
      } else {
        setInternalLoading(false);
      }
    }
  };

  return (
    <div className="login-card mx-auto p-4">
      <h2 className="text-center mb-4 form-title">Welkom terug</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>E-mailadres</Form.Label>
          <Form.Control
            type="email"
            placeholder="Voer e-mailadres in"
            required
            value={loginForm.email}
            onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Wachtwoord</Form.Label>
          <Form.Control
            type="password"
            placeholder="Voer wachtwoord in"
            required
            value={loginForm.password}
            onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
          />
        </Form.Group>
        
        <div className="d-flex justify-content-end mb-3">
          <Button 
            variant="link" 
            className="p-0 forgot-password-link" 
            onClick={onForgotPassword || (() => navigate('/forgot-password'))}
          >
            Wachtwoord vergeten?
          </Button>
        </div>

        <Button variant="primary" type="submit" className="w-100 auth-button" disabled={effectiveLoading}>
          {effectiveLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Bezig met inloggen...
          </>
          ) : 'Inloggen'}
        </Button>
      </Form>
      {onSwitchToRegister && (
        <div className="mt-4 text-center switch-view-text">
          Nog geen account?
          <Button variant="link" onClick={onSwitchToRegister} className="switch-view-button">
            Registreren
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login;
