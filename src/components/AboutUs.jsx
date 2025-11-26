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
                Welkom bij Nardoen, waar culinaire traditie samenkomt met moderne elegantie. <br />
                Ons verhaal begon met een eenvoudige passie: de rijke, authentieke smaken van de Perzische keuken delen met onze gemeenschap. <br />
                Elk gerecht is een viering van eeuwenoude recepten die van generatie op generatie zijn doorgegeven, bereid met de verste ingrediënten en een vleugje liefde. <br />
                Van het aromatische, met saffraan geurende rijst tot de langzaam gegaarde,
                smaakvolle stoofschotels, ons menu is een eerbetoon aan de levendige en diverse cultuur van Iran. <br />
                Wij geloven dat eten meer is dan voeding alleen; het is een ervaring die mensen samenbrengt.

              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AboutUs;
