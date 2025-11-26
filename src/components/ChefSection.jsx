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
                            Ik ben Marjaneh, een gepassioneerde Iraanse vrouw die al 18 jaar in Nederland woont. <br /> 
                            Koken is mijn passie en met mijn cateringservice breng ik de authentieke smaken van de Perzische keuken tot leven. <br /> 
                            Met liefde en zorg bereid ik elke maaltijd, zodat u en uw gasten kunnen genieten van een onvergetelijke culinaire ervaring.  

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