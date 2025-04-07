import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from './socket';

function Chat({ role }) {
  const { eventId, organizerId, attendeeId: attendeeParam } = useParams();
  const userId = localStorage.getItem("userId");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [eventName, setEventName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const initialSentRef = useRef(false);

  const attendeeId = role === "attendee" ? userId : attendeeParam;
  const organizerID = role === "organizer" ? userId : organizerId;

  // fetch event name
  useEffect(() => {
    if (!eventId) return;

    fetch(`http://localhost:3000/api/events/${eventId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.title) setEventName(data.title);
      })
      .catch(err => console.error("Error fetching event name:", err));
  }, [eventId]);

  // join socket room and get messages
  useEffect(() => {
    if (!eventId || !attendeeId || !organizerID) return;

    const roomInfo = {
      event_id: eventId,
      attendee_id: attendeeId,
      organizer_id: organizerID,
    };

    socket.connect();
    socket.emit("joinRoom", roomInfo);
    socket.emit("getMessages", roomInfo);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("loadMessages", (msgs) => {
      setMessages(msgs);
      setLoaded(true);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("loadMessages");
    };
  }, [eventId, attendeeId, organizerID]);

  // send default message only after eventName and messages are loaded
  useEffect(() => {
    if (
      loaded &&
      messages.length === 0 &&
      role === "attendee" &&
      eventName &&
      !initialSentRef.current
    ) {
      const defaultMsg = {
        event_id: eventId,
        sender_id: attendeeId,
        sender_role: "attendee",
        receiver_id: organizerID,
        receiver_role: "organizer",
        message: `I have a query regarding event ${eventName}`,
      };
      socket.emit("sendMessage", defaultMsg);
      initialSentRef.current = true;
    }
  }, [loaded, messages, eventName, role, attendeeId, organizerID, eventId]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const msg = {
      event_id: eventId,
      sender_id: userId,
      sender_role: role,
      receiver_id: role === "attendee" ? organizerID : attendeeId,
      receiver_role: role === "attendee" ? "organizer" : "attendee",
      message: input,
    };

    socket.emit("sendMessage", msg);
    setInput("");
  };

  if (!eventId || !attendeeId || !organizerID) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="Main">
      <h3>Chat Room</h3>
      <div
        className="chat-box"
        style={{
          border: '1px solid gray',
          padding: '10px',
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.sender_id == userId;
            const displayName = isMe
              ? "you"
              : msg.sender_name
                ? `${msg.sender_name} (${msg.sender_role})`
                : msg.sender_role;

            return (
              <div key={i}>
                <b>{displayName}:</b> {msg.message}
              </div>
            );
          })
        )}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
