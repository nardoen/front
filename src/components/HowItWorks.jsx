import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaStore } from 'react-icons/fa'; // Icons for the three steps
import '../assets/css/HowItWorks.css'; 

function HowItWorks() {
    return (
        <section id="howitworks" className="how-it-works-section">
            <Container>
                <Row>
                    <Col xs={12} className="text-center mb-5">
                        <h2 className="how-it-works-title">Zo kunt u bij ons bestellen</h2>
                        <div className="title-underline"></div>
                    </Col>
                </Row>
                
                <Row className="g-2 g-md-5">
                    {/* Stap 1: Kies Gerecht */}
                    <Col xs={12} md={4} className="text-center how-it-works-step">
                        <div className="step-icon-wrapper">
                            <FaCalendarAlt size={45} className="step-icon" />
                        </div>
                        <h4 className="step-title">1. Kiezen</h4>
                        <p className="step-description">
                            Bekijk ons dagelijkse dinermenu en kies uw gerecht. Selecteer uw gewenste afhaaldatum.
                        </p>
                    </Col>

                    {/* Stap 2: Bestel Deadline */}
                    <Col xs={12} md={4} className="text-center how-it-works-step">
                        <div className="step-icon-wrapper">
                            <FaClock size={45} className="step-icon" />
                        </div>
                        <h4 className="step-title">2. Bestellen</h4>
                        <p className="step-description">
                            Let op! <br />
                            Ma-do besteld vóór 24:00 uur: afhalen 18:00 uur de dag erna. <br />
                            Vr-zo besteld vóór 12:00 uur: afhalen 18:00 uur op dezelfde dag

                        </p>
                    </Col>

                    {/* Stap 3: Afhalen */}
                    <Col xs={12} md={4} className="text-center how-it-works-step">
                        <div className="step-icon-wrapper">
                            <FaStore size={45} className="step-icon" />
                        </div>
                        <h4 className="step-title">3. Afhalen</h4>
                        <p className="step-description">
                            Uw verse, heerlijke maaltijd staat op de door u gekozen dag voor u klaar om af te halen.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HowItWorks;