import React from 'react';
// import { Container } from 'react-bootstrap'; // No longer needed directly here
import ServiceBlock from './ServiceBlock.jsx';
import '../assets/css/ServicesSection.css';

// Import images (ensure these paths match your file structure)
import simplePersianEvent from '../assets/images/event-nardoen.png'; // The simpler event image
import zereshkPolo from '../assets/images/zereshk-polo.png'; // The Zereshk Polo image

function ServicesSection() {
    // --- Data for the first block (Weddings) ---
    const weddingData = {
        title: "Weddings",
        iconName: "weddings",
        text: "We couldn't be happier that you're considering us to cater your wedding. Our chefs understand the importance of your wedding day and will work closely with you to ensure every detail is considered and every expectation exceeded.",
        buttonText: "Wedding Menus",
        buttonLink: "#menus",
        imageUrl: simplePersianEvent, // Using the new simple Persian event image
        alignRight: true, // Text card on Left, Image to the right
    };

    // --- Data for the second block (Fresh & Inspired) ---
    const socialData = {
        title: "Fresh & Inspired",
        iconName: "social",
        text: "Culinary innovation and impeccable service is the cornerstone of Nardoen's Catering. We are committed to building long-term relationships based on personal service and exceptional quality. Choose from one of our menu options or let us tailor a menu specifically for you.",
        buttonText: "Social Events",
        buttonLink: "#events",
        imageUrl: zereshkPolo, // Using the new Zereshk Polo image
        alignRight: false, // Text card on Right, Image to the left
    };

    return (
        <section className="services-section">
            {/* Removed Container fluid here, as ServiceBlock manages its own width */}
            {/* 1. WEDDINGS BLOCK (Text Left) */}
            <ServiceBlock {...weddingData} />
            
            {/* 2. FRESH & INSPIRED BLOCK (Text Right) */}
            <ServiceBlock {...socialData} />
        </section>
    );
}

export default ServicesSection;