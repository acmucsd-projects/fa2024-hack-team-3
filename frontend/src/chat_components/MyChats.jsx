import React, {useState, useEffect} from 'react'
import { ChatState } from "../../Context/ChatProvider";
import axios from 'axios';
import {Box, Button, Text, Flex, Input, Stack} from "@chakra-ui/react";
import ChatLoading from './ChatLoading';
import {getSender} from "../../config/ChatLogic"
import GroupChatModal from "./miscellaneous/GroupChatModal"

const MyChats = ({fetchAgain}) => {

  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async() => {
      try{

          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,

            },
          };

  
          const {data} = await axios.get(`http://localhost:5000/api/chatpage`, config);
          setChats(data);
      }catch(error){
          console.log("Error");
          alert("Fail to fetchChats");
      }
  };

  useEffect(() => {
    setLoggedUser(localStorage.getItem("authUserId"));
    fetchChats();
  },[fetchAgain]);
  return (

    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      // bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        // fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >

        My Chats
        <GroupChatModal/>
          {/* <Button
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            >
            New Group Chat
            <IoMdAdd />
          </Button> */}
        
      </Box>

      <Box
        d="flex"
        flexDir="column"
        p={3}
        // bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >

          {chats ? (
            <Stack overflowY={'scroll'}>
              {chats.map((chat)=>(
                <Box 
                onClick={() => {
                  setSelectedChat(chat);
                  ;}}
                cursor="pointer"
                bg={selectedChat === chat ? "bg.buttons" : "bg.subtle"}
                color={selectedChat === chat ? "white" : "bg.DEFAULT"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                >
                  
                  <Text>
                    {!chat.isGroupChat ? (
                      chat.users && chat.users.length >= 2 && getSender(loggedUser, chat.users)
                    ) : chat.chatName}
                  </Text>
                  
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
      </Box>


    </Box>


  )
}

export default MyChats