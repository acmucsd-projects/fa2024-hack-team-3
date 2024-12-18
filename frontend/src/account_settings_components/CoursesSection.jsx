import React from "react";
import { VStack, Container, Input, Flex, Text, IconButton } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

const CoursesSection = () => {
  return (
    <VStack spacing={4} align="start" flex="1">
      <Text fontSize="lg" fontWeight="bold">
        Courses
      </Text>
      <Container>
        <Input placeholder="Add Course" />
      </Container>
      <VStack align="start" spacing={2}>
        {["Class 1", "Class 2", "Class 3", "Class 4"].map((course, index) => (
          <Flex key={index} justify="space-between" w="100%">
            <Text px="5vh">{course}</Text>
            <IconButton
              // icon={<span>&times;</span>}
              variant="solid"
              size="xs"
              aria-label="Remove course"
              w="5px"
              rounded="full"
              _hover={{
                bg: 'blue.900',
                color: 'white'
              }}
            >
              <AiOutlineClose />
            </IconButton>
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
};

export default CoursesSection;
