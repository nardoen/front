import React, { useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Menu from '../components/Menu.jsx';
import '../assets/css/MenuPage.css';

function MenuPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="menu-page-bg">
      <Header />
      <section className="menu-page-hero">
        <h1 className="menu-page-title">Discover Our Persian Menu</h1>
        <p className="menu-page-subtitle">Authentic flavors, fresh ingredients, and daily chef specials. Pre-order by 12:00 PM for next-day pick-up!</p>
        <div className="menu-page-underline"></div>
      </section>
      <div className="menu-page-content">
        <Menu />
      </div>
      <Footer />
    </div>
  );
}

export default MenuPage;