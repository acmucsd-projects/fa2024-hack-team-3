import React, { useState } from 'react';
import { Box, Button, Input, Textarea, createListCollection, HStack, Select} from '@chakra-ui/react';
import { Tag } from "../components/ui/tag"
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select"
import axios from 'axios';

const MakePostButton = ({ setPosts, courses }) => {

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("") // Track selected option

  const userId = localStorage.getItem("authUserId");

  const predefinedTags = [
    "Group Study", "One-on-One", "Online", "In-Person",
    "Study Over Coffee", "Study in Library", "Study at Home",  "Morning Study",
    "Afternoon Study", "Evening Study", "Late Night Study", "Weekend Study",
    "Exam Prep", "Homework Help", "Research Paper Writing", "Project Collaboration",
    "Study for Quizzes", "Assignment Help", "Discussion & Debates", "Quiet Space",
    "Music-Friendly", "Coffee Shop", "Library", "Outdoors", "Co-Working Space", "At-Home Study"
  ].map(String);

  const options = createListCollection({
    items: courses.map(course => ({ label: course, value: course })), // Line 18
  });
  // Handle adding custom tags
  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      addTag(tagInput.trim());
      setTagInput('');
    }
  };

  // Add a tag to the list if it doesn't already exist
  const addTag = (newTag) => {
    if (!tags.includes(newTag)) {
      setTags((prevTags) => [...prevTags, newTag]);
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };
  
  const handleCreatePost = async () => {
    // console.log(tags);
    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        title,
        description,
        tags,
        userId,
      });

      // Update the posts in HomePage
      setPosts((prevPosts) => [response.data, ...prevPosts]);

      // Clear the form and hide the creation area
      setTitle('');
      setDescription('');
      setTags([]);
      setTagInput('');
      setShowCreatePost(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  //console.log("Predefined Tags:", predefinedTags);
  return (
    <Box>
      {/* Toggle Button */}
      <Button 
      colorScheme="blue" 
      variant="solid"
      // width="20vh"
      width={"10vw"}
      _hover={{
      bg: 'blue.500', // Darker shade for better contrast
      color: 'white', // Ensure text remains white
    }}
    onClick={() => setShowCreatePost(!showCreatePost)}
>
  {!showCreatePost && (
    <IoIosAddCircleOutline size={20} />
  )}
  {showCreatePost ? 'Cancel' : 'New Post'}
    </Button>

    {/* Post Creation Form */}
    {showCreatePost && (
      <Box 
        p={4} 
        mt={4} 
        border="1px solid" 
        borderColor="gray.600" 
        borderRadius="md" 
        bg="bg.muted"
      >
        {/* Title Input */}
        <Input
          placeholder="Topic Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
          bg="bg.textbg" // bg.textbg comes from theme.ts
        />
        {/* Description Textarea */}
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb={4}
          bg="bg.textbg"
        />

        {/* Tag Input */}
        <Input
          placeholder="Add a custom tag and press Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          mb={4}
          bg="bg.textbg"
        />

        {/* Display Selected Tags */}
        <HStack spacing={2} wrap="wrap" mb={4}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              bg="blue.100"
              color="blue.800"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="sm"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              maxWidth="200px" // Optional: Limit tag width to prevent overflow
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              <Box
                as="span"
                flex="1"
                textAlign="center"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {tag}
              </Box>
              {/* Custom Close Button */}
              <Box
                as="button"
                onClick={() => removeTag(tag)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="transparent"
                border="none"
                cursor="pointer"
                color="blue.800"
                _hover={{ color: "red.500" }}
                _focus={{ outline: "none" }}
                fontSize="12px" /* Adjust size */
                lineHeight="1"
                height="16px"
                width="16px"
                ml={2} /* Margin to separate text and button */
                borderRadius="full"
              >
                ×
              </Box>
            </Tag>
          ))}
        </HStack>

          {/* Classes Select */}
          <SelectRoot
            collection={options}
            value={selectedOption}
            onValueChange={(value) => setSelectedOption(value)}
            size="sm"
            width="100%"
            mb={4}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Related course" />
            </SelectTrigger>
            <SelectContent>
              {options.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          {/* Submit Button */}
            <Button 
              colorScheme="blue" 
              gap ="100"
              variant="solid"
              _hover={{
              bg: 'blue.600', // Darker shade for better contrast
              color: 'white', // Ensure text remains white
            }}
              onClick={handleCreatePost}
            >
              Post Your Question or Note!
            </Button>
          </Box>
        )}
    </Box>
  );
};

export default MakePostButton;
