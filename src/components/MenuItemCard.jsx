import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import '../assets/css/Menu.css';

function MenuItemCard({ dish }) {
    const { addToCart } = useCart();

    // Ensure price is a number for formatting
    const priceNum = Number(dish.price);
    return (
        <Card className="menu-item-card h-100">
            <Card.Img variant="top" src={dish.imageUrl} alt={dish.title} className="menu-item-image" />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="menu-item-title">{dish.title}</Card.Title>
                <div className="menu-item-ingredients" dangerouslySetInnerHTML={{ __html: dish.ingredients }} />
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="menu-item-price">€{!isNaN(priceNum) ? priceNum.toFixed(2) : dish.price}</span>
                        <Button className="add-to-basket-btn" onClick={() => addToCart(dish)}>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default MenuItemCard;