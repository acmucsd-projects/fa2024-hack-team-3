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
import { Box, Heading, Text, Tag, Stack } from '@chakra-ui/react';

const PostsSection = ({ posts }) => {
    return (
        <div className="posts-section">
            <Heading as="h2" size="lg" mb={4}>Posts</Heading>
            <Text mb={4}>8 results for CSE 11</Text>
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default PostsSection;