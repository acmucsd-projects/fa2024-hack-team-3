// import React from 'react';
// import Post from './Post';
// import { Box, Heading, Text, Tag, Stack } from '@chakra-ui/react'

// const PostsSection = () => {
//     const posts = [
//         {
//           title: "Midterm Review at Geisel",
//           description: "Looking for someone to review for the CSE 11 midterm...",
//           tags: ["Test Review", "In Person"],
//           user: "Mandy Liu CO2028",
//         },
//         {
//           title: "Midterm Review at Geisel",
//           description: "Looking for someone to review for the CSE 11 midterm...",
//           tags: ["Test Review", "In Person"],
//           user: "Mandy Liu CO2028",
//         },
//         {
//           title: "Midterm Review at Geisel",
//           description: "Looking for someone to review for the CSE 11 midterm...",
//           tags: ["Test Review", "In Person"],
//           user: "Mandy Liu CO2028",
//         }
//         // Add other posts as needed
//     ];

//     return (
//         <div className="posts-section">
//           <h2>Posts</h2>
//           <p>8 results for CSE 11</p>
//           {posts.map((post, index) => (
//             <Post key={index} post={post} />
//           ))}
//         </div>
//     );
// };

// export default PostsSection;

import React from 'react';
import Post from './Post';
import { Box, Heading, Text, Tag, SimpleGrid } from '@chakra-ui/react';

const PostsSection = ({ posts }) => {
    return (
      <Box className="posts-section" p={4}>
      <Heading as="h2" size="lg" mb={4}>Posts</Heading>
      <Text mb={4}>8 results for CSE 11</Text>

      {/* Grid layout for posts */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {posts.map((post, index) => (
          <Box key={index} borderWidth={1} borderRadius="lg" p={4} boxShadow="md" bg="white">
            <Post post={post} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
    );
};

export default PostsSection;