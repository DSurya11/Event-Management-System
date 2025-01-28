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
        <div className="browse">
            <h2>Find Your Next College Experience</h2>
            <input className='searchbox' type="text" placeholder="Search here" />
            <div className='filters'>
                <h3>Filter</h3>
                <hr style={{ color: "lightseagreen", width: "17%", marginLeft: "0%" }} />
                <div className="date-filter">
                    <h4>Date</h4>

                    <button onClick={() => document.getElementById("date-picker").showPicker()} style={selectedDate?{backgroundColor:"lightseagreen"}:{}}>
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
                <hr style={{ color: "lightseagreen", width: "17%", marginLeft: "0%" }} />
                <h4>Category</h4>
                <div className='categories'>
                    
                    {categories.map((category, index) => (
                        <div key={index} className='each-category'>
                            <input type="checkbox" id={category} className='check' name="category" value={category} />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                </div>
                <hr style={{ color: "lightseagreen", width: "17%", marginLeft: "0%" }} />
            </div>
        </div>
    )
}

export default Browse;
