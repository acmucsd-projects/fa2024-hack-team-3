import React from "react";
import { VStack, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

const AccountForm = () => {
  return (
    <VStack spacing={4} align="start" flex="1">
      <Text fontSize="lg" fontWeight="bold">
        Account Information
      </Text>
      <FormControl>
        <FormLabel>Change Password</FormLabel>
        <Input placeholder="Current Password" type="password" />
      </FormControl>
      <FormControl>
        <Input placeholder="New Password" type="password" />
      </FormControl>
      <FormControl>
        <Input placeholder="Retype New Password" type="password" />
      </FormControl>
    </VStack>
  );
};

export default AccountForm;
