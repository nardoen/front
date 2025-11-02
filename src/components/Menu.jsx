import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuItemCard from './MenuItemCard';
import '../assets/css/Menu.css';
import menuImage from '../assets/images/zereshk-polo.png'; 

const dailyMenu = [
    {
        id: 1,
        title: "Ghormeh Sabzi",
        ingredients: "Fresh herbs (parsley, fenugreek, cilantro), diced lamb, kidney beans, dried limes, turmeric, and saffron.",
        price: 16.99,
        imageUrl: menuImage
    },
    {
        id: 2,
        title: "Fesenjān",
        ingredients: "Chicken breast, ground walnuts, sweet and sour pomegranate molasses, and spices.",
        price: 18.50,
        imageUrl: menuImage
    },
    {
        id: 3,
        title: "Tachin Morgh",
        ingredients: "Saffron rice, yogurt, egg yolk, chicken, and a secret blend of Persian spices, baked to a crispy crust.",
        price: 15.99,
        imageUrl: menuImage
    },
    {
        id: 4,
        title: "Kūbideh Kabob",
        ingredients: "Ground beef and lamb mixed with onions, turmeric, and pepper, served with saffron rice.",
        price: 17.99,
        imageUrl: menuImage
    },
    {
        id: 5,
        title: "Joojeh Kabob",
        ingredients: "Chicken marinated in yogurt, saffron, lemon, and onions, grilled and served with buttery rice.",
        price: 16.99,
        imageUrl: menuImage
    },
    {
        id: 6,
        title: "Ash-e Reshteh (Soup)",
        ingredients: "Thick noodle soup with kashk (whey), various beans, chickpeas, and fresh herbs (mint, parsley, spinach).",
        price: 11.99,
        imageUrl: menuImage
    }
];

function MenuPage() {
    return (
        <section className="menu-page-section">
            <Container>
                <Row className="text-center mb-5">
                    <Col>
                        <h1 className="menu-main-title">Today's Dinner Menu</h1>
                        <p className="menu-subtitle">Pre-order by 12:00 PM for next-day pick-up.</p>
                        <div className="title-underline mx-auto"></div>
                    </Col>
                </Row>

                <Row className="g-4">
                    {dailyMenu.map(dish => (
                        <Col key={dish.id} xs={12} sm={6} lg={4}>
                            <MenuItemCard dish={dish} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default MenuPage;