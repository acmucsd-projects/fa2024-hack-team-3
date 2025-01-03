import React, { useState, useEffect} from 'react'
import { Box, Button, Input, SimpleGrid, Stack, GridItem} from '@chakra-ui/react'
import axios from 'axios';
// import "../styles/HomePage.css"
import Header from '../home_components/Header';
import PostsSection from '../home_components/PostsSection';
import CoursesSection from '../home_components/CoursesSection';
import OnlineBuddies from '../home_components/OnlineBuddies';
import MakePostButton from '../home_components/MakePostButton';
import { Link as RouterLink } from 'react-router-dom';
import Logout from '../home_components/Logout';
import { ColorModeProvider } from "../components/ui/color-mode" //dark mode
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import system  from '../theme'
import Sidebar from '../account_settings_components/Sidebar';


const HomePage = () => {
  // State to store the posts
  const [posts, setPosts] = useState([]);
  
  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      // console.log(response.data)
      setPosts(response.data); // set posts in state
    })
    .catch(error => {
      console.error("There was an error fetching the posts:", error);
    });
  }, []); //empty dependency array to run only once on mount

  const courses = ["CSE 11", "COGS 9", "HIUS 112"];
  const buddies = [
    { profilePicture: "/assets/aacount-icon.svg" },
    { profilePicture: "/assets/aacount-icon.svg" },
  ];

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
      
    <Box p={4} minW="100vh" mx="auto">
      <Header 
        setPosts={setPosts}
        courses={courses}
      />

      {/* Responsive two-column layout */}
      <SimpleGrid columns={{ base: 1, md: 12 }} spacing={6} mt={4}>
      
      {/* Sidebar: Courses, Online Buddies, Make Post Button */}
        <GridItem colSpan={{ base: 1 , md: 2}}>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={{ base: 1 }}></GridItem>

        {/* Main Content: Posts Section */}
        <GridItem colSpan={{ md: 7 }}>
          <Box>
            <PostsSection posts={posts} setPosts={setPosts}/>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
    </ColorModeProvider>
    </ChakraProvider>
  )
}


export default HomePage


