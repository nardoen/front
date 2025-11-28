import React, { useEffect } from 'react';
import AboutUs from '../components/AboutUs';

function AboutUsPage() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <AboutUs />
    </div>
  );
}

export default AboutUsPage;
