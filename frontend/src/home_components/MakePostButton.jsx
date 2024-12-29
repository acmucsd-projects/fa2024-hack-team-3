import React, { useState } from 'react';
import { Box, Button, Input, Textarea, createListCollection, Field, defineStyle, HStack, Select} from '@chakra-ui/react';
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
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import axios from 'axios';

const MakePostButton = ({ setPosts, courses }) => {

  // const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Track selected course
  const [isOpen, setIsOpen] = useState(false); // state to control dialog visibility

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
        course: selectedOption,
      });

      // Update the posts in HomePage
      setPosts((prevPosts) => [response.data, ...prevPosts]);

      // Clear the form and hide the creation area
      setTitle('');
      setDescription('');
      setTags([]);
      setTagInput('');
      // setShowCreatePost(false);
      setSelectedOption('');
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  //console.log("Predefined Tags:", predefinedTags);
  return (
        <DialogRoot key={"lg"} size={"lg"} placement={"center"} open={isOpen} openOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline"
              width={"12vw"}
              minW={"100px"}
              _hover={{
                bg: 'blue.600', // Darker shade for better contrast
                color: 'white', // Ensure text remains white
              }}
              onClick={() => setIsOpen(true)}
            >
              <IoIosAddCircleOutline size={20} /> New Post
            </Button>
          </DialogTrigger>

          <DialogContent
            overflow="visible"
            position="relative"
          >
            <DialogHeader>
              <DialogTitle>Create a New Post</DialogTitle>
            </DialogHeader>

            <DialogBody>
                {/* Title Input */}
                {/* <Input
                  placeholder="Topic Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  mb={4}
                  bg="bg.textbg" // bg.textbg comes from theme.ts
                  width={"40%"}
                  size={"lg"}
                /> */}
                <Field.Root>
                  <Box pos="relative" w="full">
                    <Input 
                      className="peer" 
                      placeholder="Topic Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      mb={4}
                      bg="bg.DEFAULT" // bg.textbg comes from theme.ts
                      width={"40%"}
                    />
                    <Field.Label css={floatingStyles}>Topic Title</Field.Label>
                  </Box>
                </Field.Root>
                <Field.Root>
                <Box pos="relative" w="full">
                    <Textarea
                      className='peer'
                      autoresize
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      mb={4}
                      bg="bg.DEFAULT"
                    />
                    <Field.Label css={floatingStyles}>Description</Field.Label>
                  </Box>
                </Field.Root>

                {/* Tag Input */}
                <Input
                  placeholder="Add a custom tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  mb={4}
                  bg="bg.DEFAULT"
                />

                {/* Display Selected Tags */}
                <HStack spacing={2} wrap="wrap" mb={4}>
                  {tags.map((tag) => (
                    <Box
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
                      maxWidth="200px"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {/* Tag Text */}
                      <Box
                        as="span"
                        flex="1"
                        textAlign="center"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {tag}
                      </Box>

                      {/* Close Button */}
                      <Box
                        as="button"
                        onClick={() => removeTag(tag)} // Call the removeTag function
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
                        paddingRight={0}
                        paddingLeft={2}
                        
                        borderRadius="full"
                      >
                        &times; 
                      </Box>
                    </Box>
                  ))}
                </HStack>

                {/* Classes Select */}
                {/* <Box overflow={"visible"}>
                <SelectRoot
                  collection={options}
                  value={selectedOption}
                  onValueChange={(value) => setSelectedOption(value)}
                  size="sm"
                  width="30%"
                  mb={4}
    
                >
                  <SelectTrigger
                    _hover={{
                      bg: "blue.600", // Change background color on hover
                      color: "white", // Change text color on hover
                    }}
                    width="100%"
                    borderRadius="md" // Optional: Add rounded corners
                  >
                    <SelectValueText placeholder="Related course"/>
                  </SelectTrigger>
                  <SelectContent zIndex="popover">
                    {options.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  

                </SelectRoot>
                </Box> */}


        </DialogBody>

            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button 
                  variant="outline" 
                  bg={"gray.400"}
                  width={"20vh"}
                  _hover={{
                    bg: 'gray.500', // Darker shade for better contrast
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button
                colorScheme="blue"
                gap ="100"
                variant="solid"
                _hover={{
                  bg: 'blue.600', // Darker shade for better contrast
                  color: 'white', // Ensure text remains white
                }}
                onClick={handleCreatePost}
                width={"20vh"}
              >
                Save
              </Button>
            </DialogFooter>
            {/* <DialogCloseTrigger
              width="8"
            /> */}
          </DialogContent>
        </DialogRoot>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "bold",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
    backgroundColor: "bg",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
    backgroundColor: "bg",
  },
});

export default MakePostButton;
