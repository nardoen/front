import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import authAxios from '../api/authAxios';
import '../assets/css/Loginregistration.css';

function Login({ onAuthSuccess, onSwitchToRegister }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
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
      setLoading(false);
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
        <Button variant="primary" type="submit" className="w-100 auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
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
