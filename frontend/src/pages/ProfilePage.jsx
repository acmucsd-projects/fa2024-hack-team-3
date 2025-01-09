import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Heading, Stack, HStack, Badge, SimpleGrid, GridItem, Spinner, Center } from '@chakra-ui/react';
import axios from 'axios';
import { Avatar } from "../components/ui/avatar";
import Header from '../home_components/Header';
import Sidebar from '../account_settings_components/Sidebar';
import system from '../theme';
import { ColorModeProvider } from "../components/ui/color-mode"; //dark mode
import { ChakraProvider } from "@chakra-ui/react";
import Post from '../home_components/Post';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfileAndCourses = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
    
                // Fetch profile
                const profileResponse = await axios.get('https::/localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setProfileData(profileResponse.data);
                localStorage.setItem('authUserId', profileResponse.data.user._id); // Save the user ID
    
                // Fetch courses
                const coursesResponse = await axios.get('https::/localhost:5000/api/users/me', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                const preloadedCourses = coursesResponse.data.courses.map((course) => course.name);
                setCourses(preloadedCourses);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                // Stop loading after all requests are complete
                setIsLoading(false);
            }
        };
    
        fetchProfileAndCourses();
    }, []);

    // Handle deleting a post
    const handleDeletePost = (postId) => {
        setProfileData((prevData) => ({
            ...prevData,
            posts: prevData.posts.filter((post) => post._id !== postId),
        }));
    };

    // Handle editing a post
    const handleEditPost = (updatedPost) => {
        setProfileData((prevData) => ({
            ...prevData,
            posts: prevData.posts.map((post) =>
                post._id === updatedPost._id ? updatedPost : post
            ),
        }));
    };

    return (
        <ChakraProvider value={system}>
            <ColorModeProvider>
                <Box p={4} maxW="100vw" mx="auto">
                    {/* Header */}
                    <Header courses={courses} setPosts={() => {}} />

                    {/* Responsive two-column layout */}
                    <SimpleGrid columns={{ base: 1, md: 12 }} spacing={6} mt={4}>
                        {/* Sidebar */}
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                            <Sidebar
                                courses={courses}
                                selectedCourses={selectedCourses}
                                setSelectedCourses={setSelectedCourses}
                                setPosts={() => {}}
                            />
                        </GridItem>

                        <GridItem colSpan={{ base: 1 }}></GridItem>

                        {/* Main Content */}
                        <GridItem colSpan={{ md: 7 }}>
                            {isLoading ? (
                                <Box p={6} bg="bg.subtle" rounded={"md"} h={"100vh"}>
                                <Center minH="60vh">
                                    <Spinner size="xl" color="blue.500" />
                                </Center>
                                </Box>
                            ) : (
                                <Box p={6} bg="bg.subtle" rounded={"md"}>
                                    {/* Profile Information */}
                                    <HStack spacing={2} mb={6} align="center">
                                        <Avatar size="xl" src={profileData.user.profilePicture} name={profileData.user.username} />
                                        <VStack align="start" spacing={0}>
                                            <Heading size="lg" mb={-2}>{profileData.user.username}</Heading>
                                            <Text color="gray.500" mb={2}>{profileData.user.emailAddress}</Text>
                                        </VStack>
                                    </HStack>

                                    {/* Courses */}
                                    <Box mb={6}>
                                        <Heading size="md" mb={4}>COURSES</Heading>
                                        {profileData.user.courses.length ? (
                                            <HStack spacing={2}>
                                                {profileData.user.courses.map((course, index) => (
                                                    <Badge key={index} bg="bg.tags" size="md">
                                                        {course.name}
                                                    </Badge>
                                                ))}
                                            </HStack>
                                        ) : (
                                            <Text>No courses enrolled.</Text>
                                        )}
                                    </Box>

                                    {/* Posts */}
                                    <Box mb={6}>
                                        <Heading size="md" mb={4}>POSTS</Heading>
                                        {profileData.posts.length ? (
                                            <Stack spacing={4}>
                                                {profileData.posts.length ? (
                                            <Stack spacing={4}>
                                                {profileData.posts.map((post) => (
                                                    <Post
                                                        key={post._id}
                                                        post={post}
                                                        onDelete={handleDeletePost}
                                                        onEdit={handleEditPost}
                                                    />
                                                ))}
                                            </Stack>
                                        ) : (
                                            <Text>No posts created.</Text>
                                        )}
                                            </Stack>
                                        ) : (
                                            <Text>No posts created.</Text>
                                        )}
                                    </Box>

                                    {/* Comments */}
                                    <Box>
                                        <Heading size="md" mb={4}>COMMENTS</Heading>
                                        {profileData.comments.length ? (
                                            <Stack spacing={4}>
                                                {profileData.comments.map((comment) => (
                                                    <Box 
                                                        key={comment._id} 
                                                        borderRadius="lg" 
                                                        p={4} 
                                                        boxShadow={"sm"} 
                                                        bg={"bg.muted"} 
                                                        _hover={{ boxShadow: "md" }}
                                                    >
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
                            )}
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </ColorModeProvider>
        </ChakraProvider>
    );
};

export default ProfilePage;