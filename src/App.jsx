import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from './Users/Browse.jsx'
import Home from './Users/Home.jsx'
import Regevent from './Users/Regevent.jsx'
import Organizers from "./Users/Organizers.jsx";
import Navbar from "./Components/Navbar.jsx";
import Signin from "./signin/signin.jsx";
import Admin from "./Admin/Admin.jsx";
import BrowseOrg from "./Users/BrowseOrg.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<BrowseOrg/>} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;