import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for navigation
import '../assets/css/FeaturedMenu.css'; 
import menuImage from '../assets/images/zereshk-polo.png'; 

// Static data for the menu items
const featuredDishes = [
    {
        id: 1,
        title: "Ghormeh Sabzi",
        description: "A rich and tangy herb stew with lamb, kidney beans, and dried limes.",
        imageUrl: menuImage,
        link: "#menu/ghormeh"
    },
    {
        id: 2,
        title: "Fesenjān",
        description: "A luxurious stew with chicken, walnuts, and pomegranates. Sweet and sour perfection.",
        imageUrl: menuImage,
        link: "#menu/fesenjan"
    },
    {
        id: 3,
        title: "Tachin",
        description: "Saffron rice cake baked with yogurt, egg, and chicken pieces, yielding a crispy crust.",
        imageUrl: menuImage,
        link: "#menu/tachin"
    },
    {
        id: 4,
        title: "Kūbideh",
        description: "Finely ground lamb and beef seasoned and grilled on a skewer, served with saffron rice.",
        imageUrl: menuImage,
        link: "#menu/koobideh"
    },
    {
        id: 5,
        title: "Baghali Polo",
        description: "Dill and fava bean rice served with tender lamb shank.",
        imageUrl: menuImage,
        link: "#menu/baghali"
    },
    {
        id: 6,
        title: "Zereshk Polo",
        description: "Barberry rice with saffron chicken, a classic Persian favorite.",
        imageUrl: menuImage,
        link: "#menu/zereshk"
    }
];

function FeaturedMenu() {
    const [startIdx, setStartIdx] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const maxVisible = 4;
    const total = featuredDishes.length;

    const handlePrev = () => {
        if (startIdx === 0 || isFading) return;
        setIsFading(true);
        setTimeout(() => {
            setStartIdx(prev => Math.max(prev - maxVisible, 0));
            setIsFading(false);
        }, 350);
    };

    const handleNext = () => {
        if (startIdx + maxVisible >= total || isFading) return;
        setIsFading(true);
        setTimeout(() => {
            setStartIdx(prev => Math.min(prev + maxVisible, total - maxVisible));
            setIsFading(false);
        }, 350);
    };

    const visibleDishes = featuredDishes.slice(startIdx, startIdx + maxVisible);

    // Fade animation class
    const fadeClass = isFading ? 'fade-menu' : '';

    return (
        <section className="featured-menu-section">
            <Container>
                <Row>
                    <Col xs={12} className="text-center mb-5">
                        <h2 className="featured-menu-title">Our Featured Dinner Menu</h2>
                        <div className="title-underline"></div>
                    </Col>
                </Row>

                {/* Menu Carousel Wrapper */}
                <Row className="menu-carousel-wrapper">
                    {/* Left Navigation Button */}
                    <Col xs={1} className="d-flex align-items-center justify-content-center p-0">
                        <button
                            className="carousel-nav-btn left-btn"
                            aria-label="Previous Menu Item"
                            onClick={handlePrev}
                            disabled={startIdx === 0 || isFading}
                            style={{ opacity: startIdx === 0 ? 0.5 : 1 }}
                        >
                            <FaChevronLeft size={24} />
                        </button>
                    </Col>

                    {/* Menu Cards Container (Carousel Items) */}
                    <Col xs={10}>
                        <div className={`menu-cards-container ${fadeClass}`}>
                            {visibleDishes.map(dish => (
                                <Card key={dish.id + dish.title} className="menu-card text-center">
                                    <Card.Img variant="top" src={dish.imageUrl} className="menu-card-img" />
                                    <Card.Body>
                                        <Card.Title className="card-dish-title">{dish.title}</Card.Title>
                                        <Card.Text className="card-dish-text">{dish.description}</Card.Text>
                                        <Button variant="outline-dark" href={dish.link} className="view-dish-button">
                                            View Dish
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Col>

                    {/* Right Navigation Button */}
                    <Col xs={1} className="d-flex align-items-center justify-content-center p-0">
                        <button
                            className="carousel-nav-btn right-btn"
                            aria-label="Next Menu Item"
                            onClick={handleNext}
                            disabled={startIdx + maxVisible >= total || isFading}
                            style={{ opacity: startIdx + maxVisible >= total ? 0.5 : 1 }}
                        >
                            <FaChevronRight size={24} />
                        </button>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className="text-center">
                        <Button variant="primary" size="lg" className="full-menu-cta">
                            See Our Full Menu
                        </Button>
                    </Col>
                </Row>

            </Container>
        </section>
    );
}

export default FeaturedMenu;