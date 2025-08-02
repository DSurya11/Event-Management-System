import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

function Guesthome() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/events/recent")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    const handleSignin = () => {
        navigate('/signin');
    };

    return (
        <div className="home main">
            <div className="home-head">
                <h1 className="home-heading head-text">College Events made easy!</h1>
                <p className="home-subtext">Explore a variety of college events and easily register to participate in the ones that excite you the most!</p>
                <button className="cta-button" onClick={handleSignin}>Sign In</button>
            </div>

            <h1 className="sidehead subhead-text">Discover Events</h1>
            <div className="discover-cards">
                <div>
                    <h2 className="subhead-text">1. Fests</h2>
                    <p>Join exciting festivals with music, dance, and cultural performances.</p>
                </div>
                <div>
                    <h2 className="subhead-text">2. Workshops</h2>
                    <p>Enhance your skills with informative workshops and seminars.</p>
                </div>
                <div>
                    <h2 className="subhead-text">3. Sports</h2>
                    <p>Compete or cheer in thrilling sports events and tournaments.</p>
                </div>
            </div>

            <div className="event-cardholder">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div className="content" key={event.event_id}>
                            <div className="contentimg">
                                <img
                                    src={event.cover_image || "https://via.placeholder.com/300"}
                                    alt={event.title}
                                />
                            </div>
                            <h2 className="contenth1">{event.title}</h2>
                            <div className="contenttext">
                                {event.description && event.description.length > 150
                                    ? event.description.substring(0, 150) + "..."
                                    : event.description}
                            </div>
                            <Link to="/signin" className="contenta">
                                View Details
                                <svg className="asvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="lightseagreen">
                                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                                </svg>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No approved events found.</p>
                )}
            </div>

            <div className="divider">
                <Link to="/browse"><button className="cta-button">Browse all Events</button></Link>
                <div className="divider-line short-line"></div>
                <div className="divider-line shorter-line"></div>
            </div>
        </div>
    );
}

export default Guesthome;
