import React, { useState, createContext, useContext, useEffect } from "react";

import "../src/styles/ChatProvider.css"
import {useNavigate} from "react-router";

// function ChatWindow() {
//   const [messages, setMessages] = useState([
//     {
//       text: "Hey! Are you working on the project for the biology class?",
//       sender: "other",
//     },
//     { text: "Yes, I am. Do you need any help?", sender: "self" },
//     { text: "That would be great! Can we meet tomorrow?", sender: "other" },
//   ]);

//   const [input, setInput] = useState("");

//   const handleSendMessage = () => {
//     if (input.trim()) {
//       setMessages([...messages, { text: input, sender: "self" }]);
//       setInput("");
//     }
//   };

//   return (
//     <div className="chat-window">
//       <div className="messages">
//         {messages.map((message, index) => (
//           <Message key={index} text={message.text} sender={message.sender} />
//         ))}
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }



export const ChatContext = createContext();


export const ChatProvider= ({children}) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  
  // console.log(children);
  const navigate = useNavigate();
  // localStorage.setItem("userInfo", JSON.stringify({ name: "Leon Chen" }));

  useEffect(() => {
  //     const userInfo = localStorage.getItem("userInfo");
  //     setUser(userInfo);

  //     if(!userInfo){
  //       navigate("/");
  //     }
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
