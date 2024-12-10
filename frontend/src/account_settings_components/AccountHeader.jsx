import React from "react";
import { Flex, Avatar, FormControl, FormLabel, Input } from "@chakra-ui/react";

const AccountHeader = () => {
  return (
    <Flex direction="column" align="center" mb={8}>
      <Avatar size="2xl" mb={4} />
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Insert username" />
      </FormControl>
    </Flex>
  );
};

export default AccountHeader;
