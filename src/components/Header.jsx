import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../assets/css/Header.css';

function Header() {
  const { toggleCart, cartCount } = useCart();
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <Navbar expand="lg" className="nardoen-navbar" variant="dark" fixed="top">
      {/* ... existing code ... */}
      <Container className="header-container">
        {/* ... existing code ... */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* ... existing code ... */}
        <Navbar.Brand as={Link} to="/" className="nardoen-logo">
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              verticalAlign: 'middle',
            }}
          >
            Nardoen
          </span>
        </Navbar.Brand>

        {/* ... existing code ... */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          {/* ... existing code ... */}
          <Nav className="nardoen-nav-links nav-left">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>

          {/* ... existing code ... */}
          <Nav className="nardoen-nav-links nav-right">
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

            <Nav.Link onClick={toggleCart} className="shopping-cart-icon">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <Badge pill bg="danger" className="cart-badge">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Navbar.Text className="text-white me-3">
                  Hi, {user?.first_name || 'User'}
                </Navbar.Text>
                <Button variant="outline-light" className="ms-lg-3 me-2 nav-button" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="outline-light" className="ms-lg-3 me-2 nav-button">
                Login / Register
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;