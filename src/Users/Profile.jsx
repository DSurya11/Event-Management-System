import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";


function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`http://localhost:3000/profile/${userRole}/${userId}`);
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        if (userId && userRole) {
            fetchProfile();
        }
    }, [userId, userRole]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="profile_page">
            <div className="profile_boxM1">
                <div className="profile_logo">
                    <img src="/profile_pic2.jpg" alt="Profile" />
                    <p>Hey {profile?.name || "User"}</p>
                    <p className="Designation">{userRole === "attendee" ? "Student" : "Organizer"}</p>
                    <button className="profilelogout" onClick={handleLogout}>Log Out</button>
                </div>
            </div>

            <div className="profile_boxM2">
                <div className="profile_box2">
                    <div className="profile_box2_name"><span>Name: </span>{profile?.name}</div>
                    <div className="profile_box2_email"><span>E-mail: </span>{profile?.email}</div>
                    <div className="profile_box2_date">
                        <span>Joined on: </span>{profile?.date_joined?.split("T")[0]}
                    </div>
                </div>

                {userRole === "attendee" && (
                    <div className="profile_box3">
                        <p>Previous attended events</p>
                        <div className="Prev_attended_events">
                            {profile?.previous_events?.length > 0 ? (
                                profile.previous_events.map((event, index) => (
                                    <div
                                        key={index}
                                        className="Prev_event_1"
                                        onClick={() => navigate(`/register/${event.event_id}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {event.title}
                                    </div>
                                ))
                            ) : (
                                <div className="Prev_event_1">No events attended yet.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
