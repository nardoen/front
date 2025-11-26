import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import authAxios from '../api/authAxios';
import '../assets/css/ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [contactInfo, setContactInfo] = useState({
    address: '',
    FOOTER_INFO_ADDRESS: '',
    email: ''
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await authAxios.get('/api/footer-info/');
        if (response.data) {
          setContactInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Vul alstublieft alle velden in.');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Voer een geldig e-mailadres in.');
      setLoading(false);
      return;
    }

    try {
      const response = await authAxios.post('/api/contact/', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });

      if (response.data.success || response.status === 200 || response.status === 201) {
        setSuccess('Bedankt voor uw bericht! We nemen binnenkort contact met u op.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setError('Bericht verzenden is mislukt. Probeer het opnieuw.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          'Bericht verzenden is mislukt. Probeer het opnieuw.';
      setError(errorMessage);
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="contact-us-section">
      <Container>
        <div className="text-center mb-5">
          <h5 className="contact-us-subtitle">Neem Contact Op</h5>
          <h2 className="contact-us-title">Contacteer Ons</h2>
          <div className="contact-us-underline"></div>
        </div>
        <Row>
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="contact-form-wrapper">
              <h3 className="form-title">Stuur Ons Een Bericht</h3>
              
              {success && <Alert variant="success" className="mb-4">{success}</Alert>}
              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formGroupName">
                  <Form.Control 
                    type="text" 
                    name="name"
                    placeholder="Uw Naam" 
                    className="contact-form-input" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupEmail">
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="Uw E-mail" 
                    className="contact-form-input" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupMessage">
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    name="message"
                    placeholder="Uw Bericht" 
                    className="contact-form-input" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Verzenden...
                    </>
                  ) : (
                    'Bericht Verzenden'
                  )}
                </Button>
              </Form>
            </div>
          </Col>
          <Col lg={6}>
            <div className="contact-info-wrapper">
              <h3 className="info-title">Onze Contactgegevens</h3>
              <p className="info-text">
                Heeft u een vraag of wilt u vooraf bestellen? Neem gerust contact met ons op. We helpen u graag!
              </p>
              <ul className="contact-details-list">
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>{contactInfo.address || 'Adres laden...'}</span>
                </li>
                <li>
                  <FaPhoneAlt className="contact-icon" />
                  <span>{contactInfo.phone_number || 'Telefoonnummer laden...'}</span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <span>{contactInfo.email || 'E-mailadres laden...'}</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactUs;
