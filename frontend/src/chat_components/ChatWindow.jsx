import React, { useState } from "react";
import Message from "./Message";
import "../styles/ChatWindow.css";

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      text: "Hey! Are you working on the project for the biology class?",
      sender: "other",
    },
    { text: "Yes, I am. Do you need any help?", sender: "self" },
    { text: "That would be great! Can we meet tomorrow?", sender: "other" },
  ]);

  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "self" }]);
      setInput("");
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
