import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Regevent.css';

function Regevent() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [recentEvents, setRecentEvents] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch selected event
        fetch(`http://localhost:3000/events/${eventId}`)
            .then(response => response.json())
            .then(data => {
                setEvent(data);
                setSelectedImageIndex(0);
            })
            .catch(error => console.error("Error fetching event:", error));

        // Fetch recent events
        fetch("http://localhost:3000/events/recent")
            .then(response => response.json())
            .then(data => {
                setRecentEvents(data);
            })
            .catch(error => console.error("Error fetching recent events:", error));
    }, [eventId]);


    if (!event) return <p>Loading event details...</p>;

    const allImages = [event.cover_image, ...(event.pictures || [])];

    return (
        <div className="regevent Main">
            <div className="carousel-container">
                {allImages.length > 0 && (
                    <>
                        <div className='slider'>
                            <div className="testimonial-slide">
                                <img
                                    src={`../${allImages[selectedImageIndex]}`}
                                    alt={`Event ${selectedImageIndex}`}
                                    className="main-image"
                                />
                            </div>
                        </div>
                        <div className="thumbnail-container">
                            {allImages.map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedImageIndex === index ? "active" : ""}`}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img src={`../${img}`} alt={`Thumbnail ${index}`} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>


            <div className='event'>
                <h2 className='event_name'>{event.title || "Event Name"}</h2>
                <div className='event_info'>
                    <div className='event_reg'>
                        <div className='event_specs'>{event.categories?.join(", ") || "Category"}</div>
                                <Link to={`/chat/attendees/${eventId}/${event.organiser}`}>Open Chat</Link>
                        <button
                            className='Register'
                            onClick={() =>
                                navigate(`/register/${event.event_id}/fillform`, {
                                    state: {
                                        eventId: event.event_id,
                                        amount: event.price * 100, // Razorpay needs amount in paise
                                        customFields: event.custom_fields || [
                                            { name: "Name", type: "text" },
                                            { name: "Email", type: "email" },
                                            { name: "Phone", type: "tel" }
                                        ]
                                    }
                                })
                            }
                        >
                            Register now
                        </button>

                    </div>
                    <hr />
                    <div className='event_details'>
                        <div className='event_date'>
                            {event.date ? new Date(event.date).toDateString() : "Date Not Available"} at {event.time || "Time Not Available"}
                        </div>
                        <div className='event_location'>
                            <svg className="location_symbol" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                            </svg>
                            <p>{event.venue || "Location Not Available"}</p>
                        </div>
                    </div>
                </div>
                <div className='event_info2'>
                    <div className='event_motto'>
                        <h3 className='motto_header'>What makes this event stand out from others?</h3>
                        <div className='motto'>
                            <div className='motto_info description-event'>
                                <p>{event.description || "No description available for this event."}</p>
                            </div>
                        </div>
                    </div>
                    <div className='uc_event'>
                        <h3 className='uc_event_header'>More Events</h3>
                        <div className='events'>
                            {recentEvents
                                .filter(e => e.event_id !== parseInt(eventId)) // 🛑 Filter out current event
                                .map((e, index) => (
                                    <Link to={`/register/${e.event_id}`} key={index} className='UC_event'>
                                        <div className='event1'>
                                            <img
                                                className='event_photo'
                                                src={`../${e.cover_image}`}
                                                alt={e.title}
                                            />
                                            <div className='artist_name'>{e.title}</div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Regevent;
