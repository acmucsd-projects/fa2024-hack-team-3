import React, { useState, createContext, useContext, useEffect } from "react";

import "../src/styles/ChatProvider.css"
import {useNavigate} from "react-router";




export const ChatContext = createContext();


export const ChatProvider= ({children}) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  
  // console.log(children);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("authUserId");
    if (token && userId) {
      setUser({
          token,
          _id: userId,
      });
  }
  }, [navigate]);
  

   return (
    //  <ChatContext.Provider value = {{user, setUser}}>
    //     {children}
    //  </ChatContext.Provider>
    <ChatContext.Provider 
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
   );
};


export const ChatState = () => {
  const context = useContext(ChatContext);  // store ontext
  if (!context) {
    throw new Error("ChatState must be used within a ChatProvider");
  }
  return context;
};

export default ChatProvider;
