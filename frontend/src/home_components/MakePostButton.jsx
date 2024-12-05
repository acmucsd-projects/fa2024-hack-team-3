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

const MakePostButton = ({ setPosts }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');


  const [selectedOption, setSelectedOption] = useState("") // Track selected option
  const options = createListCollection({
    items: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  })

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

  // const removeTag = (tagToRemove) => {
  //   setTags(tags.filter((tag) => tag !== tagToRemove));
  // };

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

          {/* Advanced Select */}
          <SelectRoot
            collection={options}
            value={selectedOption}
            onValueChange={(value) => setSelectedOption(value)}
            size="sm"
            width="100%"
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>


          <Button colorScheme="teal" onClick={handleCreatePost}>
            Post Your Question or Note!
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MakePostButton;
