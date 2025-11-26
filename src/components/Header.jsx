import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge, Alert } from 'react-bootstrap';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOffDay } from '../context/OffDayContext';
import '../assets/css/Header.css';

function Header() {
  const { toggleCart, cartCount } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const { offDayInfo, showOffDayNotification, handleCloseOffDayNotification, formatDate } = useOffDay();

  return (
    <>
      {/* Off-day notification dropdown */}
      {showOffDayNotification && offDayInfo && (
        <div style={{
          position: 'fixed',
          top: '76px', // Just below the navbar
          left: '0',
          right: '0',
          zIndex: '1040',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '0',
          animation: 'slideDown 0.3s ease-out'
        }}>
          <Alert 
            variant="danger" 
            className="mb-0 d-flex justify-content-between align-items-start"
            style={{ borderRadius: '0', border: 'none' }}
          >
            <div className="flex-grow-1">
              <strong>We zijn tijdelijk gesloten</strong>
              {offDayInfo.offDays.map((offDay, index) => (
                <div key={index} className="mt-2">
                  <div>Vanwege drukte accepteren we helaas geen nieuwe bestellingen van {formatDate(offDay.start_date)} t/m {formatDate(offDay.end_date)}.</div>
                  {index < offDayInfo.offDays.length - 1 && <hr className="my-2" />}
                </div>
              ))}
            </div>
            <Button
              variant="link"
              className="p-0 text-danger"
              onClick={handleCloseOffDayNotification}
              style={{ fontSize: '1.2rem', textDecoration: 'none' }}
            >
              <FaTimes />
            </Button>
          </Alert>
        </div>
      )}
      
      <Navbar expand="lg" className="nardoen-navbar" variant="dark" fixed="top">
      {/* ... existing code ... */}
      <Container className="header-container">
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

        {/* Shopping cart icon - visible only on mobile, positioned right of hamburger menu */}
        <div className="d-flex align-items-center d-lg-none">
          <Nav.Link onClick={toggleCart} className="shopping-cart-icon me-2" style={{ color: 'white', padding: '8px' }}>
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <Badge pill bg="danger" className="cart-badge">
                {cartCount}
              </Badge>
            )}
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>

        {/* Hamburger menu for desktop (when mobile cart is hidden) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-none d-lg-block d-xl-none" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="nardoen-nav-links nav-left">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            <Nav.Link as={Link} to="/about">Over ons</Nav.Link>
          </Nav>

          <Nav className="nardoen-nav-links nav-right">
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            {/* Shopping cart for desktop - hidden on mobile */}
            <Nav.Link onClick={toggleCart} className="shopping-cart-icon d-none d-lg-block">
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
                  Hallo, {user?.first_name || 'Gebruiker'}
                </Navbar.Text>
                <Button variant="outline-light" className="ms-lg-3 me-2 nav-button" onClick={logout}>
                  Uitloggen
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="outline-light" className="ms-lg-3 me-2 nav-button">
                Inloggen / Registreren
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;