import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Footer from './Components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Footer />
  </StrictMode>
)
