import React, { useState, useEffect} from 'react'
import { Box, Button, Input, SimpleGrid, Stack } from '@chakra-ui/react'
import axios from 'axios';
import "../styles/HomePage.css"
import Header from '../home_components/Header';
import PostsSection from '../home_components/PostsSection';
import CoursesSection from '../home_components/CoursesSection';
import OnlineBuddies from '../home_components/OnlineBuddies';
import MakePostButton from '../home_components/MakePostButton';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  // State to store the posts
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
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
    <Box p={4} maxW="1200px" mx="auto">
      <Header />

      {/* Responsive two-column layout */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={4}>
      
      {/* Sidebar: Courses, Online Buddies, Make Post Button */}
        <Stack spacing={4}>
          <CoursesSection courses={courses} />
          <OnlineBuddies buddies={buddies} />
          <Button colorScheme="blue" onClick={() => navigateToCreatePostPage()}>
            Make a Post
          </Button>
        </Stack>

        {/* Main Content: Posts Section */}
        <Box gridColumn={{ md: 'span 2' }}>
          <PostsSection posts={posts} />
        </Box>
      </SimpleGrid>
      <RouterLink to={"/register"}>Create Your Study Buddy Account</RouterLink>
    </Box>
  )
}


export default HomePage


      // {/* Responsive two-column layout */}
      // <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={4}>
        
        
      //   {/* Sidebar: Courses, Online Buddies, Make Post Button */}
      //   <Stack spacing={4}>
      //     <CoursesSection courses={courses} />
      //     <OnlineBuddies buddies={buddies} />
      //     <Button colorScheme="blue" onClick={() => alert("Create a new post")}>
      //       Make a Post
      //     </Button>
      //   </Stack>

      //   {/* Posts Section */}
      //   <Box>
      //     <PostsSection posts={posts} />
      //   </Box>
        
      // </SimpleGrid>