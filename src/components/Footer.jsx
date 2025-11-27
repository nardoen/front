import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import authAxios from '../api/authAxios';
import '../assets/css/Footer.css'; 

function Footer() {
    const [footerInfo, setFooterInfo] = useState({
        email: 'info@nardoen.nl',
        order_deadline: '24 uur voor bezorging',
        address: 'Kastanjelaan 275, 3316GZ Dordrecht',
        phone_number: '0639222222',
        pickup_hours: '2-6',
        instagram_url: 'https://www.instagram.com',
        whatsapp_number: '0639252180',
        mapEmbedUrl: '' // Added mapEmbedUrl to the default state
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFooterInfo = async () => {
            try {
                const response = await authAxios.get('/api/footer-info/');
                if (response.data) {
                    setFooterInfo(response.data);
                }
            } catch (error) {
                console.error('Error fetching footer info:', error);
                // Keep default values if API fails
            } finally {
                setLoading(false);
            }
        };

        fetchFooterInfo();
    }, []);

    // Use mapEmbedUrl from the backend, fallback if not provided
    const mapEmbedUrl = footerInfo.mapEmbedUrl;
    
    return (
        <footer className="main-footer">
            <Container>
                <Row>
                    
                    {/* Column 1: Navigation Links */}
                    <Col xs={12} md={4} className="footer-col footer-nav">
                        <h5 className="footer-heading">Nardoen</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/menu">Volledige Menu</Link></li>
                            <li><Link to="/#howitworks">Hoe Het Werkt</Link></li>
                            <li><Link to="/about">Over Ons</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                        <div className="social-icons mt-3">
                            <a href={footerInfo.instagram_url} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <FaInstagram size={22} />
                            </a>
                            <a href={`https://wa.me/31${footerInfo.whatsapp_number.replace(/[^0-9]/g, '').slice(1)}`} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={22} /></a>
                        </div>
                    </Col>
                    
                    {/* Column 2: Contact & Hours */}
                    <Col xs={12} md={4} className="footer-col footer-contact mt-4 mt-md-0">
                        <h5 className="footer-heading">Bestellen & Afhalen</h5>
                        <ul className="footer-contact-info">
                            <li>
                                <FaEnvelope className="contact-icon" />
                                <a href={`mailto:${footerInfo.email}`}>{footerInfo.email}</a>
                            </li>
                            <li>
                                <FaPhone className="contact-icon" />
                                <a href={`tel:${footerInfo.phone_number.replace(/[^0-9]/g, '')}`}>{footerInfo.phone_number}</a>
                            </li>
                            <li className="mt-3 info-section">
                                <h6>Bestel Deadline:</h6>
                                <p>{footerInfo.order_deadline}</p>
                            </li>
                            <li className="info-section">
                                <h6>Afhaaltijden:</h6>
                                <p>{footerInfo.pickup_hours}</p>
                            </li>
                        </ul>
                    </Col>

                    {/* Column 3: Map & Address */}
                    <Col xs={12} md={4} className="footer-col footer-map mt-4 mt-md-0">
                        <h5 className="footer-heading">Ons adres</h5>
                        <p className="address-text">
                            <FaMapMarkerAlt className="contact-icon map-icon me-2" />
                            {footerInfo.address}
                        </p>
                        <div className="map-wrapper">
                            {mapEmbedUrl ? (
                                <iframe 
                                    src={mapEmbedUrl} 
                                    width="100%" 
                                    height="200" 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    title="Nardoen Location Map"
                                ></iframe>
                            ) : (
                                <p>Kaart laden...</p>
                            )}
                        </div>
                    </Col>
                </Row>
                
                <Row className="footer-bottom mt-5 pt-3">
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Nardoen. Alle rechten voorbehouden. | Ontworpen met 💛 voor Perzische Keuken.</p>
                        <p>KVK nummer: 98941909</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;