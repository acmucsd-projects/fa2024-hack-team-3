import React from "react";
import "../styles/Message.css";

function Message({ text, sender }) {
  return (
    <div className={`message ${sender === "self" ? "self" : "other"}`}>
      <p>{text}</p>
    </div>
  );
}

export default Message;
