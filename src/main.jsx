import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App2 from './App2';  // Importing App2 (the main component)
import Footer from './Components/Footer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App2 />
    <Footer />
  </React.StrictMode>
);
