import React, { useState, useEffect } from 'react';
import { Box, Text, Badge, HStack, VStack, Spacer, Button, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post, onDelete }) => {
    const [comments, setComments] = useState([]); // State for comments
    const [newComment, setNewComment] = useState(''); // State for new comment input
    const [loadingComments, setLoadingComments] = useState(false); // Loading state

    const authUserId = localStorage.getItem('authUserId'); 
    // console.log('Retrieved userId:', authUserId);
    

    // Fetch comments for the post
    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const response = await axios.get(`http://localhost:5000/api/posts/${post._id}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setLoadingComments(false);
        }
    };
    // Add a new comment
    const handleAddComment = async () => {
        const authToken = localStorage.getItem('authToken'); 
        if (!authToken) {
            console.error('User not authenticated');
            return;
        }
        if (!newComment.trim()) {
            alert('Comment content is empty!');
            return;
        }
        const payload = {
            text: newComment.trim(), // Remove extra spaces
        };

        //console.log('Payload being sent:', payload); // For debugging
        //console.log('Authorization Header:', `Bearer ${authToken}`);

        try {
            const response = await axios.post(
                `http://localhost:5000/api/posts/${post._id}/comments`,
                payload,
                { 
                    headers: { Authorization: `Bearer ${authToken}` }, 
                }
            );
            setComments((prev) => [...prev, response.data]); // Add new comment to the state
            setNewComment(''); // Clear input
        } catch (error) {
            console.error('Failed to add comment:', error.response?.data || error.message);
            
        }
    };
    
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

    // Fetch comments when the component mounts
    useEffect(() => {
        if (post._id) {
          fetchComments();
        }
      }, [post._id]);

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
                    {/* Display the relative time using the existing timestamp */}
                    <Text fontSize="sm" color="fg.subtle">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true})}
                    </Text>
                </VStack>
                <Spacer />
                {post.userId.toString() === authUserId && ( // Show delete button only if the user owns the post
                    <Button 
                        size="sm" 
                        colorScheme="red" 
                        onClick={handleDelete} 
                        _hover={{
                            bg: 'red.600', // Darker shade for better contrast
                            color: '#F5F0E6'}} // Ensure text remains white
                    >
                        Delete Post
                    </Button>
                )}
            </HStack>
            <Text fontSize="lg" fontWeight="bold" colorScheme="blue" bg="bg.subtle" mb={2}>{post.title}</Text>
            <Text mb={4} color="#00629B">{post.description}</Text>
            <HStack spacing={2}>
                {post.tags && post.tags.map((tag, index) => (
                    <Badge key={index} colorScheme="blue" bg="bg.muted">{tag}</Badge>
                ))}
            </HStack>

            {/* Comment Section */}
            <Box mt={4}>
                <Text fontWeight="bold" mb={2}>Comments</Text>
                <Stack spacing={3}>
                    {loadingComments ? (
                        <Text>Loading comments...</Text>
                    ) : (
                        comments.map((comment) => {
                            const displayUser = comment.userId?.username || 'Unknown User';

                            return (
                                <Box 
                                    key={comment._id} 
                                    p={2} 
                                    borderRadius="md" 
                                    bg="bg.subtle" 
                                    boxShadow="sm"
                                >
                                    <Text fontSize="sm" fontWeight="bold">{displayUser}</Text>
                                    <Text fontSize="sm">{comment.text || 'No content available'}</Text>
                                </Box>
                            );
                        })
                    )}
                </Stack>


                <HStack mt={4}>
                    <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        size="sm"
                        bg="bg.textbg"
                    />
                    <Button 
                    size="sm" 
                    colorScheme="blue" 
                    onClick={handleAddComment}
                    isLoading={loadingComments} // Show spinner while loading
                    disabled={!newComment.trim()}
                    _hover={{
                        bg: 'blue.600', // Darker shade for better contrast
                        color: 'white', // Ensure text remains white
                      }}
                    >
                        Comment
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
}

export default Post; 
