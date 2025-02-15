import Regevent from './Users/Regevent.jsx'
function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="browse" element={<Browse />} />
                <Route path="register" element={<Regevent />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
