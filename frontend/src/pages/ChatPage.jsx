import React, {useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import "../styles/ChatPage.css";
import "../styles/HomePage.css";

import ChatProvider from '../../Context/ChatProvider';
import {useNavigate} from "react-router";
import { ChatState } from '../../Context/ChatProvider';
import SideDrawer from "../chat_components/miscellaneous/SideDrawer";
import MyChats from "../chat_components/MyChats";
import ChatBox from "../chat_components/ChatBox";
import { Box } from "@chakra-ui/react";


const ChatPage = () => {
  // const navigate = useNavigate();
  // localStorage.setItem("userInfo", JSON.stringify({ name: "Leon Chen" }));

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");

  //   if(userInfo){navigate("/chat");}
  // }, [navigate]);

  const user = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);


  return (
    
    <>
    <header />
        {/* <Sidebar /> */}
  
      {/* <Link to={"/"}>
          <h1 style={{color: "black"}}>back to home</h1>
      </Link> */}
         <div style = {{width: "100%"}}>
            {/* Render the SideDrawer only if user is defined */}
            {user && <SideDrawer />}
            
            <Box display="flex"
                //  flexDirection="row"
                 justifyContent="space-between"
                //  alignItems="stretch"
                 width="100%"
                 height="91.5vh"
                 padding="10px">
                {/* Render MyChats component if user exists */}

                {user && <MyChats w="30%" h="100%" fetchAgain={fetchAgain}/> }
                {/* Render ChatBox component if user exists */}
                {user && <ChatBox w="70%" h="100%" fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>
        </div>
    </>
    
  )
}

export default ChatPage