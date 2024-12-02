import React, { useState } from 'react';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import axios from 'axios';

const MakePostButton = ({ setPosts }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        title,
        description,
        tags,
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

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Box>
      {/* Toggle Button */}
      <Button colorScheme="blue" onClick={() => setShowCreatePost(!showCreatePost)}>
        {showCreatePost ? 'Cancel' : '📃 New Post'}
      </Button>

      {/* Post Creation Form */}
      {showCreatePost && (
        <Box p={4} mt={4} border="1px solid" borderColor="gray.300" borderRadius="md" bg="gray.50">
          <Input
            placeholder="Topic Title*"
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

          <Button colorScheme="teal" onClick={handleCreatePost}>
            Post Your Question or Note!
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MakePostButton;
