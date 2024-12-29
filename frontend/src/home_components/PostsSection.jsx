import React, { useState } from 'react';
import Post from './Post';
import { Box, Heading, Text, Stack, Button, Flex } from '@chakra-ui/react';

const PostsSection = ({ posts, setPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const handleEditPost = (updatedPost) => {
    // setPosts((prevPosts) =>
    //   prevPosts.map((post) =>
    //       post._id.toString() === updatedPost._id.toString()
    //           ? { ...post, ...updatedPost } // Merge updated fields
    //           : post
    //   )
    // );
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
          // Check if the updated post's userId is a string
          if (post._id === updatedPost._id) {
              if (typeof updatedPost.userId === 'string') {
                  updatedPost.userId = {
                      _id: updatedPost.userId,
                      username: post.userId?.username || 'Unknown User',
                      profilePicture: post.userId?.profilePicture || '',
                  };
              }
              return updatedPost;
          }
          return post;
      })
  );
  };

  // Calculate pagination values
  const totalPages = Math.ceil(posts.length / postsPerPage); // Calculate the total pages
  // Calculate the start and end indices for slicing
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  // Slice the posts for the current page
  const currentPosts = posts.slice(startIndex, endIndex);

  // Handler functions for pagination  buttons
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleBack = () =>  {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Box className="posts-section" p={4} bg="bg.subtle" rounded={"md"} >
      <Heading as="h2" size="lg" mb={4}>Explore Posts</Heading>
      <Text mb={4} >{posts.length} total results for (placeholder until courses implemented) </Text>

      {/* Stack component to arrange posts vertically */}
      <Stack spacing={6}>
          {currentPosts.map((post) => (
              <Post 
                key={post._id}
                post={post} 
                onDelete={handleDeletePost} 
                onEdit={handleEditPost}
              />
          ))}
      </Stack>

      {/* Pagination Controls */}
      <Flex justifyContent="space-between" mt={4}>
        <Button onClick={handleBack} disabled={currentPage === 1} bg='bg.button' variant="solid"
        _hover={{bg: 'blue.600', color: 'white'}}>
          Back
        </Button>
        <Text alignSelf="center">Page {currentPage} of {totalPages}</Text>
        <Button onClick={handleNext} disabled={currentPage === totalPages} bg='bg.button' variant="solid" 
        _hover={{bg: 'blue.600', color: 'white'}}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default PostsSection;
