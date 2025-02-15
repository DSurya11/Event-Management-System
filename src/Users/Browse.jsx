import './Browse.css'
import {Link} from 'react-router-dom';
import React, { useState } from "react";
import ChatIcon from '../Components/ChatIcon';

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
        <div className="browsemain Main">
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

                        <img className='browsingimg' src="./th.jpg" alt="" />

                        <div className='browsingtext'>
                            <div className='headingdate'>
                                <div><h2>Shutterbox </h2></div>
                                <div class="date">January 25, 2025</div>
                            </div>
                            <div className='typetime'>
                                <div class="type"><b>Photograohy</b></div>
                                <div class="time">11:45 AM</div>
                            </div>
                            <div className='descriptionlocation'>
                                <div className='description'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestiae excepturi nihil magnam tenetur fuga cum quos expedita, animi alias et omnis minima. Laboriosam quidem, adipisci molestias ex nostrum dolore!</p> </div>
                                <div class="location"><p>Location</p>
                                    <Link to = "/register"><button>Register now</button></Link></div>
                            </div>



                        </div>

                    </div>
                    <div className='browseitem'>

                        <img className='browsingimg' src="./th.jpg" alt="" />

                        <div className='browsingtext'>
                            <div className='headingdate'>
                                <div><h2>Shutterbox </h2></div>
                                <div class="date">January 25, 2025</div>
                            </div>
                            <div className='typetime'>
                                <div class="type"><b>Photograohy</b></div>
                                <div class="time">11:45 AM</div>
                            </div>
                            <div className='descriptionlocation'>
                                <div className='description'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestiae excepturi nihil magnam tenetur fuga cum quos expedita, animi alias et omnis minima. Laboriosam quidem, adipisci molestias ex nostrum dolore!</p> </div>
                                <div class="location"><p>Location</p>
                                    <Link to = "/register"><button>Register now</button></Link></div>
                            </div>



                        </div>

                    </div>
                    <div className='browseitem'>

                        <img className='browsingimg' src="./th.jpg" alt="" />

                        <div className='browsingtext'>
                            <div className='headingdate'>
                                <div><h2>Shutterbox </h2></div>
                                <div class="date">January 25, 2025</div>
                            </div>
                            <div className='typetime'>
                                <div class="type"><b>Photograohy</b></div>
                                <div class="time">11:45 AM</div>
                            </div>
                            <div className='descriptionlocation'>
                                <div className='description'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestiae excepturi nihil magnam tenetur fuga cum quos expedita, animi alias et omnis minima. Laboriosam quidem, adipisci molestias ex nostrum dolore!</p> </div>
                                <div class="location"><p>Location</p>
                                    <Link to = "/register"><button>Register now</button></Link></div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
            <ChatIcon/>
        </div>
    )
}

export default Browse;
