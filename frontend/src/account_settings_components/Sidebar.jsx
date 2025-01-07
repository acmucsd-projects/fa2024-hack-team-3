import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Flex, HStack, Collapsible} from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { Checkbox } from "../components/ui/checkbox";
import { Link, useLocation } from "react-router-dom";
import { HiMiniListBullet } from "react-icons/hi2";
import { FiFilter } from "react-icons/fi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";
import MakePostButton from "../home_components/MakePostButton";
import axios from "axios";
import { useColorMode } from "../components/ui/color-mode";

const Sidebar = ({ courses, selectedCourses, setSelectedCourses, setPosts }) => {
  // const [posts, setPosts] = useState([]); // State for posts
  // const [courses, setCourses] = useState(["All Posts"]); // State for courses

  const { colorMode } = useColorMode();

  const handleCheckboxChange = (course) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(course)
        ? prevSelected.filter((c) => c !== course) // Remove course
        : [...prevSelected, course] // Add course
    );
  };

  const location = useLocation(); // Get the current route path

  // Fetch courses from the backend when the component mounts
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const token = localStorage.getItem("authToken");
  //       const response = await axios.get("http://localhost:5000/api/users/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
        
  //       // Preload the selected courses using the logged-in user's data
  //       const preloadedCourses = response.data.courses.map((course) => course.name);
  //       setCourses(preloadedCourses); // Update courses with the response
  //     } catch (err) {
  //       console.error("Failed to fetch courses:", err);
  //       setError("Failed to fetch courses.");
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  // Fetch posts from the backend when the component mounts
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/posts")
  //     .then((response) => {
  //       setPosts(response.data); // Update posts state
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the posts:", error);
  //     });
  // }, []); // Empty dependency array ensures this runs only once

  // const getHighlightStyle = (path) => ({
  //   backgroundColor: location.pathname === path ? "#d9e2e8" : "transparent",
  //   color: location.pathname === path ? "#033f63" : "bg.text",
  //   fontWeight: location.pathname === path ? "bold" : "normal",
  //   borderRadius: "md",
  //   padding: "10px 16px", // Inner padding for the links
  //   textAlign: "left",
  //   display: "block",
  //   position: "relative", // Needed for the dark bar positioning
  //   borderLeft: location.pathname === path ? "4px solid #033f63" : "4px solid transparent", // Add the dark left bar
  // });

  const getHighlightStyle = (path) => ({
    backgroundColor: location.pathname === path
      ? colorMode === "light"
        ? "#d9e2e8" // Light mode highlight
        : "#2D3748" // Dark mode highlight
      : "transparent",
    color: location.pathname === path
      ? colorMode === "light"
        ? "#033f63" // Light mode text color
        : "#CBD5E0" // Dark mode text color
      : "bg.text",
    fontWeight: location.pathname === path ? "bold" : "normal",
    borderRadius: "md",
    padding: "10px 16px", // Inner padding for the links
    textAlign: "left",
    display: "block",
    position: "relative", // Needed for the dark bar positioning
    borderLeft: location.pathname === path
      ? `4px solid ${colorMode === "light" ? "#033f63" : "#63B3ED"}` // Dark bar color based on mode
      : "4px solid transparent", // No border when not active
  });

  // Dynamic icon color based on color mode
  const iconColor = colorMode === "light" ? "#093a80" : "#A0AEC0"; // Darker in light mode, lighter in dark mode

  return (
    <Box
      bg="bg.subtle" // Sidebar background color
      boxShadow="xs"
      borderRadius="md"
      position="sticky"
      top={4}
      // h="calc(100vh - 32px)" // Makes the sidebar height match the viewport
      paddingBottom={2} // Adds padding inside the sidebar
    >
      <VStack align="stretch" spacing={4} w="100%">
        {/* Menu Section */}
        <Box>
          {/* <Text fontSize="lg" fontWeight="bold" mb={2} px={4} paddingTop={3}>
            Menu
          </Text> */}
          <VStack align="stretch" spacing={1} paddingTop={4}>
            <Box as="div" style={getHighlightStyle("/")}>
              <Link to="/">
              <HStack w={"100%"}><HiMiniListBullet size={20} color={iconColor}/>Posts</HStack></Link>
            </Box>
            <Box as="div" style={getHighlightStyle("/filter")}>
            <Collapsible.Root>
              <Collapsible.Trigger>
                <HStack paddingBottom={2} _hover={{cursor: "pointer"}}><FiFilter size={20} color={iconColor}/>Filter</HStack>
              </Collapsible.Trigger>
              <Collapsible.Content>
              <VStack align="flex-start">

                {courses.map((course) => (
                  <Checkbox
                    variant="subtle"
                    colorPalette="blue"
                    key={course}
                    isChecked={selectedCourses.includes(course)}
                    onChange={() => handleCheckboxChange(course)}
                  >
                    {course}
                  </Checkbox>
                ))}
              </VStack>
              </Collapsible.Content>
              </Collapsible.Root>
            </Box>

          </VStack>
        </Box>

        {/* Personal Navigator */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2} px={4}>
            Personal Navigator
          </Text>
          <VStack align="stretch" spacing={1}>
            <Box as="div" style={getHighlightStyle("/profile")}>
              <Link to="/profile">
              <HStack ml={-0.5}><CgProfile size={22} color={iconColor}/>My Profile</HStack>
              </Link>
            </Box>
            <Box as="div" style={getHighlightStyle("/chat")}>
              <Link
                to="/chat"
                _hover={{cursor: "disabled"}}>
                <HStack><RiQuestionAnswerLine size={20} color={iconColor}/>My Chats</HStack>
              </Link>
            </Box>
            <Box as="div" style={getHighlightStyle("/settings")}>
              <Link to="/settings">
                <HStack ml={-0.2}><LuSettings size={20} color={iconColor}/>Settings</HStack>
              </Link>
            </Box>
          </VStack>
        </Box>

        <Box ml={-1} mb={2}>
              <Flex justify={"center"}>
                <MakePostButton setPosts={setPosts} courses={courses.slice(1)} />
              </Flex>
            </Box>

        {/* Online Buddies Section */}
        {/* <Box>
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
        </Box> */}
      </VStack>
    </Box>
  );
};

export default Sidebar;
