import '../App.css'
import MainContent from '../components/MainContent.jsx';
import SpecialtySection from '../components/SpecialtySection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import ChefSection from '../components/ChefSection.jsx';
import FeaturedMenu from '../components/FeaturedMenu.jsx';
import { useEffect } from 'react';

function LandingPage() {
  useEffect(() => {
    if (window.location.hash === '#howitworks') {
      setTimeout(() => {
        const element = document.getElementById('howitworks');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
   <div className="App">
      <MainContent />
      <SpecialtySection />
      <ServicesSection />
      <HowItWorks />
      <ChefSection />
      <FeaturedMenu />
    </div>
  );
}

export default LandingPage;