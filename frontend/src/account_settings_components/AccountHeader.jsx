import React from "react";
import { Flex, VStack, Input, Container, Text } from "@chakra-ui/react";
import { Avatar} from "../components/ui/avatar"

const AccountHeader = () => {
  return (
    <Flex
      direction="row"
      justify="center" // Centers horizontally
      h="10vh" // Full screen height
    >
        <Avatar size="2xl" mb={4} />
        <VStack align="center" ml={6}> {/* Adds spacing between Avatar and the inputs */}
            <Text fontSize="lg" fontWeight="bold">
                Username
            </Text>
            <Input placeholder="Insert username" w="200px" /> {/* Adjust width as needed */}
        </VStack>
    </Flex>
  );
};

export default AccountHeader;
