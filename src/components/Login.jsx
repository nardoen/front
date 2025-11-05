import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../assets/css/Loginregistration.css';

const API_URL = import.meta.env.VITE_API_URL;

function Login({ onAuthSuccess, onSwitchToRegister }) {
  const navigate = useNavigate();
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
      const res = await axios.post(`${API_URL}/api/login/`, loginForm);
      if (res.data.access) {
        setSuccess('Login successful.');
        localStorage.setItem('accessToken', res.data.access);
        if (onAuthSuccess) {
          setTimeout(() => onAuthSuccess(), 800);
        } else {
          setTimeout(() => navigate('/'), 800);
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
        <Form.Group className="mb-4" controlId="loginPassword">
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
