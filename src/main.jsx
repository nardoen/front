import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    // Playfair Display for headers/logo (elegant) and Open Sans for body/nav (clean)
    families: ['Playfair Display:400,700', 'Open Sans:400,600', 'serif']
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
