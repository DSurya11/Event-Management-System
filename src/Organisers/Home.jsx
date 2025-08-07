import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Components/ConfirmationModal';
import './Home.css';

function OrgHome() {
    const [ongoingEvents, setOngoingEvents] = useState([]);
    const [previousEvents, setPreviousEvents] = useState([]);
    const [regData, setRegData] = useState([]);
    const [showRegFor, setShowRegFor] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [onModalConfirm, setOnModalConfirm] = useState(() => () => {});

    const handleCloseClick = (event_id) => {
        setModalMessage("Close registrations for this event?");
        setOnModalConfirm(() => () => closeReg(event_id));
        setModalOpen(true);
    };

    const handleCancelClick = (event_id) => {
        setModalMessage("Cancel this event? This action cannot be undone. Notify your participants before cancelling.");
        setOnModalConfirm(() => () => cancelEvent(event_id));
        setModalOpen(true);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const res = await fetch(`http://localhost:3000/organizer/events?organizerId=${userId}`);
                const data = await res.json();
                setOngoingEvents(data.ongoing);
                setPreviousEvents(data.previous);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };
        fetchEvents();
    }, []);

    const closeReg = async (event_id) => {
        try {
            const res = await fetch(`http://localhost:3000/organizer/close-registration/${event_id}`, {
                method: 'PUT',
            });
            const result = await res.json();
            if (result.success) {
                setOngoingEvents(prev =>
                    prev.filter(ev => ev.event_id !== event_id)
                );
                setPreviousEvents(prev => [...prev, ...ongoingEvents.filter(ev => ev.event_id === event_id)]);
            } else {
                console.error(result.message);
            }
        } catch (err) {
            console.error("Error closing registration:", err);
        }
    };

    const cancelEvent = async (event_id) => {
        try {
            const res = await fetch(`http://localhost:3000/organizer/delete-event/${event_id}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            if (result.success) {
                setOngoingEvents(prev => prev.filter(ev => ev.event_id !== event_id));
                setPreviousEvents(prev => prev.filter(ev => ev.event_id !== event_id));
            } else {
                console.error(result.message);
            }
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    const fetchRegs = async (event_id, event_name) => {
        try {
            console.log('Fetching registrations for event:', event_id);
            const res = await fetch(`http://localhost:3000/organizer/registrations/${event_id}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setRegData(data);
            setShowRegFor({ id: event_id, name: event_name });
        } catch (err) {
            console.error('Error fetching registrations:', err);
            setRegData([]);
            setShowRegFor({ id: event_id, name: event_name });
        }
    };

    const parseCustomFields = (dataStr) => {
        try {
            const parsed = JSON.parse(dataStr);
            // Remove name & email (since they are already shown)
            const filtered = parsed.filter(field => field.name.toLowerCase() !== "name" && field.name.toLowerCase() !== "email");
            return filtered;
        } catch (err) {
            return [];
        }
    };

    return (
        <div className="org_home Main">
            <div className='home-head'>
                <h1 className="home-heading head-text-card">Welcome, Organizer!</h1>
                <p>"Effortlessly create and manage college events while attracting enthusiastic participants!"</p>
            </div>

            {/* Ongoing Events */}
            {ongoingEvents.length > 0 && (
                <>
                    <h2 className='subhead-text-card'>Your Ongoing Events</h2>
                    <div className='ongoing_events-home'>
                        {ongoingEvents.map(event => (
                            <div className='ongoing_event_cards' key={event.event_id}>
                                <div>
                                    <h1 className='head-text-card'>{event.title}</h1>
                                    <p id='cat'>{event.category}</p>
                                    <p id='datetime'>{event.time}<br />{new Date(event.date).toLocaleDateString()}</p>
                                    <p id='location'>{event.venue}</p>
                                    <p id='deadline'>Deadline: {new Date(event.reg_end_date).toLocaleString()}</p>
                                </div>
                                <div className='circle-prog'>
                                    <div className='box'>
                                        <div className='percent'>
                                            <svg>
                                                <circle cx="70" cy="70" r="70" />
                                                <circle cx="70" cy="70" r="70" style={{ strokeDashoffset: 440 - (440 * event.occupancy) / 100 }} />
                                            </svg>
                                            <div className='number'>
                                                <h2>{event.occupancy}<span>%</span></h2>
                                            </div>
                                        </div>
                                        <h3>Occupancy</h3>
                                    </div>
                                </div>
                                <div className='ongoing-btns'>
                                    <svg onClick={() => navigate(`/organizer/edit/${event.event_id}`)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.1739 3.5968..." fill="#0F1729"></path>
                                    </svg>
                                    {event.approved == 1 ? (
                                        <button onClick={() => fetchRegs(event.event_id, event.title)}>Registrations</button>
                                    ) : event.approved == 2 ? (
                                        <button disabled style={{ backgroundColor: "#dc3545", color: "white" }}>Rejected</button>
                                    ) : (
                                        <button disabled style={{ backgroundColor: "#6c757d", color: "white" }}>Not Approved</button>
                                    )}
                                    <button onClick={() => handleCloseClick(event.event_id)}>Close Registrations</button>
                                    <button onClick={() => handleCancelClick(event.event_id)}>Cancel Event</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Previous Events */}
            {previousEvents.length > 0 && (
                <>
                    <h2 className='subhead-text-card'>Your Previous Events</h2>
                    <div className='previous-events'>
                        {previousEvents.map(event => (
                            <div className='previous_event_cards' key={event.event_id}>
                                <div>
                                    <h1 className='head-text-card'>{event.title}</h1>
                                    <p id='cat'>{event.category}</p>
                                    <p id='datetime'>{event.time}<br />{new Date(event.date).toLocaleDateString()}</p>
                                    <p id='location'>{event.venue}</p>
                                    {event.approved == 1 ? (
                                        <button onClick={() => fetchRegs(event.event_id, event.title)}>Registrations</button>
                                    ) : event.approved == 2 ? (
                                        <button disabled style={{ backgroundColor: "#dc3545", color: "white" }}>Rejected</button>
                                    ) : (
                                        <button disabled style={{ backgroundColor: "#6c757d", color: "white" }}>Not Approved</button>
                                    )}
                                </div>
                                <div className='vertical-progress'>
                                    <p>Occupancy: {event.occupancy}%</p>
                                    <div className='vertical-bar'></div>
                                    <div className='vertical-bar-prog' style={{ height: `${event.occupancy}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* No Events */}
            {ongoingEvents.length === 0 && previousEvents.length === 0 && (
                <div className="no-events-msg">
                    <h2 className="subhead-text-card-v2">Host Your First Event</h2>
                    <p>You haven’t hosted any events yet. Let’s get started!</p>
                    <button className="host-event-btn" onClick={() => navigate('/organizer/host')}>Host an Event</button>
                </div>
            )}

            {/* Registration Table */}
            {showRegFor !== null && (
                <div className="reg-table-container">
                    <div className="reg-header">
                        <h3>Registrations for: {showRegFor.name || 'Unnamed Event'}</h3>
                        <button onClick={() => setShowRegFor(null)}>Close</button>
                    </div>
                    <table className="reg-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Registered At</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {regData.length === 0 ? (
                                <tr><td colSpan="5">No registrations</td></tr>
                            ) : (
                                regData.map((u) => {
                                    const customFields = parseCustomFields(u.data);
                                    const hasExtraFields = customFields.length > 0;

                                    return (
                                        <>
                                            <tr key={u.user_id}>
                                                <td>{u.user_id}</td>
                                                <td>{u.name}</td>
                                                <td>{u.email}</td>
                                                <td>{new Date(u.submitted_at).toLocaleString()}</td>
                                                <td>
                                                    {hasExtraFields && (
                                                        <button onClick={() => setExpandedRow(expandedRow === u.user_id ? null : u.user_id)}>
                                                            {expandedRow === u.user_id ? "Hide Details" : "More Details"}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>

                                            {expandedRow === u.user_id && hasExtraFields && (
                                                <tr className="details-row">
                                                    <td colSpan="5">
                                                        <div className="details-container">
                                                            <h4>Additional Details</h4>
                                                            <table className="custom-fields-table">
                                                                <tbody>
                                                                    {customFields.map((field, idx) => (
                                                                        <tr key={idx}>
                                                                            <td>{field.name}</td>
                                                                            <td>{field.value}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmationModal
                isOpen={modalOpen}
                message={modalMessage}
                onConfirm={() => {
                    onModalConfirm();
                    setModalOpen(false);
                }}
                onCancel={() => setModalOpen(false)}
            />
        </div>
    );
}

export default OrgHome;
