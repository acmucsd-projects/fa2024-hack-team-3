import React, { useEffect, useState } from "react";
import { VStack, Container, Input, Flex, Text, IconButton, Button } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import coursesOptions from "../data/courses.json";
import Select from "react-select";

const CoursesSection = () => {

  // const [courses, setCourses] = useState([]); // Stores the courses from the backend
  // const [newCourse, setNewCourse] = useState(""); // Stores the new course to be added 
  const [selectedCourses, setSelectedCourses] = useState([]); // Stores the selected courses
  const [originalCourses, setOriginalCourses] = useState([]); // Stores the original courses
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
        
        // Preload the selected courses using the logged-in user's data
        const preloadedCourses = response.data.courses.map((course) => ({
          value: course.name,
          label: course.name,
        }));
        setSelectedCourses(preloadedCourses); // Update courses with the response
        setOriginalCourses(preloadedCourses); // Keep copy of original courses
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, []);

  // Handle changes to the Select component
  const handleCourseChange = (selectedOptions) => {
    setSelectedCourses(selectedOptions.map((option) => ({ value: option.value }))); // Update selected courses
  };

  // Save changes (update the user's courses in the backend)
  const handleSaveChanges = async () => {
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("authToken");

      // Prepare courses to add and remove
      const selectedCourseNames = selectedCourses.map((course) => course.value);
      const originalCourseNames = originalCourses.map((course) => course.value);
      
      // Determine courses to remove and add
      const coursesToAdd = selectedCourseNames.filter(
        (course) => !originalCourseNames.includes(course)
      );
      const coursesToRemove = originalCourseNames.filter(
        (course) => !selectedCourseNames.includes(course)
      );

      // Handle additions
      if (coursesToAdd.length > 0) {
        await axios.patch(
          "http://localhost:5000/api/users/me/courses",
          { courses: coursesToAdd.map((name) => ({ name })), remove: false },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Handle removals
      if (coursesToRemove.length > 0) {
        await axios.patch(
          "http://localhost:5000/api/users/me/courses",
          { courses: coursesToRemove.map((name) => ({ name })), remove: true },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setOriginalCourses(selectedCourses); // Update original courses
      setSuccess("Courses updated successfully!");
    } catch (err) {
      console.error("Failed to update courses:", err);
      setError("Failed to update courses.");
    }
  };

  return (
    <VStack spacing={4} align="start" flex="1">
      <Text fontSize="lg" fontWeight="bold">
        Courses
      </Text>
  
      {/* Select Component for Managing Courses */}
      <Container>
        <Select
          options={coursesOptions}
          value={selectedCourses.map((course) => ({
            value: course.value,
            label: course.value, // Rebuild the label for display
          }))}
          onChange={handleCourseChange}
          isMulti
          closeMenuOnSelect={false}
          placeholder="Select courses..."
          styles={{
            container: (base) => ({ ...base, width: "100%" }),
            menu: (base) => ({ ...base, maxHeight: "200px", overflowY: "auto" }),
          }}
        />
        <Button
          mt={4}
          onClick={handleSaveChanges}
          _hover={{ bg: "blue.600" }}
        >
          Save Changes
        </Button>
      </Container>
      { error && <Text color="red.500">{error}</Text>}
      { success && <Text color="green.500">{success}</Text>}
    </VStack>
  );
};

export default CoursesSection;
