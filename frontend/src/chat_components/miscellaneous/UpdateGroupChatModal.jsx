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
            const {data} = await axios.put(`https://fa2024-hack-team-3-bwgb.onrender.com/api/chatpage/groupadd`, {
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
            const {data} = await axios.put(`https://fa2024-hack-team-3-bwgb.onrender.com/api/chatpage/groupremove`, {
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
            const {data} = await axios.put(`https://fa2024-hack-team-3-bwgb.onrender.com/api/chatpage/rename`, {
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
            const {data} = await axios.get(`https://fa2024-hack-team-3-bwgb.onrender.com/api/users?search=${query}`, config);
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
                fontSize={"3xl"}
                // fontFamily="Work sans"
                >
                    {selectedChat.chatName}
                </DialogTitle>
            </DialogHeader>
            <DialogBody />
                <Box d="flex" flexDirection="column" alignItems="center">
                    <Box w="100%" d="flex" flexWrap="wrap" pb={3} paddingLeft={6} marginTop={-6}>
                        {selectedChat.users.map((user) => (
                            <UserBadgeItem
                                key={user._id}
                                user={user}
                                // admin={selectedChat.groupAdmin._id}
                                handleFunction={() => handleRemoveUser(user)}
                            />
                        ))}

                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" paddingBottom={5} paddingLeft={7}>
                        <Input placeholder="Chat Name" value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} 
                            width={"50%"} paddingRight={5}
                        />
                        <Button
                        variant="solid"
                        colorScheme="teal"
                        color="white"
                        bg="bg.buttons"
                        ml={6}
                        isLoading={renameLoading}
                        onClick={handleRename}
                        _hover={{ bg: "blue.600" }}
                    >
                        Update Chat Name
                    </Button>
                    </Box>
                </Box>
                 <Box  flexDirection="column" alignItems="center"paddingLeft={7}>
                    <Input placeholder="Add User(s)" mb={1} onChange={(e) => handleSearch(e.target.value)} w={"50%"}/>
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