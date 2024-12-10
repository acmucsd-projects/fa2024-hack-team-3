import React from 'react';
import { Box, Text, Badge, HStack, VStack, Spacer, Button } from '@chakra-ui/react';
import axios from 'axios';

const Post = ({ post, onDelete }) => {
    const authUserId = localStorage.getItem('authUserId'); 

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token
                },
            });
            onDelete(post._id); // Update parent state to remove the post
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };
    return (
        <Box 
            
            borderRadius="lg" 
            p={4} 
            boxShadow="sm" 
            bg="bg.subtle" 
            _hover={{ boxShadow: "md" }}
        >
            <HStack mb={4} alignItems="center">
                <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{post.user}</Text>
                    <Text fontSize="sm" color="fg.subtle">5 mins ago</Text>
                </VStack>
                <Spacer />
                {post.userId === authUserId && ( // Show delete button only if the user owns the post
                    <Button size="sm" colorScheme="red" onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </HStack>
            <Text fontSize="lg" fontWeight="bold" mb={2}>{post.title}</Text>
            <Text mb={4}>{post.description}</Text>
            <HStack spacing={2}>
                {post.tags && post.tags.map((tag, index) => (
                    <Badge key={index} colorScheme="blue">{tag}</Badge>
                ))}
            </HStack>
        </Box>
    );
}

export default Post;