import React, { useEffect } from 'react';
import Menu from '../components/Menu.jsx';
import '../assets/css/MenuPage.css';
import halalLogo from '../assets/images/halal-logo.svg';

function MenuPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="menu-page-bg">
      <section className="menu-page-hero">
        <img src={halalLogo} alt="Halal Logo" className="menu-page-halal-logo" />
        <h1 className="menu-page-title">Ontdek ons perzisch menu</h1>
        <p className="menu-page-subtitle">Authentieke smaken, verse ingrediënten en dagelijkse chef-specials.</p>
        <div className="menu-page-underline"></div>
      </section>
      <div className="menu-page-content">
        <Menu />
      </div>
    </div>
  );
}

export default MenuPage;