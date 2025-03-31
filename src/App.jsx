import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from './Users/Browse.jsx'
import Home from './Users/Home.jsx'
import Regevent from './Users/Regevent.jsx'
import Navbar from "./Components/Navbar.jsx";
import Signin from "./signin/signin.jsx";

import Attendeessignin from "./signin/attendeessignin.jsx";
import Attendeessignup from "./signin/Attendeessignup.jsx";
import Organizerssignin from "./signin/Organizerssignin.jsx";
import Organizerssignup from "./signin/Organizerssignup.jsx";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Organizerssignin/>} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
