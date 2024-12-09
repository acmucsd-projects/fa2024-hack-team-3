import React from 'react';
import Post from './Post';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';

const PostsSection = ({ posts }) => {
  return (
    <Box className="posts-section" p={4}>
      <Heading as="h2" size="lg" mb={4}>Posts</Heading>
      <Text mb={4}>{posts.length} results for (placeholder until courses implemented) </Text>

      {/* Stack component to arrange posts vertically */}
      <Stack spacing={6}>
        {posts.slice().map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </Stack>
    </Box>
  );
};

export default PostsSection;
