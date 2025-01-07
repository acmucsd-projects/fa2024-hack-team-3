import React, { useState } from 'react';
import { FaBell } from "react-icons/fa";
import {Box, Button, Text, Flex, Input, } from "@chakra-ui/react";

import { Tooltip } from "../../components/ui/tooltip";
import { MenuContent,
         MenuItem,
         MenuItemCommand,
         MenuRoot,
         MenuTrigger} from "../../components/ui/menu";
import {
         DrawerBackdrop,
         DrawerBody,
         DrawerCloseTrigger,
         DrawerContent,
         DrawerFooter,
         DrawerHeader,
         DrawerRoot,
         DrawerTitle,
         DrawerTrigger,
        } from "../../components/ui/drawer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserListItem';
import {ChatState} from "../../../Context/ChatProvider"






const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { user, setSelectedChat, chats, setChats } = ChatState(); 



    const handleSearch =  async() => {
        if(!search || search.trim() === ""){
            alert("Please enter before searching");
            return;
        }

       
        try{
            setLoading(true);
      
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,

                },
            }


            console.log("Request URL:", `api/users?search=${search}`); // Logs the full request URL
            console.log("Request Headers:", config); // Logs the headers, including Authorization

            const { data } = await axios.get(`http://localhost:5000/api/users?search=${search}`, config);
            console.log("Search Results Data:", data);
            setSearchResult(data);
        }catch(error){
            console.log("Error");
            alert("Not Found or Your token is expired");
        }finally{
            setLoading(false);
        }

    };

    const accessChat = async(receiver_id) => {
        // console.log(userId);

        try{
            setLoading(true);
      
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            
            const { data } = await axios.post(`http://localhost:5000/api/chatpage`, {receiver_id}, config);
            
            if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            console.log(chats);
            setSelectedChat(data);
   
        }catch(error){
            console.log("Error");
            alert("Refresh your page for accessing chat");
        }finally{
            setLoading(false);
        }
    };

    return(
        <Box 
        
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="2px"
        borderColor="gray.200"
        borderRadius="md"
        >   
            <Flex justifyContent="space-between" alignItems="center" w="100%">
                
                <Tooltip label="Search Users for chat" hasArrow placement="bottom-end">
                    <Flex alignItems="center">

                        <DrawerRoot placement={"start"}>
                        <DrawerBackdrop />
                        <DrawerTrigger asChild>
                            <Button variant="ghost">
                                {/* <i className="fa-solid fa-magnifying-glass">Search</i> */}
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <Text display={{base: "none", md:"flex"}} px="4">
                                    Search User
                                </Text>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                            <DrawerTitle>Search User</DrawerTitle>
                            </DrawerHeader>
                            <DrawerBody>
                             <Box display="flex" pb={2}>
                                <Input 
                                    placeholder = "Search"
                                    mr = {2}
                                    value = {search}
                                    onChange= {(e) => setSearch(e.target.value)}
                                />

                                <Button
                                    onClick = {handleSearch}
                                > 
                                    Go

                                </Button>
                             </Box>
                             {loading ? 
                                <ChatLoading/>
                             :(
                                searchResult?.map((users) => (
                                    <UserListItem
                                        key={users._id}
                                        user = {users}
                                        handleFunction ={()=> accessChat(users._id)}
                                    />
                            
                                ))
                             )}
                            </DrawerBody>
                            <DrawerFooter>
                          
                            </DrawerFooter>
                            <DrawerCloseTrigger />
                        </DrawerContent>
                        </DrawerRoot>

                        <Link to={"/"}>
                            <Button colorScheme="blue" ml="1">
                                Back to Home
                            </Button>
                        </Link>
                    </Flex>
                </Tooltip>
                



                <Text fontSize="2xl" fontFamily="Work sans"> StudyBuddy Chat</Text>



                <MenuRoot>
                    <MenuTrigger asChild>
                        <Button variant="outline" size="sm" p={1}>
                            <FaBell />
                        </Button>
                        {/* <MenuContent> */}
                            {/* <MenuItem value="..." /> */}
                        {/* </MenuContent> */}
                    </MenuTrigger>
                </MenuRoot>
            </Flex>

        </Box>

        
        
    );

  
};

export default SideDrawer;