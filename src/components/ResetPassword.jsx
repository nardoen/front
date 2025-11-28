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
  const [fieldErrors, setFieldErrors] = useState({});

  const validateFields = (fields) => {
    const errors = {};
    if (!fields.newPassword) {
      errors.newPassword = 'Nieuw wachtwoord is verplicht.';
    } else if (fields.newPassword.length < 6) {
      errors.newPassword = 'Wachtwoord moet minimaal 6 tekens lang zijn.';
    }
    if (!fields.confirmPassword) {
      errors.confirmPassword = 'Bevestiging wachtwoord is verplicht.';
    } else if (fields.newPassword !== fields.confirmPassword) {
      errors.confirmPassword = 'Wachtwoorden komen niet overeen.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      setFieldErrors(validateFields(updated));
      return updated;
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (Object.keys(fieldErrors).length > 0) {
      setError('Corrigeer de fouten in het formulier.');
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
      setError(err.response?.data?.error || 'Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-card mx-auto p-4">
        <h2 className="text-center mb-4 form-title">Wachtwoord succesvol opnieuw ingesteld!</h2>
        <Alert variant="success" className="text-center">
          <div className="mb-3">
            <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
          </div>
          {success}
          <div className="mt-3">
            <p>U wordt zo meteen doorgestuurd naar de homepage...</p>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="login-card mx-auto p-4">
      <h2 className="text-center mb-4 form-title">Stel een nieuw wachtwoord in</h2>
      <p className="text-center text-muted mb-4">
        Voer hieronder uw nieuwe wachtwoord in.
      </p>
      
      {error && (
        <div style={{ background: '#ffe6e6', color: '#b30000', border: '1px solid #ffb3b3', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', textAlign: 'left', fontWeight: '600', whiteSpace: 'pre-line' }}>
          {error.split('\n').map((err, idx) => (
            <div key={idx}>• {err}</div>
          ))}
        </div>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>Nieuw wachtwoord <span style={{ color: '#ff5722', fontWeight: '400', fontSize: '0.95em' }}>*</span></Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Voer nieuw wachtwoord in"
            value={formData.newPassword}
            onChange={handleChange}
            isInvalid={!!fieldErrors.newPassword}
            minLength="6"
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.newPassword}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Bevestig nieuw wachtwoord <span style={{ color: '#ff5722', fontWeight: '400', fontSize: '0.95em' }}>*</span></Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Bevestig nieuw wachtwoord"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!fieldErrors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.confirmPassword}
          </Form.Control.Feedback>
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
              Bezig met opnieuw instellen...
            </>
          ) : 'Wachtwoord opnieuw instellen'}
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;