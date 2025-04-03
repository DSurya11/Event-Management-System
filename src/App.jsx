import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// User Pages
import Home from './Users/Home.jsx';
import Browse from './Users/Browse.jsx';
import Regevent from './Users/Regevent.jsx';

// Sign-in Pages
import Attendeessignin from './signin/Attendeessignin.jsx';
import Attendeessignup from './signin/Attendeessignup.jsx';
import Organizerssignin from './signin/Organizerssignin.jsx';
import Organizerssignup from './signin/Organizerssignup.jsx';
import Signin from './signin/signin.jsx';

// Organizer Pages
import OrgHome from './Organisers/Home.jsx';
import Host from './Organisers/Host.jsx';

// Navbar Components
import Navbar from './Components/Navbar.jsx';
import OrgNav from './Components/OrgNav.jsx';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      {userRole === 'organizer' ? <OrgNav /> : userRole === 'attendee' ? <Navbar /> : null}

      <Routes>
        <Route path="/" element={!userRole ? <Signin /> : userRole === 'attendee' ? <Home /> : <Navigate to="/organizer/home" />} />

        {userRole === 'attendee' && (
          <>
            <Route path="/browse" element={<Browse />} />
            <Route path="/register/:eventId" element={<Regevent />} />
          </>
        )}

        {userRole === 'organizer' && (
          <>
            <Route path="/organizer/home" element={<OrgHome />} />
            <Route path="/organizer/host" element={<Host />} />
          </>
        )}

        <Route path="/attendee/signin" element={!userRole ? <Attendeessignin setUserRole={setUserRole} /> : <Navigate to="/" />} />
        <Route path="/attendee/signup" element={!userRole ? <Attendeessignup setUserRole={setUserRole} /> : <Navigate to="/" />} />
        <Route path="/organizer/signin" element={!userRole ? <Organizerssignin setUserRole={setUserRole} /> : <Navigate to="/organizer/home" />} />
        <Route path="/organizer/signup" element={!userRole ? <Organizerssignup setUserRole={setUserRole} /> : <Navigate to="/organizer/home" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
