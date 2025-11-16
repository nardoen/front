import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for navigation
import '../assets/css/FeaturedMenu.css'; 
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || '';

// Fetch menu data from API


function FeaturedMenu() {
    const [menuItems, setMenuItems] = useState([]);
    const [startIdx, setStartIdx] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedCards, setExpandedCards] = useState({});
    const maxVisible = 4;


    // Function to get clean text from HTML
    const getCleanText = (description) => {
        if (!description) return '';
        return description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };

    React.useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await axios.get(`${API_URL}/api/items/`);
                setMenuItems(res.data);
            } catch (err) {
                setError('Failed to load menu.');
            } finally {
                setLoading(false);
            }
        }
        fetchMenu();
    }, []);

    const total = menuItems.length;

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

    const visibleDishes = menuItems.slice(startIdx, startIdx + maxVisible);
    const fadeClass = isFading ? 'fade-menu' : '';

    if (loading) return <div>Loading menu...</div>;
    if (error) return <div>{error}</div>;

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
                            {visibleDishes.map((dish, idx) => (
                                <Card key={dish.code + idx} className="menu-card text-center">
                                    <Card.Img
                                        variant="top"
                                        src={dish.details && dish.details[0] ? `${API_URL}/${dish.details[0].path_img}` : ''}
                                        className="menu-card-img"
                                        alt={dish.name}
                                    />
                                    <Card.Body className="menu-card-body">
                                        <Card.Title className="card-dish-title">{dish.name}</Card.Title>
                                        <div className="card-text-container">
                                            <Card.Text className="card-dish-text">
                                                {getCleanText(dish.description)}
                                            </Card.Text>
                                        </div>
                                        <div className="card-price-section">
                                            <strong className="dish-price">€{dish.price}</strong>
                                        </div>
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            className="view-menu-btn"
                                            as={Link}
                                            to="/menu"
                                        >
                                            View Menu
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
                        <Button as={Link} to="/menu" variant="primary" size="lg" className="full-menu-cta">
                            See Our Full Menu
                        </Button>
                    </Col>
                </Row>

            </Container>
        </section>
    );
}

export default FeaturedMenu;