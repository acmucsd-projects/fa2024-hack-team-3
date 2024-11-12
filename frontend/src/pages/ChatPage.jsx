import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/ChatPage.css";
import Sidebar from '../chat_components/Sidebar';
import ChatWindow from '../chat_components/ChatWindow';

const ChatPage = () => {
  return (
    <>
      <div className='chat-page'>
        <Sidebar />
        <ChatWindow />
      </div>
      <Link to={"/"}>
          <h1 style={{color: "black"}}>back to home</h1>
      </Link>
    </>
  )
}

export default ChatPage