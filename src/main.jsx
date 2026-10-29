import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './navigation.css';
import './hero.css';
import './home.css';
import './map.css';
import './faq.css';
import './contact.css';
import './readability.css';

const cloudflareAnalyticsToken = import.meta.env.VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

if (cloudflareAnalyticsToken) {
  const script = document.createElement('script');
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.dataset.cfBeacon = JSON.stringify({ token: cloudflareAnalyticsToken });
  script.defer = true;
  document.head.appendChild(script);
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
