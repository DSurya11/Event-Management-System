import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); 
        navigate("/"); console.log("Profile component rendered");
console.log("Logout button clicked");
console.log("Navigating to login page");
    };

    return (
        <div className="profile_page">
            <div className="profile_boxM1">
                <div className="profile_logo">
                    <img src="/profile_pic2.jpg" alt="Profile" />
                    <p>Hey Middle_Name</p>
                    <p className="Designation">Student</p>
                    <button className="profilelogout" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <div className="profile_boxM2">
                <div className="profile_box2">
                    <div className="profile_box2_name"><span>Name: </span>Your Name</div>
                    <div className="profile_box2_email"><span>E-mail: </span>Your email address</div>
                    <div className="profile_box2_date"><span>Joined on: </span>date_joined</div>
                </div>
                <div className="profile_box3">
                    <p>Previous attended events</p>
                    <div className="Prev_attended_events">
                        <div className="Prev_event_1">Event1</div>
                        <div className="Prev_event_1">Event2</div>
                        <div className="Prev_event_1">Event3</div>
                        <div className="Prev_event_1">Event4</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
