import React, { useEffect } from 'react';
import ContactUs from '../components/ContactUs';

function ContactUsPage() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  return (
    <div>
      <ContactUs />
    </div>
  );
}

export default ContactUsPage;
