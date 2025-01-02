import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Heading, Stack, HStack, Badge } from '@chakra-ui/react';
import axios from 'axios';
import { Avatar} from "../components/ui/avatar"

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!profileData) {
        return <Text>No profile data found.</Text>;
    }

    const { user, posts, comments } = profileData;

    return (
        <Box p={6}>
            <HStack spacing={4} mb={6}>
                <Avatar size="xl" src={user.profilePicture} name={user.username} />
                <VStack align="start">
                    <Heading size="lg">{user.username}</Heading>
                    <Text color="gray.500">{user.emailAddress}</Text>
                </VStack>
            </HStack>

            {/* Courses */}
            <Box mb={6}>
                <Heading size="md" mb={4}>Courses</Heading>
                {user.courses.length ? (
                    <Stack spacing={2}>
                        {user.courses.map((course, index) => (
                            <Badge key={index} colorScheme="blue">
                                {course.name}
                            </Badge>
                        ))}
                    </Stack>
                ) : (
                    <Text>No courses enrolled.</Text>
                )}
            </Box>

            {/* Posts */}
            <Box mb={6}>
                <Heading size="md" mb={4}>Posts</Heading>
                {posts.length ? (
                    <Stack spacing={4}>
                        {posts.map((post) => (
                            <Box key={post._id} p={4} borderWidth="1px" borderRadius="md">
                                <Heading size="sm">{post.title || 'Untitled Post'}</Heading>
                                <Text color="gray.600" noOfLines={2}>{post.description}</Text>
                                <HStack spacing={2} mt={2}>
                                    {post.tags.map((tag, index) => (
                                        <Badge key={index} colorScheme="blue">{tag}</Badge>
                                    ))}
                                </HStack>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Text>No posts created.</Text>
                )}
            </Box>

            {/* Comments */}
            <Box>
                <Heading size="md" mb={4}>Comments</Heading>
                {comments.length ? (
                    <Stack spacing={4}>
                        {comments.map((comment) => (
                            <Box key={comment._id} p={4} borderWidth="1px" borderRadius="md">
                                <Text>{comment.text}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    On post: {comment.postId?.title || 'Unknown Post'}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Text>No comments made.</Text>
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;
