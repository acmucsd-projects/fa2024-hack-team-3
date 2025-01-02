import React, { useState, useEffect } from 'react';
import { Box, Text, Badge, HStack, VStack, Spacer, Button, Input, Stack, Field, defineStyle, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { formatDistanceToNow, format, isToday, isYesterday, set } from 'date-fns';
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
    const [visibleComments, setVisibleComments] = useState([]); // State for visible comments
    const [newComment, setNewComment] = useState(''); // State for new comment input
    const [loadingComments, setLoadingComments] = useState(false); // Loading state
    const [showAll, setShowAll] = useState(false); // State for showing all comments
    const [pseudoLoading, setPseudoLoading] = useState(false); // State for pseudo-loading
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

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
            setVisibleComments(response.data.slice(0, 3)); // Show only the first 3 comments initially
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setLoadingComments(false);
        }
    };

    // Show all comments with pseudo-loading
    const handleShowAllComments = () => {
        setPseudoLoading(true); // Show pseudo-loading
        setTimeout(() => {
            setVisibleComments(comments); // Show all comments
            setShowAll(true);
            setPseudoLoading(false); // Stop pseudo-loading
        }, 1000);
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
            setVisibleComments((prev) => [...prev, response.data].slice(0, showAll ? undefined : 3)); // Add new comment to the visible comments
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
    
      useEffect(() => {
        setVisibleComments(comments.slice(0, showAll ? undefined : 3));
      }, [comments, showAll]);

    const formatPostDate = (date, isEdited) => {
        const postDate = new Date(date);

        let formattedDate = "";
        if (isToday(postDate)) {
            formattedDate =  `Today at ${format(postDate, 'hh:mm a')}`;
        } else if (isYesterday(postDate)) {
            formattedDate = `Yesterday at ${format(postDate, 'hh:mm a')}`;
        } else {
            formattedDate =  format(postDate, 'MM/dd/yyyy, hh:mm a');
        }

        return isEdited  ? `${formattedDate} (edited)` : formattedDate;

    };

    const handleEditComment = async (id, updatedText) => {
        console.log("Attempting to save comment:", id, updatedText);
      
        if (!updatedText.trim()) {
          alert("Comment cannot be empty!");
          return;
        }
      
        try {
          const response = await axios.patch(
            `http://localhost:5000/api/posts/comments/${id}`,
            { text: updatedText },
            { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
          );
          console.log("Comment updated successfully:", response.data);
      
          // Update state
          setComments((prev) =>
            prev.map((c) => (c._id === id ? response.data : c))
          );
          setEditingCommentId(null);
          setEditingCommentText("");
        } catch (error) {
          console.error("Failed to edit comment:", error.message);
          alert("Failed to save the comment. Please try again.");
        }
      };
      

      const handleDeleteComment = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/comments/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            });
            setComments((prev) => prev.filter((c) => c._id !== id));
            setVisibleComments((prev) => prev.filter((c) => c._id !== id).slice(0, showAll ? undefined : 3));
            setDeleteConfirmId(null); // Reset the delete confirmation state
        } catch (error) {
            console.error('Failed to delete comment:', error.message);
        }
    };

    // Cancel editing
    const handleCancelEditComment = () => {
        setEditingCommentId(null);
        setEditingCommentText('');
        console.log("Edit canceled, resetting state.");
    };

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
                    {formatPostDate(post.createdAt, post.isEdited)}
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
                    <MenuItem onClick={() => setIsEditDialogOpen(true)} _hover={{ cursor: "pointer", bg: "bg.subtle"}}>
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
                        visibleComments.map((comment) => {
                            const isCommentOwner = comment.userId?._id === authUserId;
                            const isPostOwner = post.userId?._id === authUserId;
                            const displayUser = comment.userId?.username || 'Unknown User';
                            const userProfilePicture = comment.userId?.profilePicture || '';
                            const formattedDate = formatPostDate(comment.createdAt, comment.isEdited);

                            return (
                                <Box 
                                    key={comment._id} 
                                    p={2} 
                                    borderRadius="md" 
                                    bg="bg.muted" 
                                    boxShadow="sm"
                                    position="relative"
                                >
                                    <HStack paddingBottom={3} justify={"space-between"} align={"flex-start"}>
                                        <HStack>
                                            <Avatar size="xs" src={userProfilePicture} name={displayUser} />
                                            <Text fontSize="sm" fontWeight="bold" paddingRight={1}>{displayUser}</Text>
                                            <Text fontSize="sm" color="fg.subtle">{formattedDate}</Text>
                                        </HStack>
                                        
                                        {/* Menu Dropdown */}
                                        {(isCommentOwner || isPostOwner) && (
                                            <MenuRoot>
                                                <MenuTrigger asChild>
                                                    <Box _hover={{ cursor: editingCommentId || deleteConfirmId ? 'not-allowed' : 'pointer' }}>
                                                        <BsThreeDotsVertical />
                                                    </Box>
                                                </MenuTrigger>
                                                <MenuContent>
                                                    {isCommentOwner && (
                                                        <MenuItem
                                                            onClick={() => {
                                                                if (!deleteConfirmId) {
                                                                    setEditingCommentId(comment._id);
                                                                    setEditingCommentText(comment.text);
                                                                }
                                                            }}
                                                            _hover={{ 
                                                                cursor: deleteConfirmId ? 'not-allowed' : 'pointer',
                                                                opacity: deleteConfirmId ? 0.5 : 1,
                                                            }}
                                                            _disabled={!!deleteConfirmId}
                                                        >
                                                            Edit
                                                        </MenuItem>
                                                    )}
                                                    <MenuItem
                                                        onClick={() => {
                                                            if (!editingCommentId) { // Prevent delete when edit is active
                                                                setDeleteConfirmId(comment._id);
                                                            }
                                                        }}
                                                        _hover={{
                                                            cursor: editingCommentId ? 'not-allowed' : 'pointer',
                                                            opacity: editingCommentId ? 0.5 : 1,
                                                        }}
                                                        color="red.500"
                                                        disabled={!!editingCommentId}
                                                    >
                                                        Delete
                                                    </MenuItem>
                                                </MenuContent>
                                            </MenuRoot>
                                        )}
                                        
                                    </HStack>
                                    
                                    {editingCommentId === comment._id ? (
                                        <>
                                        <Textarea
                                            value={editingCommentText}
                                            onChange={(e) => setEditingCommentText(e.target.value)}
                                            autoFocus
                                            mb={2}
                                        />
                                        <HStack>
                                            <Button
                                                size="sm"
                                                colorScheme="blue"
                                                onClick={() => handleEditComment(comment._id, editingCommentText)}
                                            >
                                            Save
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={handleCancelEditComment}>
                                            Cancel
                                            </Button>
                                        </HStack>
                                        </>
                                    ) : (
                                        <Text>{comment.text}</Text>
                                    )}

                                    {/* Show confirmation buttons if deleteConfirmId matches the comment */}
                                        {deleteConfirmId === comment._id && (
                                            <HStack mt={2}>
                                                <Button
                                                    size="sm"
                                                    colorScheme="red"
                                                    onClick={() => handleDeleteComment(comment._id)} // Confirm delete action
                                                >
                                                    Confirm Delete
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setDeleteConfirmId(null)} // Cancel delete
                                                >
                                                    Cancel
                                                </Button>
                                            </HStack>
                                        )}
                                        {/* <Text fontSize="sm">{comment.text || 'No content available'}</Text> */}
                                </Box>
                            );
                        })
                    )}
                </Stack>
                
                {/* Show All Comments */}
                {/* {!showAll && comments.length > 3 && (
                    <Text
                        size="sm"
                        color={"blue.600"}
                        mt={3}
                        _hover={{ cursor: "pointer" }}
                        onClick={handleShowAllComments}
                        isLoading={pseudoLoading} // Show pseudo-loading spinner
                        loadingText="Loading..."
                    >
                        Show All Comments
                    </Text>
                )} */}

                {!showAll && comments.length > 3 && (
                    <Box
                        textAlign="center" // Center the text horizontally within the box
                        mt={3}
                    >
                        {pseudoLoading ? (
                            <Text
                                size="sm"
                                color="gray.500"
                            >
                                Loading...
                            </Text>
                        ) : (
                            <Text
                                size="sm"
                                color="blue.600"
                                _hover={{ cursor: "pointer", textDecoration: "underline" }}
                                onClick={handleShowAllComments}
                            >
                                Show All Comments
                            </Text>
                        )}
                    </Box>
                )}


                {/* Add Comment */}
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