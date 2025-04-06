import React from 'react';
import './VdEvent_On.css';
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
                    <img src={testimonial.pic} alt="Customer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            ))}
        </Slider>
    );
}



function VdEvent_On() {
    return (
        <div className="regevent Main">
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
                    </div>
                    <hr></hr>
                    <div className='event_details'>
                        <div className='event_date'>Sunday | 12 Jan 2020 at 06:00 PM</div>
                        <div className='event_location'><svg className="location_symbol" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg> <p> OAT, IIITDM jabalpur, near Dumna Airport road</p></div>
                    </div>
                </div>
                <div className='event_info2'>
                    <div className='event_motto'>
                        <h3 className='motto_header'>What makes this event stand out from others?</h3>
                        {/* <ul> */}
                            <div className='motto'>
                                {/* <li className='motto_bp'><b>Diverse Music Genres:</b> A fusion of Pop, Folk, Filmy, and Jazz to suit every musical taste</li>
                                <li className='motto_bp'><b>Multilingual Experience:</b> Performances in Telugu, Hindi, and English for a truly inclusive vibe.</li>
                                <li className='motto_bp'><b>Extended Celebration: </b>A 6-hour non-stop musical extravaganza for maximum enjoyment.</li>
                                <li className='motto_bp'><b>Unforgettable Venue: </b>Hosted at the iconic OAT, IIITDM Jabalpur, offering an electrifying ambiance.</li>
                                <li className='motto_bp'><b>Unmatched Energy: </b>A night filled with rhythm, fun, and the magic of live DJ performances.</li> */}
                                <div className='motto_info'>
                                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nemo quae at, ducimus aliquam, molestiae a provident impedit, repellendus nostrum doloremque. Mollitia accusantium explicabo at, temporibus earum quod debitis numquam?</p>
                                     <p>
                                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo suscipit deserunt iure in minus rerum voluptatibus laboriosam, laborum quasi ut eveniet expedita, dolores unde. Obcaecati ipsa veniam at natus aliquid!
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo quam, animi tenetur veritatis quis, quibusdam perferendis voluptatum earum et doloremque nobis officia ab numquam aliquam molestias, cupiditate laborum. Magni, consequatur!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam dolore soluta adipisci. Fuga a, aliquam hic porro recusandae, fugit ea odio laudantium beatae incidunt et, eius pariatur. Minus, voluptates totam!
                                     </p>
                                     <p>
                                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente dolor modi officiis soluta sed eveniet similique assumenda eaque qui eum, ea tempora architecto voluptate aperiam saepe commodi magnam libero doloribus.
                                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, officiis soluta harum impedit magnam id sapiente! Expedita reiciendis debitis, animi quidem excepturi quibusdam quis eligendi doloremque accusantium! Facilis, velit est.
                                     </p>
                                    
                                </div>
                                
                                

                            </div>

                        {/* </ul> */}
                    </div>
                    <div className='uc_event'>
                    <button className='VdEvent_on_btn'>Cancel Event</button>
                    <button className='VdEvent_on_btn'>Stop Registrations</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default VdEvent_On;