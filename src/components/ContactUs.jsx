import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../assets/css/ContactUs.css';

function ContactUs() {
  return (
    <section className="contact-us-section">
      <Container>
        <div className="text-center mb-5">
          <h5 className="contact-us-subtitle">Get In Touch</h5>
          <h2 className="contact-us-title">Contact Us</h2>
          <div className="contact-us-underline"></div>
        </div>
        <Row>
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="contact-form-wrapper">
              <h3 className="form-title">Send Us a Message</h3>
              <Form>
                <Form.Group className="mb-4" controlId="formGroupName">
                  <Form.Control type="text" placeholder="Your Name" className="contact-form-input" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupEmail">
                  <Form.Control type="email" placeholder="Your Email" className="contact-form-input" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupMessage">
                  <Form.Control as="textarea" rows={5} placeholder="Your Message" className="contact-form-input" />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-button">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
          <Col lg={6}>
            <div className="contact-info-wrapper">
              <h3 className="info-title">Our Contact Details</h3>
              <p className="info-text">
                Have a question or want to pre-order? Feel free to reach out to us. We’re here to help!
              </p>
              <ul className="contact-details-list">
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>123 Saffron Street, Foodie City, 12345</span>
                </li>
                <li>
                  <FaPhoneAlt className="contact-icon" />
                  <span>(123) 456-7890</span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <span>contact@nardoen.com</span>
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
