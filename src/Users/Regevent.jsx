import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './Regevent.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialCarousel({ images }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        beforeChange: (oldIndex, newIndex) => setSelectedImage(newIndex),
    };

    const handleThumbnailClick = (index) => {
        setSelectedImage(index);
        sliderRef.current.slickGoTo(index); // Move slider to clicked image
    };

    return (
        <div className="carousel-container">
            {/* Main Image Carousel */}
            <Slider ref={sliderRef} {...settings} className='slider'>
                {images.length > 0 ? images.map((img, index) => (
                    <div key={index} className="testimonial-slide">
                        <img src="uploads/1743610443446-th-4231806598.jpg" alt={`Event ${index}`} className="main-image" />
                    </div>
                )) : (
                    <div className="testimonial-slide">
                        <img src="placeholder.jpg" alt="No Images Available" className="main-image" />
                    </div>
                )}
            </Slider>

            {/* Thumbnails (Static) */}
            <div className="thumbnail-container">
                {images.length > 0 ? images.map((img, index) => (
                    <div
                        key={index}
                        className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <img src={img} alt="Preview" />
                    </div>
                )) : null}
            </div>
        </div>
    );
}

function Regevent() {
    const { eventId } = useParams(); // Get event ID from URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/events/${eventId}`)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error("Error fetching event:", error));
    }, [eventId]);

    if (!event) return <p>Loading event details...</p>;

    return (
        <div className="regevent Main">
            {/* Updated to use event images */}
            <TestimonialCarousel images={event.pictures || []} />

            <div className='event'>
                <h2 className='event_name'>{event.title || "Event Name"}</h2>
                <div className='event_info'>
                    <div className='event_reg'>
                        <div className='event_specs'>{event.categories?.join(", ") || "Category"}</div>
                        <button className='Register'>Register</button>
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
                        <h3 className='uc_event_header'>Upcoming events</h3>
                        <div className='events'>
                            <div className='UC_event'>
                                <div className='event1'><img className='event_photo' src="white.jpeg" alt="Upcoming Event" /></div>
                                <div className='artist_name'>Event</div>
                            </div>
                            <div className='UC_event'>
                                <div className='event2'><img className='event_photo' src="white.jpeg" alt="Upcoming Event" /></div>
                                <div className='artist_name'>Event</div>
                            </div>
                            <div className='UC_event'>
                                <div className='event3'><img className='event_photo' src="white.jpeg" alt="Upcoming Event" /></div>
                                <div className='artist_name'>Event</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Regevent;
