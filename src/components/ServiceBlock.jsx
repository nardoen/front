import React from 'react';
import { Button } from 'react-bootstrap';
import { FaHeart, FaAppleAlt } from 'react-icons/fa';
import '../assets/css/ServicesSection.css'; 
import { Link } from 'react-router-dom';

function ServiceBlock({ title, text, buttonText, buttonLink, imageUrl, alignRight, iconName }) {
    
    const Icon = iconName === 'weddings' ? FaHeart : FaAppleAlt;

    // Conditionally render image and card order
    return (
        <div className={`service-block-wrapper ${alignRight ? 'align-right' : 'align-left'}`}>
            {alignRight ? (
                <>
                    <div className="service-text-card">
                        <div className="icon-wrapper">
                            <Icon size={30} />
                        </div>
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text">{text}</p>
                        <Link to="/menu"><Button variant="outline-primary" className="service-button">
                            {buttonText}
                        </Button></Link>
                    </div>
                    <div 
                        className="service-image-container" 
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                </>
            ) : (
                <>
                    <div 
                        className="service-image-container" 
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    <div className="service-text-card">
                        <div className="icon-wrapper">
                            <Icon size={30} />
                        </div>
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text">{text}</p>
                        <Link to="/menu"><Button variant="outline-primary" className="service-button">
                            {buttonText}
                        </Button></Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default ServiceBlock;