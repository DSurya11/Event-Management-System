import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orgprofile.css";

function Orgprofile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [ongoingEvents, setOngoingEvents] = useState([]);
    const [previousEvents, setPreviousEvents] = useState([]);

    const organiserId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

useEffect(() => {
  const fetchProfile = async () => {
    try {
      console.log("Fetching profile for organiser ID:", organiserId);
      const res = await fetch(`http://localhost:3000/api/organiserp/${organiserId}`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      console.log("Data received:", data);
      setProfile(data.organiser);
      setOngoingEvents(data.ongoingEvents);
      setPreviousEvents(data.previousEvents);
    } catch (err) {
      console.error("Error fetching organiser profile:", err);
    }
  };

  if (organiserId && userRole === "organizer") {
    fetchProfile();
  }
}, [organiserId, userRole]);


    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="profile_page">
            <div className="profile_boxM1">
                <div className="profile_logo">
                    <img src={profile?.logo || "/profile_pic2.jpg"} alt="Profile" />
                    <p>Hey {profile?.name || "Organizer"}</p>
                    <p className="Designation">Organizer</p>
                    <button className="profilelogout" onClick={handleLogout}>Log Out</button>
                </div>
            </div>

            <div className="profile_boxM2">
                <div className="profile_box2">
                    <div className="profile_box2_name"><span>Name: </span>{profile?.name}</div>
                    <div className="profile_box2_email"><span>Email: </span>{profile?.username}</div>
                </div>

                <div className="profile_box3">
                    <p>Ongoing Events</p>
                    <div className="Prev_attended_events">
                        {ongoingEvents.length > 0 ? (
                            ongoingEvents.map((event, index) => (
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
                            <div className="Prev_event_1">No ongoing events.</div>
                        )}
                    </div>
                </div>

                <div className="profile_box3">
                    <p>Completed Events</p>
                    <div className="Prev_attended_events">
                        {previousEvents.length > 0 ? (
                            previousEvents.map((event, index) => (
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
                            <div className="Prev_event_1">No completed events yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orgprofile;