import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from './Users/Browse.jsx'
import Home from './Users/Home.jsx'
import Regevent from './Users/Regevent.jsx'
import Navbar from "./Components/Navbar.jsx";
import Signin from "./signin/signin.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="browse" element={<Browse />} />
                <Route path="register" element={<Regevent />} />
                <Route path="organizer" element={<Organizers />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;