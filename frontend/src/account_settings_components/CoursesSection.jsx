import React, { useEffect, useState } from "react";
import { VStack, Container, Input, Flex, Text, IconButton, Button } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const CoursesSection = () => {

  const [courses, setCourses] = useState([]); // Stores the courses from the backend
  const [newCourse, setNewCourse] = useState(""); // Stores the new course to be added 
  const [error, setError] = useState(""); // Stores error messages
  const [success, setSuccess] = useState(""); // Stores success messages

  // Fetch the user's courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data.courses); // Update courses with the response
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, []);

  // Handle adding a new course
  const handleAddCourse = async () => {
    setError("");
    setSuccess("");

    if (!newCourse.trim()) {
      setError("Please provide a course name.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        "http://localhost:5000/api/users/me/courses",
        { courses: [{ name: newCourse}], remove: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCourses(response.data.courses); // Update courses with the response
      setNewCourse(""); // Clear the input field
      setSuccess("Course added successfully!");
    } catch (err) {
      console.error("Failed to add course:", err);
      setError("Failed to add course.");
    }
  };

  // Handle removing a course
  const handleRemoveCourse = async (courseName) => {
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        "http://localhost:5000/api/users/me/courses",
        { courses: [{ name: courseName }], remove: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCourses(response.data.courses); // Update courses with the response
      setSuccess("Course removed successfully!");
    } catch (err) {
      console.error("Failed to remove course:", err);
      setError("Failed to remove course.");
    }
  };


  return (
    <VStack spacing={4} align="start" flex="1">
      <Text fontSize="lg" fontWeight="bold">
        Courses
      </Text>
      <Container>
        <Input 
          placeholder="Course to Add" 
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <Button 
          mt={2} 
          onClick={handleAddCourse}
          _hover={{ bg: "blue.600"}}
        >
          Add Course
        </Button>
      </Container>

      {error && <Text color="red.500" px={"5vh"}>{error}</Text>}
      {success && <Text color="green.500" px={"5vh"}>{success}</Text>}
      
      <VStack align="start" spacing={2}>
        {courses.map((course) => (
          <Flex key={course._id} justify="space-between" w="100%">
            <Text px="5vh">{course.name}</Text>
            <IconButton
              onClick={() => handleRemoveCourse(course.name)}
              variant="solid"
              size="xs"
              aria-label="Remove course"
              rounded="full"
              _hover={{
                bg: "red.500",
                color: "white",
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
