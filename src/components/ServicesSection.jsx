import React from 'react';
// import { Container } from 'react-bootstrap'; // No longer needed directly here
import ServiceBlock from './ServiceBlock.jsx';
import '../assets/css/ServicesSection.css';

// Import images (ensure these paths match your file structure)
import simplePersianEvent from '../assets/images/event-nardoen.avif'; // The simpler event image
import zereshkPolo from '../assets/images/zereshk-polo.avif'; // The Zereshk Polo image

function ServicesSection() {
    // --- Data for the first block (Weddings) ---
    const weddingData = {
        title: "bruiloften",
        iconName: "weddings",
        text: "Voor uw bruiloft kunt u volledig op ons rekenen. Wij verzorgen een verfijnde Perzische catering die perfect past bij deze bijzondere dag. Met authentieke smaken, vers bereide gerechten en een presentatie die stijl en gastvrijheid uitstraalt, maken wij uw huwelijksfeest extra onvergetelijk. Laat ons de culinaire beleving creëren, zodat u zorgeloos kunt genieten van elke magische moment.",
        buttonText: "Bruilofts Menu's",
        buttonLink: "#menus",
        imageUrl: simplePersianEvent, // Using the new simple Persian event image
        alignRight: true, // Text card on Left, Image to the right
    };

    // --- Data for the second block (Fresh & Inspired) ---
    const socialData = {
        title: "Eventementen",
        iconName: "social",
        text: "Ook voor al uw evenementen kunt u bij ons terecht. Of het nu gaat om een verjaardag, bruiloft, bedrijfsfeest of een intiem samenzijn, wij verzorgen met plezier een Perzische catering die volledig aansluit bij uw wensen.\n\nOnze gerechten worden vers bereid met authentieke kruiden en traditionele recepten, zodat u en uw gasten kunnen genieten van onvergetelijke smaken. Laat ons de culinaire zorg uit handen nemen, zodat u onbezorgd kunt genieten van uw evenement.",
        buttonText: "Evenementen",
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