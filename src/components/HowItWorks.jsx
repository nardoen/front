import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaStore } from 'react-icons/fa'; // Icons for the three steps
import '../assets/css/HowItWorks.css'; 

function HowItWorks() {
    return (
        <section className="how-it-works-section">
            <Container>
                <Row>
                    <Col xs={12} className="text-center mb-5">
                        <h2 className="how-it-works-title">How Our Pre-Order Works</h2>
                        <div className="title-underline"></div>
                    </Col>
                </Row>
                
                <Row className="g-5">
                    {/* Step 1: Choose Dish */}
                    <Col xs={12} md={4} className="text-center how-it-works-step">
                        <div className="step-icon-wrapper">
                            <FaCalendarAlt size={45} className="step-icon" />
                        </div>
                        <h4 className="step-title">1. Choose & Schedule</h4>
                        <p className="step-description">
                            Browse our daily dinner menu and select your dish. Choose your preferred pick-up date for a day in advance.
                        </p>
                    </Col>

                    {/* Step 2: Order Deadline */}
                    <Col xs={12} md={4} className="text-center how-it-works-step">
                        <div className="step-icon-wrapper">
                            <FaClock size={45} className="step-icon" />
                        </div>
                        <h4 className="step-title">2. Order By Noon</h4>
                        <p className="step-description">
                            Place your order and complete payment before **12:00 PM** (noon) the day before your selected pick-up date.
                        </p>
                    </Col>

                    {/* Step 3: Pick Up */}
                    <Col xs={12} md={4} className="text-center how-it-works-step">
                        <div className="step-icon-wrapper">
                            <FaStore size={45} className="step-icon" />
                        </div>
                        <h4 className="step-title">3. Enjoy Your Pick-Up</h4>
                        <p className="step-description">
                            Your fresh, delicious meal will be ready for you to collect at our designated address on your chosen day.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HowItWorks;