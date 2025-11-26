import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/SpecialtySection.css'; // Create this CSS file

function SpecialtySection() {
  return (
    <div className="specialty-section-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} className="text-center">
            {/* The main heading text */}
            <h2 className="specialty-heading">
              Wij Zijn Gespecialiseerd in Intiem <br />
              Catering
            </h2>
            {/* The small divider/graphic */}
            <div className="specialty-divider"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SpecialtySection;