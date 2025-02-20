import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
// import "../styles/ChatPage.css";
// import "../styles/HomePage.css";

import ChatProvider from '../../Context/ChatProvider';
import {useNavigate} from "react-router";
import { ChatState } from '../../Context/ChatProvider';
import SideDrawer from "../chat_components/miscellaneous/SideDrawer";
import MyChats from "../chat_components/MyChats";
import ChatBox from "../chat_components/ChatBox";
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react';
import system from '../theme';
import Header from '../home_components/Header';
import { set } from 'date-fns';


const ChatPage = () => {
 

  const user = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  
  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    axios.get('https://fa2024-hack-team-3-bwgb.onrender.com/api/posts')
    .then(response => {
      // console.log(response.data)
      setPosts(response.data); // set posts in state
    })
    .catch(error => {
      console.error("There was an error fetching the posts:", error);
    });
  }, []); //empty dependency array to run only once on mount

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // const token = localStorage.getItem("authToken");
        const response = await axios.get("https://fa2024-hack-team-3-bwgb.onrender.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        
        // Preload the selected courses using the logged-in user's data
        const preloadedCourses = response.data.courses.map((course) => course.name);
        setCourses(preloadedCourses); // Update courses with the response
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    
    <ChakraProvider value={system}>
    <Box p={4} maxW="100vw" mx="auto">
    <Header setPosts={setPosts} courses={courses}/>
    <header />

         <div style = {{width: "100%"}}>
            {/* Render the SideDrawer only if user is defined */}         
            {user && <SideDrawer />}
            
            <Box display="flex"
                //  flexDirection="row"
                 justifyContent="space-between"
                //  alignItems="stretch"
                 width="100%"
                //  height="91.5vh"
                 height="83vh"
                 padding="10px">
                {/* Render MyChats component if user exists */}

                {user && <MyChats w="30%" h="100%" fetchAgain={fetchAgain}/> }
                {/* Render ChatBox component if user exists */}
                {user && <ChatBox w="70%" h="100%" fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>
        </div>
    </Box>
    </ChakraProvider>
    
  )
}

export default ChatPage;