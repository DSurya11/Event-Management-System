import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from './Users/Browse.jsx'
import Home from './Organisers/Home.jsx'
import Regevent from './Users/Regevent.jsx'
import OrgNav from "./Components/OrgNav.jsx";

function App2() {
    return (
        <BrowserRouter>
            <OrgNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="browse" element={<Browse />} />
                <Route path="register" element={<Regevent />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App2 />);
export default App2;