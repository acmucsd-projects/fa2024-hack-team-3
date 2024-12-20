//account settings page
import React, {useState} from "react";
import { Flex, Text, Button, Box, SimpleGrid, GridItem} from "@chakra-ui/react";
import Sidebar from "../account_settings_components/Sidebar";
import AccountHeader from "../account_settings_components/AccountHeader";
import PasswordForm from "../account_settings_components/PasswordForm";
import CoursesSection from "../account_settings_components/CoursesSection";
import Header from "../home_components/Header";
import { ColorModeProvider } from "../components/ui/color-mode" //dark mode
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import system  from '../theme'

const AccountSettings = () => {
  const [posts, setPosts] = useState([]);
  const courses = ["CSE 11", "COGS 9", "HIUS 112"];
  return (
    // <ChakraProvider value={system}>
    //   <ColorModeProvider>
    <Box p={4} minW="100vh" mx="auto">
      <Header 
        setPosts={setPosts}
        courses={courses}
      />
      <SimpleGrid columns={{ base: 1, md: 12 }} spacing={6} mt={4}>
        <GridItem colSpan={{ base: 1 , md: 3}}>
          <Sidebar />
        </GridItem>

        <GridItem colSpan={{ md: 7}}>
          <Box>
            <Flex direction="column" alignItems="center">
            <AccountHeader px="5vh"/>
            <Text fontSize="lg" fontWeight="bold" marginTop="5">
                Account Information
            </Text>
            <Flex direction="row">
              <PasswordForm />
              <CoursesSection />
            </Flex>
            <Button px="10vh">Save</Button>
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
    // </ColorModeProvider>
    // </ChakraProvider>
  );
};

export default AccountSettings; 
