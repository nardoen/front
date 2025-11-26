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
          <h5>Wij gebruiken cookies en verzamelen gegevens</h5>
          <p>
            Wij gebruiken cookies en vergelijkbare technologieën om uw ervaring te verbeteren, het websiteverkeer te analyseren 
            en inhoud te personaliseren. Door op "Accepteren" te klikken, stemt u in met ons gebruik van cookies en gegevensverzameling.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <Button 
            variant="success" 
            size="sm" 
            onClick={() => handleConsent(true)}
            className="me-2"
          >
            Accepteren
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => handleConsent(false)}
            className="me-2"
          >
            Weigeren
          </Button>
          <Button 
            variant="link" 
            size="sm" 
            onClick={() => handleConsent(false)}
            className="p-1 text-muted"
            title="Sluiten"
          >
            <FaTimes />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;