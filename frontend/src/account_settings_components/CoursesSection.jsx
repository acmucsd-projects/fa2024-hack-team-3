import React from "react";
import { VStack, FormControl, Input, Flex, Text, IconButton } from "@chakra-ui/react";

const CoursesSection = () => {
  return (
    <VStack spacing={4} align="start" flex="1">
      <Text fontSize="lg" fontWeight="bold">
        Courses
      </Text>
      <FormControl>
        <Input placeholder="Add Course" />
      </FormControl>
      <VStack align="start" spacing={2}>
        {["Class 1", "Class 2", "Class 3", "Class 4"].map((course, index) => (
          <Flex key={index} justify="space-between" w="100%">
            <Text>{course}</Text>
            <IconButton
              icon={<span>&times;</span>}
              variant="ghost"
              size="sm"
              aria-label="Remove course"
            />
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
};

export default CoursesSection;
