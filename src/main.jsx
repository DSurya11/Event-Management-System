import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import App from './App.jsx'
import Admin from './Admin/Admin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Admin/>
    
  </StrictMode>
)
