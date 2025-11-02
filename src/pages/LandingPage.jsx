import '../App.css'
import Header from '../components/Header.jsx';
import MainContent from '../components/MainContent.jsx';
import SpecialtySection from '../components/SpecialtySection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import ChefSection from '../components/ChefSection.jsx';
import FeaturedMenu from '../components/FeaturedMenu.jsx';
import Footer from '../components/Footer.jsx';

function LandingPage() {
 

  return (
   <div className="App">
      <Header />
      <MainContent />
      <SpecialtySection />
      <ServicesSection />
      <HowItWorks />
      <ChefSection />
      <FeaturedMenu />
      <Footer />
    </div>
  )
}

export default LandingPage;