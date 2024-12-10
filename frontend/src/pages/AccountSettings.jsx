//account settings page
import React from "react";
import { Flex} from "@chakra-ui/react";
import Sidebar from "../account_settings_components/Sidebar";
import AccountHeader from "../account_settings_components/AccountHeader";
//import AccountForm from "../account_settings_components/AccountForm";
//import CoursesSection from "../account_settings_components/CoursesSection";
//import LogoutButton from "../account_settings_components/LogoutButton";

const AccountSettings = () => {
  return (
    <Flex direction="row" h="100vh" p={4} bg="gray.50">
        <Sidebar />
        <AccountHeader />
    </Flex>
  );
};

export default AccountSettings;
