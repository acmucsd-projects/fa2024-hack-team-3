
// import React from 'react'
// import Post from './Post'
// import { Box, Heading, Text, Stack } from '@chakra-ui/react'

// const PostsSection = ({ posts }) => {
//   return (
//     <Box className="posts-section" p={4}>
//       <Heading as="h2" size="lg" mb={4}>Posts</Heading>
//       <Text mb={4}>8 results for CSE 11</Text>

//       {/* Stack component to arrange posts vertically */}
//       <Stack spacing={6}>
//         {posts.map((post, index) => (
//           <Box key={index}  p={4} boxShadow="md" bg="white">
//             <Post post={post} />
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//   )
// }

// export default PostsSection;

import React from 'react';
import Post from './Post';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';

const PostsSection = ({ posts }) => {
  return (
    <Box className="posts-section" p={4}>
      <Heading as="h2" size="lg" mb={4}>Posts</Heading>
      <Text mb={4}>8 results for CSE 11</Text>

      {/* Stack component to arrange posts vertically */}
      <Stack spacing={6}>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </Stack>
    </Box>
  );
}

export default PostsSection;
