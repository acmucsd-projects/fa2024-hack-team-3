import React, { useState, useEffect } from 'react';
import { Box, Text, Badge, HStack, VStack, Spacer, Button, Input, Stack, Field, defineStyle, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "../components/ui/menu"
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogActionTrigger,
    DialogCloseTrigger,
  } from "../components/ui/dialog";
import { Avatar, AvatarGroup } from "../components/ui/avatar"

const Post = ({ post, onDelete, onEdit }) => {

    const [comments, setComments] = useState([]); // State for comments
    const [newComment, setNewComment] = useState(''); // State for new comment input
    const [loadingComments, setLoadingComments] = useState(false); // Loading state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete dialog

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for edit dialog
    const [editTitle, setEditTitle] = useState(post.title); // State for edited title
    const [editDescription, setEditDescription] = useState(post.description); // State for edited description
    const [editTags, setEditTags] = useState(post.tags || []); // State for edited tags
    const [tagInput, setTagInput] = useState(''); // State for tag input
    // const [isHighlighted, setIsHighlighted] = useState(false);

    // useEffect(() => {
    //     if (post.isHighlighted) {
    //         setIsHighlighted(true);
    //         const timer = setTimeout(() => setIsHighlighted(false), 2000);
    //         return () => clearTimeout(timer); // Cleanup
    //     }
    // }, [post.isHighlighted]);
    
    const authUserId = localStorage.getItem('authUserId')?.toString(); 
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
    
    const handleSaveEdit = async () => {
        try {
            const updatedPost = {
                title: editTitle,
                description: editDescription,
                tags: editTags,
            };

            await axios.patch(
                `http://localhost:5000/api/posts/${post._id}`,
                updatedPost,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token
                    },
                }
            );

            const response = await axios.get(`http://localhost:5000/api/posts/${post._id}`);
            // Update the UI with the updated post
            console.log('Updated post:', response.data);
            onEdit(response.data);
            setIsEditDialogOpen(false); // Close the dialog
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !editTags.includes(tagInput)) {
            setEditTags((prev) => [...prev, tagInput.trim()]);
            setTagInput(''); // Clear the input
        }
    };

    const handleRemoveTag = (tag) => {
        setEditTags((prev) => prev.filter((t) => t !== tag));
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
            boxShadow={"sm"} 
            bg={"bg.muted"} 
            _hover={{ boxShadow: "md" }}
        >
            

        <HStack mb={4} alignItems="center">
            <VStack align="start" spacing={0}>
                {/* <Text fontWeight="bold">{post.userId?.username || "Unknown User"}</Text>
                <Text fontSize="sm" color="fg.subtle">
                    {new Date(post.createdAt).toLocaleString()}
                </Text> */}
                <HStack>
                    <Avatar size="sm" src={post.userId?.profilePicture || post.profilePicture} name={post.userId?.username || post.username} />
                    <Text fontWeight="bold">{post.username || "Unknown User"}</Text>
                </HStack>
                <Text fontSize="sm" color="fg.subtle">
                    {new Date(post.createdAt).toLocaleString() || "Unknown Date"}
                </Text>
            </VStack>
            <Spacer />
            
            <MenuRoot>
                <MenuTrigger asChild>
                    <Box _hover={{ cursor: "pointer" }}>
                        <BsThreeDotsVertical />
                    </Box>
                </MenuTrigger>
                {post.userId && post.userId._id?.toString() === authUserId && (
                <MenuContent> 
                    <MenuItem onClick={() => setIsEditDialogOpen(true)} _hover={{ cursor: "pointer" }}>
                        Edit
                    </MenuItem>

                    {/* Edit Dialog */}
                    <DialogRoot 
                        key={"edit-dialog"} 
                        size={"lg"} 
                        placement={"center"} 
                        open={isEditDialogOpen} 
                        closeOnInteractOutside={false}
                        onOpenChange={setIsEditDialogOpen}
                    >
                        <DialogContent
                            overflow="visible"
                            position="relative"
                        >
                            <DialogHeader>
                                <DialogTitle>Edit Post</DialogTitle>
                            </DialogHeader>

                            <DialogBody>
                                <Field.Root>
                                        <Input
                                            className="peer"
                                            placeholder="Edit Title"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            mb={4}
                                            bg="bg.DEFAULT" // bg.textbg comes from theme.ts
                                            width={"40%"}
                                        />
                                        <Field.Label css={floatingStyles}>Edit Title</Field.Label>
                                </Field.Root>

                                <Field.Root>
                                    <Textarea
                                        className="peer"
                                        autoresize
                                        placeholder="Edit Description"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        mb={4}
                                        bg="bg.DEFAULT"
                                    />
                                    <Field.Label css={floatingStyles}>Edit Description</Field.Label>
                                </Field.Root>


                                <Input
                                    placeholder="Edit Tags"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                                    mb={4}
                                    bg="bg.DEFAULT"
                                />

                                <HStack spacing={2} wrap="wrap">
                                    {editTags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            colorScheme="blue"
                                            onClick={() => handleRemoveTag(tag)}
                                            _hover={{ bg: "red.200", cursor: "pointer" }}
                                        >
                                            {tag} x
                                        </Badge>
                                    ))}
                                </HStack>
                            </DialogBody>


                            <DialogFooter>
                                    <Button 
                                        onClick={() => setIsEditDialogOpen(false)} 
                                        variant="outline"
                                        width={"20vh"}
                                        bg={"gray.400"}
                                        _hover={{
                                            bg: 'gray.500', // Darker shade for better contrast
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                <Button 
                                    colorScheme="blue"
                                    gap ="100"
                                    variant="solid"
                                    _hover={{
                                      bg: 'blue.600', // Darker shade for better contrast
                                      color: 'white', // Ensure text remains white
                                    }}
                                    width={"20vh"}
                                    onClick={() => {
                                        handleSaveEdit();
                                        setIsEditDialogOpen(false);}} 
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </DialogRoot>

                    {/* Delete Dialog */}
                    <DialogRoot open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                            <MenuItem
                                color={"fg.error"}
                                _hover={{ cursor: "pointer", bg: "bg.error", color: "fg.error" }}
                                value="delete-post"
                                disabled={!(post.userId && post.userId._id?.toString() === authUserId)}
                            >
                                Delete
                            </MenuItem>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <Text>
                                    Are you sure you want to delete this post? This action cannot be undone.
                                </Text>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDeleteDialogOpen(false)} // Close the dialog
                                >
                                    Cancel
                                </Button>
                                <Button
                                    bg={"red.500"}
                                    color="white"
                                    _hover={{ bg: "red.600" }}
                                    onClick={() => {
                                        handleDelete();
                                        setIsDeleteDialogOpen(false); // Close the dialog after deletion
                                    }}
                                >
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </DialogRoot>
                    
                    
                    </MenuContent>
                    )}
                </MenuRoot>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" colorScheme="blue" bg="bg.muted" mb={2}>{post.title}</Text>
            <Text mb={4} color="#00629B">{post.description}</Text>
            <HStack spacing={2}>
                {post.tags && post.tags.map((tag, index) => (
                    <Badge key={index} colorScheme="blue" bg="bg.subtle">{tag}</Badge>
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
                            const userProfilePicture = comment.userId?.profilePicture || '';
                            const relativeTime = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

                            return (
                                <Box 
                                    key={comment._id} 
                                    p={2} 
                                    borderRadius="md" 
                                    bg="bg.muted" 
                                    boxShadow="sm"
                                >
                                    <HStack paddingBottom={3}>
                                        <Avatar size="xs" src={userProfilePicture} name={displayUser} />
                                        <Text fontSize="sm" fontWeight="bold" paddingRight={1}>{displayUser}</Text>
                                        <Text fontSize="sm" color="fg.subtle">{relativeTime}</Text>
                                    </HStack>
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

const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "bold",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
      color: "fg.muted",
      top: "2.5",
      insetStart: "3",
      backgroundColor: "bg",
    },
    _peerFocusVisible: {
      color: "fg",
      top: "-3",
      insetStart: "2",
      backgroundColor: "bg",
    },
  });

export default Post; 



{/* <HStack mb={4} alignItems="center">
                <VStack align="start" spacing={0}>
                    <HStack>
                        <Avatar size="sm" src={post.userId?.profilePicture || post.profilePicture} name={post.userId?.username || post.username} />
                        <Text fontWeight="bold">{post.userId?.username || "Unknown User"}</Text>
                    </HStack>
                    <Text fontSize="sm" color="fg.subtle">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true})}
                    </Text>
                </VStack>
                <Spacer />

                <MenuRoot>
                    <MenuTrigger asChild>
                            <Box _hover={{ cursor: "pointer" }}><BsThreeDotsVertical /></Box>
                    </MenuTrigger>
                    {post.userId && post.userId._id?.toString() === authUserId && (
                    <MenuContent>
                        <MenuItem
                            onClick={onEdit}
                            _hover={{ cursor: "pointer" }}
                            value="edit-post"
                            disabled={!(post.userId && post.userId._id?.toString() === authUserId)}
                        >
                            Edit
                        </MenuItem>
        
                        <DialogRoot open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <MenuItem
                                    color={"fg.error"}
                                    _hover={{ cursor: "pointer", bg: "bg.error", color: "fg.error" }}
                                    value="delete-post"
                                    disabled={!(post.userId && post.userId._id?.toString() === authUserId)}
                                >
                                    Delete
                                </MenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                </DialogHeader>
                                <DialogBody>
                                    <Text>
                                        Are you sure you want to delete this post? This action cannot be undone.
                                    </Text>
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsDeleteDialogOpen(false)} // Close the dialog
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={"red.500"}
                                        color="white"
                                        _hover={{ bg: "red.600" }}
                                        onClick={() => {
                                            handleDelete();
                                            setIsDeleteDialogOpen(false); // Close the dialog after deletion
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </DialogRoot>
                        
                    </MenuContent>
                    )}
                </MenuRoot>
            </HStack> */}


            {/* Edit Dialog */}
            {/* <DialogRoot open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Input
                            placeholder="Edit Title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            mb={4}
                        />
                        <Input
                            placeholder="Edit Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            mb={4}
                        />
                        <Input
                            placeholder="Add a Tag"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                            mb={4}
                        />
                        <HStack spacing={2}>
                            {editTags.map((tag) => (
                                <Badge
                                    key={tag}
                                    colorScheme="blue"
                                    onClick={() => handleRemoveTag(tag)}
                                    _hover={{ bg: "red.200", cursor: "pointer" }}
                                >
                                    {tag} x
                                </Badge>
                            ))}
                        </HStack>
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={() => setIsEditDialogOpen(false)} variant="outline">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit} colorScheme="blue">
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot> */}

            {/* Delete Dialog */}
            {/* <DialogRoot open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Text>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </Text>
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={() => setIsDeleteDialogOpen(false)} variant="outline">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} colorScheme="red">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot> */}
