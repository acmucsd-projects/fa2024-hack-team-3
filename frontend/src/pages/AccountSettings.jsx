//account settings page
import React from "react";
import { Flex, Text, Button} from "@chakra-ui/react";
import Sidebar from "../account_settings_components/Sidebar";
import AccountHeader from "../account_settings_components/AccountHeader";
import PasswordForm from "../account_settings_components/PasswordForm";
import CoursesSection from "../account_settings_components/CoursesSection";
import Header from "../home_components/Header";

const AccountSettings = () => {
  return (
    <>
      <Header />
      <Flex direction="row" h="90vh" p={4} bg="gray.50">
          <Sidebar />
          <Flex direction="column" px="50vh" alignItems="center">
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
      </Flex>
    </>
  );
};

export default AccountSettings;
