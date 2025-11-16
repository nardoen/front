import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { FaCookie, FaTimes } from 'react-icons/fa';
import '../assets/css/CookieConsent.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice in this session
    const consentChoice = sessionStorage.getItem('cookieConsent');
    if (!consentChoice) {
      // Show consent banner after a small delay for better UX
      setTimeout(() => {
        setShowConsent(true);
        setTimeout(() => setIsVisible(true), 100); // Smooth fade-in animation
      }, 1000);
    }
  }, []);

  const handleConsent = (accepted) => {
    // Store the user's choice in sessionStorage (only for current session)
    sessionStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
    sessionStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Hide the banner with animation
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className={`cookie-consent-banner ${isVisible ? 'visible' : ''}`}>
      <div className="cookie-consent-content">
        <div className="cookie-consent-icon">
          <FaCookie size={24} />
        </div>
        <div className="cookie-consent-text">
          <h5>We use cookies and collect data</h5>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze website traffic, 
            and personalize content. By clicking "Accept", you consent to our use of cookies and data collection 
            as described in our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <Button 
            variant="success" 
            size="sm" 
            onClick={() => handleConsent(true)}
            className="me-2"
          >
            Accept
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => handleConsent(false)}
            className="me-2"
          >
            Decline
          </Button>
          <Button 
            variant="link" 
            size="sm" 
            onClick={() => handleConsent(false)}
            className="p-1 text-muted"
            title="Close"
          >
            <FaTimes />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;