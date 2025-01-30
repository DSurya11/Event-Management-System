import React from 'react';
import './Regevent.css';
import Slider from "react-slick"; // For carousel
import "slick-carousel/slick/slick.css"; // Slick styles
import "slick-carousel/slick/slick-theme.css"; // Slick theme

const testimonials = [
    {
        id: 1,
        pic: "dj1.jpg"
    },
    {
        id: 2,
        pic: "dj2.jpeg"
    },
    {
        id: 3,
        pic: "dj3.jpeg"
    },
];
function TestimonialCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-slide">
                    <img src={testimonial.pic} alt="Customer" style={{ width: "90%", height: "90%", objectFit: "cover" }} />
                </div>
            ))}
        </Slider>
    );
}



function Regevent() {
    return (
        <div className="regevent">
            <div className="testimonial-container">
                <div className="testimonial-inner">
                    <TestimonialCarousel />
                </div>
            </div>

            <div className='event'>
                <h2 className='event_name'>Event Name</h2>
                <div className='event_info'>
                    <div className='event_reg'>
                        <div className='event_specs'>Pop, Folk, Filmy, Jazz | Telugu, Hindi, English | 2nd,3rd,4th years | 6hrs</div>
                        <button className='Register'>Register</button>
                    </div>
                    <hr></hr>
                    <div className='event_details'>
                        <div className='event_date'>Sunday | 12 Jan 2020 at 06:00 PM</div>
                        <div className='event_location'><svg className="location_symbol" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg> <p> OAT, IIITDM jabalpur, near Dumna Airport road</p></div>
                    </div>
                </div>
                <div className='event_info2'>
                    <div className='artists'>
                        <h3 className='Artist_header'>Artists</h3>
                        <div className='Artist'>
                            <div className='artist1'><img className='artist_photo' src=".\public\white.jpeg" alt="" /></div>
                            <div className='artist_name'>Artist Name</div>
                        </div>
                        <div className='Artist'>
                            <div className='artist2'><img className='artist_photo' src=".\public\white.jpeg" alt="" /></div>
                            <div className='artist_name'>Artist Name</div>
                        </div>
                        <div className='Artist'>
                            <div className='artist3'><img className='artist_photo' src=".\public\white.jpeg" alt="" /></div>
                            <div className='artist_name'>Artist Name</div>
                        </div>
                    </div>
                    <div className='event_motto'>
                        <h3 className='motto_header'>What makes this event stand out from others?</h3>
                        <ul>
                            <div className='motto'>
                                <li className='motto_bp'><b>Diverse Music Genres:</b> A fusion of Pop, Folk, Filmy, and Jazz to suit every musical taste</li>
                                <li className='motto_bp'><b>Multilingual Experience:</b> Performances in Telugu, Hindi, and English for a truly inclusive vibe.</li>
                                <li className='motto_bp'><b>Extended Celebration: </b>A 6-hour non-stop musical extravaganza for maximum enjoyment.</li>
                                <li className='motto_bp'><b>Unforgettable Venue: </b>Hosted at the iconic OAT, IIITDM Jabalpur, offering an electrifying ambiance.</li>
                                <li className='motto_bp'><b>Unmatched Energy: </b>A night filled with rhythm, fun, and the magic of live DJ performances.</li>
                            </div>

                        </ul>
                    </div>
                    <div className='uc_event'>
                        <h3 className='uc_event_header'>Upcoming events</h3>
                        <div className='events'>
                            <div className='UC_event'>
                                <div className='event1'><img className='event_photo' src=".\public\white.jpeg" alt="" /></div>
                                <div className='artist_name'>Event</div>
                            </div>
                            <div className='UC_event'>
                                <div className='event2'><img className='event_photo' src=".\public\white.jpeg" alt="" /></div>
                                <div className='artist_name'>Event</div>
                            </div>
                            <div className='UC_event'>
                                <div className='event3'><img className='event_photo' src=".\public\white.jpeg" alt="" /></div>
                                <div className='artist_name'>Event</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Regevent;
