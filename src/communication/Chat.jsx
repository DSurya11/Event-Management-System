import { useEffect, useState } from "react";
import socket from "./socket";
import "./Chat.css";

function Chat({ role }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Connected socket:", socket.id);
      socket.emit("joinRoom", role);
    };

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("connect", handleConnect);
    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receiveMessage", handleReceive);
    };
  }, [role]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = { text: input, sender: role };
    socket.emit("sendMessage", newMessage);

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>Live Chat ({role})</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender === role ? "You" : msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
