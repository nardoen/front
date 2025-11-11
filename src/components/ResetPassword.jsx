import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import authAxios from '../api/authAxios';
import { useAuth } from '../context/AuthContext';
import '../assets/css/Loginregistration.css';

function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await authAxios.post('/api/reset-password/', {
        uid,
        token,
        new_password: formData.newPassword
      });

      if (response.data.success) {
        setSuccess(response.data.success);
        
        // Log the user in automatically
        if (response.data.user) {
          login(response.data.user);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-card mx-auto p-4">
        <h2 className="text-center mb-4 form-title">Password Reset Successful!</h2>
        <Alert variant="success" className="text-center">
          <div className="mb-3">
            <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
          </div>
          {success}
          <div className="mt-3">
            <p>You will be redirected to the homepage in a moment...</p>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="login-card mx-auto p-4">
      <h2 className="text-center mb-4 form-title">Set New Password</h2>
      <p className="text-center text-muted mb-4">
        Please enter your new password below.
      </p>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            minLength="8"
          />
          <Form.Text className="text-muted">
            Password must be at least 8 characters long.
          </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Button 
          variant="primary" 
          type="submit" 
          className="w-100 auth-button" 
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Resetting...
            </>
          ) : 'Reset Password'}
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;