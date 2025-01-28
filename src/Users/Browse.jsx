import './Browse.css'
import React, { useState } from "react";

function Browse() {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const formatDate = (date) => {
        if (!date) return '';
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    const categories = ["Academics", "Culture", "Sports", "Social", "Tech", "Career", 'Awareness', "Festivals", "Commuinty", "Competitions", "Workshops", "Events", "InterCollege", "Clubs"];

    return (
        <div className="">
            <h2 id='searchh2'>Find Your Next College Experience</h2>
            <input className='searchbox' type="text" placeholder="Search here" />
            <div className="browse">
                <div className='filters'>
                    <h3>Filter</h3>
                    <hr style={{ color: "lightseagreen", width: "100%", marginLeft: "0%" }} />
                    <div className="date-filter">
                        <h4>Date</h4>

                        <button onClick={() => document.getElementById("date-picker").showPicker()} style={selectedDate ? { backgroundColor: "lightseagreen" } : {}}>
                            {selectedDate ? formatDate(selectedDate) : "Select Date"}
                        </button>

                        <input
                            type="date"
                            id="date-picker"
                            value={selectedDate}
                            onChange={handleDateChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <hr style={{ color: "lightseagreen", width: "100%", marginLeft: "0%" }} />
                    <h4>Category</h4>
                    <div className='categories'>

                        {categories.map((category, index) => (
                            <div key={index} className='each-category'>
                                <input type="checkbox" id={category} className='check' name="category" value={category} />
                                <label htmlFor={category}>{category}</label>
                            </div>
                        ))}
                    </div>
                    <hr style={{ color: "lightseagreen", width: "100%", marginLeft: "0%" }} />
                </div>
                <div className='browse-list'>
                    <div className='browseitem'>

                        <img className='browsingimg' src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="" />

                        <div className='browsingtext'>
                            <div className='headingdate'>
                                <div><h2>Heading </h2></div>
                                <div class="date">January 25, 2025</div>
                            </div>
                            <div className='typetime'>
                                <div class="type"><b>Type:</b></div>
                                <div class="time">11:45 AM</div>
                            </div>
                            <div className='descriptionlocation'>
                                <div className='description'><b>Description:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe deserunt maiores sit? Est beatae dolore nostrum possimus ab rerum vel eveniet aliquid consequatur facere explicabo sit fuga voluptatem, id eius.   </div>
                                <div class="location"><p>Location</p>
                                    <button>Register Now</button></div>
                            </div>



                        </div>

                    </div>
                    <div className='browseitem'>

                        <img className='browsingimg' src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="" />

                        <div className='browsingtext'>
                            <div className='headingdate'>
                                <div><h2>Heading </h2></div>
                                <div class="date">January 25, 2025</div>
                            </div>
                            <div className='typetime'>
                                <div class="type"><b>Type:</b></div>
                                <div class="time">11:45 AM</div>
                            </div>
                            <div className='descriptionlocation'>
                                <div className='description'><b>Description:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe deserunt maiores sit? Est beatae dolore nostrum possimus ab rerum vel eveniet aliquid consequatur facere explicabo sit fuga voluptatem, id eius.   </div>
                                <div class="location"><p>Location</p><button>Register Now</button></div>
                            </div>



                        </div>

                    </div>
                    <div className='browseitem'>

                        <img className='browsingimg' src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="" />

                        <div className='browsingtext'>
                            <div className='headingdate'>
                                <div><h2>Heading </h2></div>
                                <div class="date">January 25, 2025</div>
                            </div>
                            <div className='typetime'>
                                <div class="type"><b>Type:</b></div>
                                <div class="time">11:45 AM</div>
                            </div>
                            <div className='descriptionlocation'>
                                <div className='description'><b>Description:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe deserunt maiores sit? Est beatae dolore nostrum possimus ab rerum vel eveniet aliquid consequatur facere explicabo sit fuga voluptatem, id eius.   </div>
                                <div class="location"><p>Location</p><button>Register Now</button></div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Browse;
