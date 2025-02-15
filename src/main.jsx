import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Footer from './Components/Footer.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    
    <App />
    <Footer />

  </StrictMode>
)
