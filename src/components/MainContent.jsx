import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../assets/css/MainContent.css'; 
import backgroundImage from '../assets/images/background-image.jpg';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';

function MainContent() {
  return (
    // The wrapper holds the background image
    <div className="main-content-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="background-overlay"></div> {/* Dark overlay for readability */}
      
      {/* Content centered in the viewport */}
      <Container className="content-container d-flex flex-column justify-content-center align-items-center text-center text-white">
        <Row>
          <Col md={10} lg={8} className="mx-auto">
            <h1 className="welcome-text mb-3">Welkom bij Nardoen Afhaalservice.</h1>
            
            <h2 className="company-name mb-4">
              <Typewriter
                words={['Nardoen Catering']} 
                loop={true} 
                cursor 
                cursorStyle='|' 
                typeSpeed={100} 
                deleteSpeed={50} 
                delaySpeed={3000} 
              />
            </h2>
            
            <p className="description-text mb-5">
              Ontdek de rijke smaken van de Perzische keuken!<br />
              Vers bereid met authentieke kruiden en traditionele recepten.<br />
              Bestel onze take-out voor een snelle, smaakvolle maaltijd of kies onze cateringservice voor onvergetelijke feesten en evenementen.<br />
              Perzische gastvrijheid, rechtstreeks bij jou aan tafel.

            </p>
            
            <Link to="/contact"><Button variant="warning" size="lg" className="contact-us-button">
              Neem Contact Op
            </Button></Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;