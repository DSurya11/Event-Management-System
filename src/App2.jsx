import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Organisers/Home.jsx'
import Regevent from './Users/Regevent.jsx'
import OrgNav from "./Components/OrgNav.jsx";
import Host from "./Organisers/Host.jsx";

function App2() {
    return (
        <BrowserRouter>
            <OrgNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="host" element={<Host />} />
                <Route path="register" element={<Regevent />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App2 />);
export default App2;