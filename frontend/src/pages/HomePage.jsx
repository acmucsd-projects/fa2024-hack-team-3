import React from 'react'
import { Box, Button, Flex, SimpleGrid, Stack, Text, Avatar, Link } from '@chakra-ui/react'
import "../styles/HomePage.css"
import Header from '../home_components/Header';
import PostsSection from '../home_components/PostsSection';
import CoursesSection from '../home_components/CoursesSection';
import OnlineBuddies from '../home_components/OnlineBuddies';
import MakePostButton from '../home_components/MakePostButton';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {

  const posts = [{
      title: "Midterm Review at Geisel",
      description: "Looking for a study buddy...",
      tags: ["Test Review", "In Person"],
      user: "Mandy Liu CO2028",
    },
    {
      title: "Lorem Ipsum",
      description: "Looking for a study buddy...",
      tags: ["Test Review", "In Person"],
      user: "Mandy Liu CO2028",
    },
    {
      title: "Midterm Review at Geisel",
      description: "Looking for a study buddy...",
      tags: ["Test Review", "In Person"],
      user: "Mandy Liu CO2028",
    }
    // Add more posts
  ];

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
          <Button colorScheme="blue" onClick={() => alert("Create a new post")}>
            Make a Post
          </Button>
        </Stack>

        {/* Main Content: Posts Section */}
        <Box gridColumn={{ md: 'span 2' }}>
          <PostsSection posts={posts} />
        </Box>
      </SimpleGrid>
      <RouterLink to={"/register"}>register page</RouterLink>
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