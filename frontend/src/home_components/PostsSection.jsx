import React, {useState} from 'react';
import Post from './Post';
import { Box, Heading, Text, Stack, Button, Flex } from '@chakra-ui/react';

const PostsSection = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Calculate the total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

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
    <Box className="posts-section" p={4}>
      <Heading as="h2" size="lg" mb={4}>Homepage Posts</Heading>
      <Text mb={4}>{posts.length} total results for (placeholder until courses implemented) </Text>

      {/* Stack component to arrange posts vertically */}
      <Stack spacing={6}>
        {currentPosts.slice().map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </Stack>

      {/* Pagination Controls */}
      <Flex justifyContent="space-between" mt={4}>
        <Button onClick={handleBack} disabled={currentPage === 1} variant="solid"
        _hover={{bg: 'blue.600', color: 'white'}}>
          Back
        </Button>
        <Text alignSelf="center">Page {currentPage} of {totalPages}</Text>
        <Button onClick={handleNext} disabled={currentPage === totalPages} variant="solid"
        _hover={{bg: 'blue.600', color: 'white'}}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default PostsSection;
