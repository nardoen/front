import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authAxios from '../api/authAxios';
import '../assets/css/Loginregistration.css';

// Removed duplicate function definition
function Login({ onAuthSuccess, onSwitchToRegister, loginLoading, onLoginStart, onLoginEnd }) {
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
        setSuccess('Login successful.');
        // Call the callback from LoginPage to update global state and redirect
        if (onAuthSuccess) {
          setTimeout(() => onAuthSuccess(res.data.user), 800);
        }
      } else {
        setError(res.data.detail || res.data.error || 'Login failed.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.error || 'Login failed.');
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
      <h2 className="text-center mb-4 form-title">Welcome Back</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={loginForm.email}
            onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={loginForm.password}
            onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
          />
        </Form.Group>
        
        <div className="d-flex justify-content-end mb-3">
          <Button 
            variant="link" 
            className="p-0 forgot-password-link" 
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Button>
        </div>

        <Button variant="primary" type="submit" className="w-100 auth-button" disabled={effectiveLoading}>
          {effectiveLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Logging in...
          </>
          ) : 'Login'}
        </Button>
      </Form>
      {onSwitchToRegister && (
        <div className="mt-4 text-center switch-view-text">
          Don't have an account?
          <Button variant="link" onClick={onSwitchToRegister} className="switch-view-button">
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login;
