import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../assets/css/Header.css'; 

function Header() {
  return (
    <Navbar expand="lg" className="nardoen-navbar" variant="dark" fixed="top">
      {/* Container limits the width of the navigation */}
      <Container className="header-container">
        
        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Logo (Centered) - Visible on all sizes, but only truly centered on large screens */}
        <Navbar.Brand href="#home" className="nardoen-logo">
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 'bold' }}>
            Nardoen
          </span>
        </Navbar.Brand>

        {/* The main collapse content handles the left and right nav groups */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          
          {/* LEFT Navigation Items (Home, Menu, About Us) */}
          <Nav className="nardoen-nav-links nav-left">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#menu">Menu</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
          </Nav>
          
          {/* RIGHT Navigation Items (Contact, Login, Cart) */}
          <Nav className="nardoen-nav-links nav-right">
            <Nav.Link href="#contact">Contact Us</Nav.Link>
            
            <Nav.Link href="#cart" className="shopping-cart-icon">
              <FaShoppingCart size={20} />
            </Nav.Link>
                        <Button variant="outline-light" className="ms-lg-3 me-2 nav-button">
              Login / Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;