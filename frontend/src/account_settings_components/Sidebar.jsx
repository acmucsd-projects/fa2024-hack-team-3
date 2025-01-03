import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import MakePostButton from "../home_components/MakePostButton";
import axios from "axios";

const Sidebar = () => {
  const [posts, setPosts] = useState([]); // State for posts
  const courses = ["CSE 11", "COGS 9", "HIUS 112"]; // Example courses
  const location = useLocation(); // Get the current route path

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => {
        setPosts(response.data); // Update posts state
      })
      .catch((error) => {
        console.error("There was an error fetching the posts:", error);
      });
  }, []); // Empty dependency array ensures this runs only once

  const getHighlightStyle = (path) => ({
    backgroundColor: location.pathname === path ? "#d9e2e8" : "transparent",
    color: location.pathname === path ? "#033f63" : "bg.text",
    fontWeight: location.pathname === path ? "bold" : "normal",
    borderRadius: "md",
    padding: "10px 16px", // Inner padding for the links
    textAlign: "left",
    display: "block",
    position: "relative", // Needed for the dark bar positioning
    borderLeft: location.pathname === path ? "4px solid #033f63" : "4px solid transparent", // Add the dark left bar
  });

  return (
    <Box
      bg="bg.subtle" // Sidebar background color
      boxShadow="md"
      borderRadius="md"
      position="sticky"
      top={4}
      h="calc(100vh - 32px)" // Makes the sidebar height match the viewport
      p={0} // Adds padding inside the sidebar
    >
      <VStack align="stretch" spacing={4} w="100%">
        {/* Menu Section */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2} px={2} paddingTop={3}>
            Menu
          </Text>
          <VStack align="stretch" spacing={1}>
            {/* Add Post Button */}
            <Box px={2}>
              <MakePostButton setPosts={setPosts} courses={courses} />
            </Box>
            <Box as="div" style={getHighlightStyle("/")}>
              <Link to="/">Posts</Link>
            </Box>
            <Box as="div" style={getHighlightStyle("/filter")}>
              <Link to="/filter">Filter</Link>
            </Box>
          </VStack>
        </Box>

        {/* Personal Navigator */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2} px={2}>
            Personal Navigator
          </Text>
          <VStack align="stretch" spacing={1}>
            <Box as="div" style={getHighlightStyle("/your-posts")}>
              <Link to="/your-posts">Your Posts</Link>
            </Box>
            <Box as="div" style={getHighlightStyle("/your-chats")}>
              <Link to="/your-chats">Your Chats</Link>
            </Box>
          </VStack>
        </Box>

        {/* Online Buddies Section */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2} px={2}>
            Online Buddies
          </Text>
          <VStack align="start" spacing={3} px={2}>
            {["Name", "Name", "Name"].map((name, index) => (
              <Flex key={index} align="center" gap={2}>
                <Avatar size="sm" />
                <Text>{name}</Text>
              </Flex>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
