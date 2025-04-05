import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Organisers/Home.jsx'
import Regevent from './Users/Regevent.jsx'
import OrgNav from "./Components/OrgNav.jsx";
import Host from "./Organisers/Host.jsx";
import Razerpay from "./Payments/Razerpay.jsx";
import Chat from "./communication/Chat.jsx";
import Attendeesignin from "./signin/attendeessignin.jsx";
import Organizers from "./Users/Organizers.jsx";

function App2() {
    return (
        <BrowserRouter>
            <OrgNav />
            <Routes>
                <Route path="/" element={<Organizers />} />
                
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App2 />);
export default App2;