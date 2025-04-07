import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import './VdEvent_Up.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from 'react-router-dom';

function VdEvent_On() {
    const [eventData, setEventData] = useState(null);
    const [images, setImages] = useState([]);
    const { eventId } = useParams();

    useEffect(() => {
        fetchEventDetails();
        fetchImages();
    }, [eventId]);

    const fetchEventDetails = async () => {
        try {
            const res = await fetch(`http://localhost:3000/events/${eventId}`);
            const data = await res.json();
            setEventData(data);
        } catch (err) {
            console.error('Error fetching event details:', err);
        }
    };

    const fetchImages = async () => {
        try {
            const res = await fetch(`http://localhost:3000/events/${eventId}/images`);
            const data = await res.json();
            setImages(data);
        } catch (err) {
            console.error('Error fetching images:', err);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (!eventData) return <div>Loading event...</div>;

    return (
        <div className="regevent Main">
            <div className="testimonial-container">
                <div className="testimonial-inner">
                    {images.length > 0 ? (
                        <Slider {...settings}>
                            {images.map((img, index) => (
                                <div key={index} className="testimonial-slide">
                                    <img
                                        src={`http://localhost:3000/uploads/${img.filename}`}
                                        alt="Event"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
            </div>

            <div className='event'>
                <h2 className='event_name'>{eventData.title}</h2>
                <div className='event_info'>
                    <div className='event_reg'>
                        <div className='event_specs'>{eventData.genres} | {eventData.languages} | {eventData.years} | {eventData.duration}</div>
                    </div>
                    <hr />
                    <div className='event_details'>
                        <div className='event_date'>{eventData.date}</div>
                        <div className='event_location'>
                            <svg className="location_symbol" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg>
                            <p>{eventData.venue}</p>
                        </div>
                    </div>
                </div>

                <div className='event_info2'>
                    <div className='event_motto'>
                        <h3 className='motto_header'>What makes this event stand out from others?</h3>
                        <div className='motto_info'>
                            <p>{eventData.description}</p>
                        </div>
                    </div>
                    <div className='uc_event'>
                        <button className='VdEvent_up_btn' onClick={() => updateStatus(1)}>Approve</button>
                        <button className='VdEvent_up_btn' onClick={() => updateStatus(2)}>Reject</button>
                    </div>
                </div>
            </div>
        </div>
    );

    function updateStatus(status) {
        const endpoint = status === 1 ? 'approve' : 'reject';
        fetch(`http://localhost:3000/events/${eventId}/${endpoint}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(() => {
                alert(status === 1 ? "Event approved!" : "Event rejected!");
            })
            .catch(err => {
                console.error("Error updating status:", err);
                alert("Failed to update event status.");
            });
    }
}

export default VdEvent_On;
