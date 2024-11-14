import React from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  const contacts = [
    {
      name: "Alex Johnson",
      message: "Hey, are you free for a group study session?",
    },
    { name: "Emily Clark", message: "Got the notes from yesterday's lecture?" },
    { name: "Michael Smith", message: "Are you ready for the upcoming exam?" },
  ];

  return (
    <div className="sidebar">
      <h2>Study Buddy</h2>
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <div key={index} className="contact">
            <h4>{contact.name}</h4>
            <p>{contact.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;