import React from "react";
import { Box, Text, Stack, Separator, VStack, Flex} from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "../components/ui/avatar"

const Sidebar = () => {
  return (
    <Box bg="bg.muted" boxShadow="sm" p={4} borderRadius="md" h={{md: "90vh"}}>
      <Stack spacing={4}>
        <Text fontSize="lg" fontWeight="bold"> Menu</Text>
        <Text cursor="pointer">Posts</Text>
        <Text cursor="pointer">Filter</Text>
        <Separator />
        <Text fontSize="lg" fontWeight="bold">
          Personal Navigator
        </Text>
        <Text cursor="pointer">Your Posts</Text>
        <Text cursor="pointer">Your Chats</Text>
        <Separator />
        <Text fontSize="lg" fontWeight="bold">
          Online Buddies
        </Text>
        <VStack align="start">
          {["Name", "Name", "Name"].map((name, index) => (
            <Flex key={index} align="center" gap={2}>
              <Avatar size="sm" />
              <Text>{name}</Text>
            </Flex>
          ))}
        </VStack> 
      </Stack>
    </Box>
  );
};

export default Sidebar;