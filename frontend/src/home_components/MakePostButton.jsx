import React , {useState} from "react";
import { Button, Input, Textarea } from '@chakra-ui/react';
import axios from "axios";

const MakePostButton = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [userId, setUserId] = useState(''); 
  
  const handleCreatePost = () => {
    const newPost = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()), //splits tags by commas
      userId, //possible needs removal
    };

    axios.post('http://localhost:5000/api/posts', newPost)
      .then(response => {
        alert('Post created successfully!');
      })
      .catch(error => {
        console.error("There was an error creating the post:", error);
      });
  };
  return (
    <div>
      <Input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={4}
      />  
      <Textarea 
        placeholder="Post Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb={4}
      />
      <Input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        mb={4}
      />
      <Button colorScheme="blue" onClick={handleCreatePost}>
        Create Post
      </Button>
    </div>
  );
};

export default MakePostButton;