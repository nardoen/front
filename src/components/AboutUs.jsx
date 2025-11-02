import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../assets/css/AboutUs.css';
import aboutUsImage from '../assets/images/event-nardoen.png'; // Using an existing image

function AboutUs() {
  return (
    <section className="about-us-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="about-us-image-wrapper">
              <Image src={aboutUsImage} alt="Our Restaurant" fluid className="about-us-image" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="about-us-content">
              <h5 className="about-us-subtitle">Our Story</h5>
              <h2 className="about-us-title">A Tradition of Authentic Persian Cuisine</h2>
              <div className="about-us-underline"></div>
              <p>
                Welcome to Nardoen, where culinary heritage meets modern elegance. Our journey began with a simple passion: to share the rich, authentic flavors of Persian cuisine with our community. Each dish is a celebration of centuries-old recipes passed down through generations, crafted with the freshest ingredients and a touch of love.
              </p>
              <p>
                From the aromatic saffron-infused rice to the slow-cooked, savory stews, our menu is a testament to the vibrant and diverse culture of Iran. We believe that food is more than just sustenance—it's an experience that brings people together.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AboutUs;
