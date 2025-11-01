import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import '../assets/css/Footer.css'; 

function Footer() {
    // Dummy Map Embed (Replace with a real Google Maps iframe embed later)
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.774438318728!2d-73.9877145845946!3d40.74189477933099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2591605dd15e7%3A0x6b30f81d89e83696!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus";
    
    return (
        <footer className="main-footer">
            <Container>
                <Row>
                    
                    {/* Column 1: Navigation Links */}
                    <Col xs={12} md={4} className="footer-col footer-nav">
                        <h5 className="footer-heading">Nardoen</h5>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#menu">Full Menu</a></li>
                            <li><a href="#howitworks">How It Works</a></li>
                            <li><a href="#about">About Us (Chef Story)</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                        <div className="social-icons mt-3">
                            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram size={22} /></a>
                            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook size={22} /></a>
                        </div>
                    </Col>
                    
                    {/* Column 2: Contact & Hours */}
                    <Col xs={12} md={4} className="footer-col footer-contact mt-4 mt-md-0">
                        <h5 className="footer-heading">Order & Pick-Up</h5>
                        <ul className="footer-contact-info">
                            <li>
                                <FaEnvelope className="contact-icon" />
                                <a href="mailto:info@nardoen.com">info@nardoen.com</a>
                            </li>
                            <li>
                                <FaPhone className="contact-icon" />
                                <a href="tel:+15551234567">(555) 123-4567</a>
                            </li>
                            <li className="mt-3">
                                <h6>Order Deadline:</h6>
                                <p>Place orders by 12:00 PM (noon) the day before pick-up.</p>
                            </li>
                            <li>
                                <h6>Pick-Up Hours:</h6>
                                <p>Monday - Friday: 4:00 PM - 7:00 PM</p>
                            </li>
                        </ul>
                    </Col>

                    {/* Column 3: Map & Address */}
                    <Col xs={12} md={4} className="footer-col footer-map mt-4 mt-md-0">
                        <h5 className="footer-heading">Find Us</h5>
                        <p className="address-text">
                            <FaMapMarkerAlt className="contact-icon me-2" />
                            123 Persian Way, Suite 400<br/>
                            Food District, CA 90210
                        </p>
                        <div className="map-wrapper">
                            <iframe 
                                src={mapEmbedUrl} 
                                width="100%" 
                                height="200" 
                                allowFullScreen="" 
                                loading="lazy" 
                                title="Nardoen Location Map"
                            ></iframe>
                        </div>
                    </Col>
                </Row>
                
                <Row className="footer-bottom mt-5 pt-3">
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Nardoen. All Rights Reserved. | Designed with 💛 for Persian Cuisine.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;