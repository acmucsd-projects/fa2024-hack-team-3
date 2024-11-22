import React from 'react';
import { Box, Text, Badge, HStack, VStack, Spacer } from '@chakra-ui/react';

const Post = ({ post }) => {
    return (
        <Box 
            borderRadius="lg" 
            p={4} 
            boxShadow="sm" 
            bg="white" 
            _hover={{ boxShadow: "md" }}
        >
            <HStack mb={4} alignItems="center">
                <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{post.user}</Text>
                    <Text fontSize="sm" color="gray.500">5 mins ago</Text>
                </VStack>
                <Spacer />
                <Text fontSize="lg" color="gray.500">...</Text>
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