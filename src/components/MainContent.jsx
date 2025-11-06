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
            <h1 className="welcome-text mb-3">Welcome to</h1>
            
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
              From hand-picking our own produce directly from Eastern Market, to making our own salad
              dressing, Nardoen does everything the old world way. At Nardoen, we guarantee you will love our
              excellent food, total service, and compact, we promise.
            </p>
            
            <Link to="/contact"><Button variant="warning" size="lg" className="contact-us-button">
              Contact Us
            </Button></Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;