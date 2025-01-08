import React, { useState } from 'react'
import { Input, Box, Spinner} from '@chakra-ui/react';
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DialogActionTrigger
  } from "../../components/ui/dialog"
import { MdGroups } from "react-icons/md";
import { Button } from "../../components/ui/button";
import { ChatState } from "../../../Context/ChatProvider";
import UserBadgeItem from '../UserBadgeItem';
import axios from "axios";
import UserListItem from '../UserListItem';

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat} = ChatState();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    
    const handleAddUser = async (userToAdd) => {
        if(selectedChat.users.find((u) => u._id === userToAdd._id)) {
            alert("User already in the group");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put(`http://localhost:5000/api/chatpage/groupadd`, {
                chatId: selectedChat._id,
                userId: userToAdd._id,
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
        } catch (error) {
            alert("Error adding user");
        }finally {
            setLoading(false);
        }
       
        ;    
    }
    const handleRemoveUser = async (userToRemove) => {
       
        
        console.log(selectedChat.groupAdmin);
        console.log(selectedChat);
        if(selectedChat.groupAdmin[0]["_id"] === userToRemove._id && selectedChat.users.length > 1) {
            alert("Group Admin cannot be removed");
            return;
        }

        if(!selectedChat.groupAdmin[0]["_id"] === user._id) {
            alert("You are not the group admin");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put(`http://localhost:5000/api/chatpage/groupremove`, {
                chatId: selectedChat._id,
                userId: userToRemove._id,
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
        } catch (error) {
            alert("Error removing user");
        }finally {
            setLoading(false);
            setSearchResult([]);

        }

    }
    const handleRename = async () => {
        if(!groupChatName) {
            alert("Please enter a chat name");
            return;
        }

        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            console.log(localStorage.getItem("authToken"));
            const {data} = await axios.put(`http://localhost:5000/api/chatpage/rename`, {
                chatId: selectedChat._id,
                chatName: groupChatName,
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);

        } catch (error) {
            alert("Error renaming chat");
        }finally {
            setRenameLoading(false);
            setSearchResult([]);
        }
    }


    const handleSearch = async (query) => {
        setSearch(query);
        if(!search) {
            return;
        }   
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`http://localhost:5000/api/users?search=${query}`, config);
            setSearchResult(data);
        } catch (error) {
            alert("Error searching user");
        }finally {
            setLoading(false);
            setSearchResult([]);
        }
    }


  return (
    <>
    <DialogRoot >
   
        <DialogTrigger display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button variant={"ghost"} size={"icon"} >
                <MdGroups />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogCloseTrigger />
            <DialogHeader
            fontSize="35px"
            // fontFamily="Work sans"
            justifyItems="center"
            display="flex"
            >
                <DialogTitle
                fontSize="35px"
                // fontFamily="Work sans"
                >
                    {selectedChat.chatName}
                </DialogTitle>
            </DialogHeader>
            <DialogBody />
                <Box d="flex" flexDirection="column" alignItems="center">
                    <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                        {selectedChat.users.map((user) => (
                            <UserBadgeItem
                                key={user._id}
                                user={user}
                                // admin={selectedChat.groupAdmin._id}
                                handleFunction={() => handleRemoveUser(user)}
                            />
                        ))}

                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Input placeholder="Chat Name" value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} />
                        <Button
                        variant="solid"
                        colorScheme="teal"
                        ml={1}
                        isLoading={renameLoading}
                        onClick={handleRename}
                    >
                        Update Chat Name
                    </Button>
                    </Box>
                </Box>
                 <Box display="flex" flexDirection="column" alignItems="center">
                    <Input placeholder="Adding User" mb={1} onChange={(e) => handleSearch(e.target.value)} />
                    {loading ? (
                        <Spinner size="lg" />
                    ) : (
                        searchResult?.map((user) => (
                            <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() => handleAddUser(user)}
                            />
                        ))
                    )}
                 </Box>
                 
            <DialogFooter>
                <Button
                variant="solid"
                color="white"
                bg="red"
                onClick={() => handleRemoveUser(user)}
                >
                    Leave Group
                </Button>
            </DialogFooter>
            
        </DialogContent>
        
    </DialogRoot>
    </>
  )
}

export default UpdateGroupChatModal