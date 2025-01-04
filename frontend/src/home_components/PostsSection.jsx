import React, { useState, useEffect} from 'react';
import Post from './Post';
import { Box, Heading, Text, Stack, Button, Flex, HStack} from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '../components/ui/skeleton';

const PostsSection = ({ posts, setPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 10;

  useEffect(() => {
    // Simulate a delay for fetching posts
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false when posts are fetched
    }, 1000);

    return () => clearTimeout(timer);
  }, [posts]);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const handleEditPost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post._id === updatedPost._id ? { ...post, ...updatedPost } : post))
    );
  };

  // Pagination logic
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
      <Heading size="lg" mb={4}>POSTS</Heading>
      <Text mb={4}>
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} found.
      </Text>

      {/* Render skeletons while loading */}
      {/* Stack component to arrange posts vertically */}
      {loading ? (
        <Stack spacing={6}>
        {Array.from({ length: postsPerPage }).map((_, index) => (
          <Stack key={index} spacing={4} w="full" p={4} bg="bg.subtle" rounded="md" shadow="sm">
            <HStack>
              <SkeletonCircle size="10" />
              <SkeletonText noOfLines={1} w="30%" />
            </HStack>
            <Skeleton height="16px" w="40%" />
            <Skeleton height="150px" w="full" />
          </Stack>
        ))}
      </Stack>
      ) : currentPosts.length > 0 ? (
        
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
      ) : (
        <Text textAlign="center" color="gray.500">
          No posts to display.
        </Text>
      )}
      

      {/* Pagination Controls */}
      <Flex justifyContent="space-between" mt={4}>
        <Button onClick={handleBack} disabled={currentPage === 1} bg='bg.button' variant="solid"
          _hover={{bg: 'blue.600', color: 'white'}}
          background={"bg.buttons"}
          color={"white"}
        >
          Back
        </Button>
        <Text alignSelf="center">Page {currentPage} of {totalPages || 1}</Text>
        <Button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} bg='bg.button' variant="solid" 
        _hover={{bg: 'blue.600', color: 'white'}}
        background={"bg.buttons"}
        color={"white"}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default PostsSection;
