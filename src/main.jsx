import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Importing App (the main component)
import Footer from './Components/Footer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <Footer />
  </React.StrictMode>
);
