import React, { useState } from 'react';
import { Box, Button, Input, Textarea, createListCollection} from '@chakra-ui/react';
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
  const [tagInput, setTagInput] = useState('');
  const [selectedOption, setSelectedOption] = useState("") // Track selected option

  const userId = localStorage.getItem("authUserId");

  const predefinedTags = [
    "Group Study", "One-on-One", "Online", "In-Person",
    "Study Over Coffee", "Study in Library", "Study at Home",  "Morning Study",
    "Afternoon Study", "Evening Study", "Late Night Study", "Weekend Study",
    "Exam Prep", "Homework Help", "Research Paper Writing", "Project Collaboration",
    "Study for Quizzes", "Assignment Help", "Discussion & Debates", "Quiet Space",
    "Music-Friendly", "Coffee Shop", "Library", "Outdoors", "Co-Working Space", "At-Home Study"
  ];

  const options = createListCollection({
    items: courses.map(course => ({ label: course, value: course })), // Line 18
  });

  const handleCreatePost = async () => {
    // if (!description || !userId) {
    //   // Handle validation errors as needed
    //   console.error("Description and userId are required.");
    //   return;
    // }
    console.log(tags);
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


  return (
    <Box>
      {/* Toggle Button */}
      <Button 
      colorScheme="blue" 
      variant="solid"
      _hover={{
      bg: 'blue.500', // Darker shade for better contrast
      color: 'white', // Ensure text remains white
    }}
    onClick={() => setShowCreatePost(!showCreatePost)}>
        {showCreatePost ? 'Cancel' : '📃New Post'}
      </Button>

      {/* Post Creation Form */}
      {showCreatePost && (
        <Box p={4} mt={4} border="1px solid" borderColor="gray.600" borderRadius="md" bg="bg.muted">
          {/* Title Input */}
          <Input
            placeholder="Topic Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={4}
          />
          {/* Description Textarea */}
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb={4}
          />

          {/*Select */}
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


          <Button 
          colorScheme="blue" 
          gap ="100"variant="solid"
          _hover={{
          bg: 'blue.600', // Darker shade for better contrast
          color: 'white', // Ensure text remains white
          }}
          onClick={handleCreatePost}>
            Post Your Question or Note!
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MakePostButton;
