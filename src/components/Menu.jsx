import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuItemCard from './MenuItemCard';
import '../assets/css/Menu.css';
import { useItems } from '../context/ItemContext';

const API_URL = import.meta.env.VITE_API_URL || '';

function MenuPage() {
    const { menuItems, loading, error } = useItems();

    return (
        <section className="menu-page-section">
            <Container>
                <Row className="text-center mb-5">
                    <Col>
                        <h1 className="menu-main-title">Dinerkaart van vandaag</h1>
                        <p className="menu-subtitle">Bestel vóór 12:00 uur voor afhalen de volgende dag.</p>
                        <div className="title-underline mx-auto"></div>
                    </Col>
                </Row>

                {loading && <div>Menu laden...</div>}
                {error && <div>{error}</div>}

                {['dish', 'side'].map((type) => (
                    <div key={type} className="menu-category-section">
                        <div className="menu-category-header text-center">
                            <h2 className="menu-category-title">
                                {type === 'dish' ? 'Hoofdgerechten' : 'Bijgerechten'}
                            </h2>
                            <div className="menu-category-underline mx-auto"></div>
                        </div>
                        <Row className="g-4">
                            {menuItems[type]?.map((dish, idx) => (
                                <Col key={dish.code || idx} xs={12} sm={6} lg={4}>
                                    <MenuItemCard
                                        dish={{
                                            id: dish.id, // Ensure unique id is passed
                                            name: dish.name,
                                            description: dish.description,
                                            price: dish.price,
                                            imageUrl: dish.details && dish.details[0] ? `${API_URL}/${dish.details[0].path_img}` : ''
                                        }}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Container>
        </section>
    );
}

export default MenuPage;