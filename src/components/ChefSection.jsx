import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import chefImage from '../assets/images/chef.jpg'; // 🛑 Make sure you have a chef.jpg image in src/assets/images
import '../assets/css/ChefSection.css'; 
import { Link } from 'react-router-dom';

function ChefSection() {
    return (
        <section className="chef-section">
            <Container>
                <Row className="align-items-center flex-md-row-reverse">
                    {/* Chef Image Column */}
                    <Col xs={12} md={6} className="chef-image-col d-flex flex-column align-items-center justify-content-center">
                        <div className="chef-image-wrapper position-relative">
                            <img 
                                src={chefImage} 
                                alt="Chef's Portrait" 
                                className="img-fluid rounded-circle shadow-lg"
                            />
                            {/* Decorative accent */}
                            <div className="chef-accent-circle"></div>
                        </div>
                    </Col>

                    {/* Chef Introduction Text Column */}
                    <Col xs={12} md={6} className="chef-text-col text-center text-md-start d-flex flex-column justify-content-center">
                        <h2 className="chef-section-title mb-2">Meet Our Chef</h2>
                        <div className="title-underline mb-3"></div>
                        <p className="chef-intro-text mt-4">
                            <span className="chef-quote">“</span>
                            Welcome to Nardoen! I'm <b>Marjan</b>, and it's my passion to bring you the authentic and comforting flavors of Persian cuisine. Every dish is crafted with love, using traditional recipes and the freshest ingredients, just like my grandmother taught me. I believe food is a celebration, and I'm thrilled to share a piece of my heritage with you through our kitchen.
                            <span className="chef-quote">”</span>
                        </p>
                        <Link to="/about"><Button className="chef-story-button">
                            <span className="chef-story-btn-text">Read My Story</span>
                            <span className="chef-story-btn-arrow">→</span>
                        </Button></Link>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default ChefSection;