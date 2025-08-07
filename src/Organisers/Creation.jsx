import { useState } from "react";
import "./Creation.css";

function Creation() {
  const [currentView, setCurrentView] = useState("dashboard");

  return (
    <div className="container">
      {currentView === "dashboard" && (
        <>
          <h1>Organizer Dashboard</h1>
          <h2>Welcome, [Organizer Name]</h2>
          <section className="events-section">
            <h3>Previously Organized Events</h3>
            <ul className="events-list">
              <li className="event-card">
                <div className="event-image">
                  <img src="public/workshop.jpeg" alt="Workshop on AI" />
                </div>
                <div className="event-details">
                  <h4 className="event-title">Workshop on AI</h4>
                  <p className="event-date">Date: 2024-12-12</p>
                  <p className="event-description">
                    A hands-on workshop exploring artificial intelligence and its real-world applications.
                  </p>
                </div>
              </li>
              <li className="event-card">
                <div className="event-image">
                  <img src="public/techconf.jpeg" alt="Tech Conference" />
                </div>
                <div className="event-details">
                  <h4 className="event-title">Tech Conference</h4>
                  <p className="event-date">Date: 2024-10-20</p>
                  <p className="event-description">
                    A conference for technology enthusiasts, covering the latest trends and innovations in the tech world.
                  </p>
                </div>
              </li>
            </ul>
          </section>
          <div className="action-btns">
            <button className="submit-btn" onClick={() => setCurrentView("eventForm")}>
              Host a New Event
            </button>
          </div>
        </>
      )}

      {currentView === "eventForm" && (
        <>
          <h1>Host a New Event</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Event created successfully!");
              setCurrentView("dashboard");
            }}
          >
            <div className="form-group">
              <label htmlFor="event-name">Event Name:</label>
              <input type="text" id="event-name" name="event-name" required />
            </div>

            <div className="form-group">
              <label htmlFor="event-category">Event Category:</label>
              <select id="event-category" name="event-category" required>
                <option value="">Select Category</option>
                <option value="workshop">Workshop</option>
                <option value="conference">Conference</option>
                <option value="webinar">Webinar</option>
                <option value="seminar">Seminar</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="event-description">Event Description:</label>
              <textarea id="event-description" name="event-description" rows="4" required></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="event-date">Event Date:</label>
              <input type="date" id="event-date" name="event-date" required />
            </div>

            <div className="form-group">
              <label htmlFor="registration-start">Registration Start Date:</label>
              <input type="date" id="registration-start" name="registration-start" required />
            </div>

            <div className="form-group">
              <label htmlFor="registration-end">Registration End Date:</label>
              <input type="date" id="registration-end" name="registration-end" required />
            </div>

            <div className="form-group">
              <label htmlFor="event-capacity">Event Capacity:</label>
              <input type="number" id="event-capacity" name="event-capacity" required />
            </div>

            <div className="form-group">
              <label htmlFor="ticket-price">Ticket Pricing (INR):</label>
              <input type="number" id="ticket-price" name="ticket-price" required />
            </div>

            <div className="form-group">
              <button type="submit" className="submit-btn">Submit Event</button>
            </div>
          </form>
          <button className="back-btn" onClick={() => setCurrentView("dashboard")}>
            Back to Dashboard
          </button>
        </>
      )}
    </div>
  );
}

export default Creation;
