//account settings page
import React, {useState, useEffect} from "react";
import { Flex, Text, Box, SimpleGrid, GridItem, Heading} from "@chakra-ui/react";
import Sidebar from "../account_settings_components/Sidebar";
import AccountHeader from "../account_settings_components/AccountHeader";
import PasswordForm from "../account_settings_components/PasswordForm";
import CoursesSection from "../account_settings_components/CoursesSection";
import Header from "../home_components/Header";
import { ColorModeProvider } from "../components/ui/color-mode" //dark mode
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import system  from '../theme'
import axios from "axios";

const AccountSettings = () => {

  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    axios.get('https://localhost:5000/api/posts')
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
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Preload the selected courses using the logged-in user's data
        const preloadedCourses = response.data.courses.map((course) => course.name);
        setCourses(preloadedCourses); // Update courses with the response
        setSelectedCourses(preloadedCourses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        // setError("Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, []);

 
  return (
    <ChakraProvider value={system}>
    <ColorModeProvider>
    <Box p={4} minW="100vh"  mx="auto">
      <Header 
        setPosts={setPosts}
        courses={courses}
      />
      <SimpleGrid columns={{ base: 1, md: 12 }} spacing={6} mt={4}>
        <GridItem colSpan={{ base: 1 , md: 2}}>
          <Sidebar 
            posts={posts} 
            setPosts={setPosts} 
            courses={courses}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}/>
        </GridItem>
        <GridItem colSpan={{ base: 1 }}></GridItem>

        <GridItem colSpan={{ md: 7}}>
          <Box bg="bg.subtle" rounded={"md"} p={4} maxW="93vw">
          <Heading size="lg" mb={4}>SETTINGS</Heading>
            <Flex direction="column" alignItems="center">
            <AccountHeader />
            <Text fontSize="lg" fontWeight="bold" marginTop="5" mb={4}>
                Account Information
            </Text>
            <Flex direction="row">
              <PasswordForm />
              <CoursesSection />
            </Flex>
          </Flex>
          </Box>
        </GridItem>

          {/* <Flex direction="column" px="50vh" alignItems="center">
            <AccountHeader px="5vh"/>
            <Text fontSize="lg" fontWeight="bold" marginTop="5">
                Account Information
            </Text>
            <Flex direction="row">
              <PasswordForm />
              <CoursesSection />
            </Flex>
            <Button px="10vh">Save</Button>
          </Flex> */}
      </SimpleGrid>
    </Box>
    </ColorModeProvider>
    </ChakraProvider>
  );
};

export default AccountSettings; 
