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

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
