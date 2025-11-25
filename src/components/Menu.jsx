import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuItemCard from './MenuItemCard';
import '../assets/css/Menu.css';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || '';


const dailyMenu = []; // Placeholder for dynamic menu data



function MenuPage() {
    const [menuItems, setMenuItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await axios.get(`${API_URL}/api/items/`);
                const filteredItems = res.data.reduce((acc, item) => {
                    if (!acc[item.type]) {
                        acc[item.type] = [];
                    }
                    acc[item.type].push(item);
                    return acc;
                }, {});

                // Ensure the order: dish -> side -> drink -> other
                const orderedItems = {};
                ['dish', 'side', 'drink', 'other'].forEach(type => {
                    if (filteredItems[type]) {
                        orderedItems[type] = filteredItems[type];
                    }
                });

                setMenuItems(orderedItems);
            } catch (err) {
                setError('Failed to load menu.');
            } finally {
                setLoading(false);
            }
        }
        fetchMenu();
    }, []);

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

                {loading && <div>Loading menu...</div>}
                {error && <div>{error}</div>}

                {['dish', 'side'].map((type) => (
                    <div key={type} className="menu-category-section">
                        <div className="menu-category-header text-center">
                            <h2 className="menu-category-title">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </h2>
                            <div className="menu-category-underline mx-auto"></div>
                        </div>
                        <Row className="g-4">
                            {menuItems[type]?.map((dish, idx) => (
                                <Col key={dish.code || idx} xs={12} sm={6} lg={4}>
                                    <MenuItemCard
                                        dish={{
                                            id: dish.id, // Ensure unique id is passed
                                            title: dish.name,
                                            ingredients: dish.description,
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