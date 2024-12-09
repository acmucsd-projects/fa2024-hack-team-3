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

  const userId = localStorage.getItem("authUserId");


  const [selectedOption, setSelectedOption] = useState("") // Track selected option
  const options = createListCollection({
    items: courses.map(course => ({ label: course, value: course })), // Line 18
  });

  const handleCreatePost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        
        title,
        description,
        tags,
        userId,
      });

      // Update the posts in HomePage
      setPosts((prevPosts) => {
        return [response.data, ...prevPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date, most recent first
      });

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
      <Button colorScheme="blue" onClick={() => setShowCreatePost(!showCreatePost)}>
        {showCreatePost ? 'Cancel' : '📃New Post'}
      </Button>

      {/* Post Creation Form */}
      {showCreatePost && (
        <Box p={4} mt={4} border="1px solid" borderColor="gray.300" borderRadius="md" bg="gray.50">
          <Input
            placeholder="Topic Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={4}
          />
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
          colorScheme="teal" 
          gap ="100"

          onClick={handleCreatePost}>
            Post Your Question or Note!
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MakePostButton;
