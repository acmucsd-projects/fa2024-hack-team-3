import React from "react";
import { VStack, Container, Input, Text } from "@chakra-ui/react";

const PasswordForm = () => {
  return (
    <VStack spacing={4} align="start" flex="1">
      <Container>
        <Text fontSize="lg" fontWeight="bold">Change Password</Text>
        <Input placeholder="Current Password" type="password" maxW="100%"/>
      </Container>
      <Container>
        <Input placeholder="New Password" type="password" maxW="100%"/>
      </Container>
      <Container>
        <Input placeholder="Retype New Password" type="password" maxW="100%"/>
      </Container>
    </VStack>
  );
};

export default PasswordForm;
