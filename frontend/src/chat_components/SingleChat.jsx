import React, {useState, useEffect} from 'react'
import {ChatState} from "../../Context/ChatProvider";
import {Box, Text, Spinner, Input} from "@chakra-ui/react";
import {getSender, getSenderProfile} from "../../config/ChatLogic";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import {Field} from "../components/ui/field";
import axios from "axios";
import "./style.css";
import ScrollableChat from "./ScrollableChat";
import system from '../theme'
import { ChakraProvider } from "@chakra-ui/react"
import io from "socket.io-client";
import animationData from "./animation/typing.json";
import Lottie from "react-lottie";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const {selectedChat, setSelectedChat, user, notification, setNotification} = ChatState();
    const [newMessage, setnewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    useEffect(() => {
        socket = io(ENDPOINT);
        console.log(user);
        socket.emit("setup", localStorage.getItem("authUserId"));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
        socket.on("connected", () => {
            setSocketConnected(true);
            console.log("Successfully connected to the server");
        });
    }, []);

    const fetchMessages = async() => {
        if(!selectedChat) return;
      
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            
            const {data} = await axios.get(`https://fa2024-hack-team-3-bwgb.onrender.com/api/message/${selectedChat._id}`, config);
            // console.log(data);
            setMessages(data);
            
        }catch(error) {
            alert("Error fetching messages");
        }finally {
            setLoading(false);
            console.log(selectedChat._id);
            socket.emit("join chat", selectedChat._id);
        }


    };

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);


    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                if(!notification.includes(newMessageReceived.chat._id)) {
                    setNotification([...notification, newMessageReceived]);
                    setFetchAgain(!fetchAgain);
                }
            }else{
                setMessages([...messages, newMessageReceived]);
            }
        });
    }, [socketConnected]);

    const sendMessage = async(event) => {
        if(event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                setLoading(true);
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                };

                setnewMessage("");
                const {data} = await axios.post("https://fa2024-hack-team-3-bwgb.onrender.com/api/message", {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

               
                socket.emit("New Message", data);
                setMessages([...messages, data]);
            }catch(error) {
                alert("Error sending message");
            }finally {
                setLoading(false);
               
            }
        }
    };


   

    const typingHandler = (e) => {
        setnewMessage(e.target.value);
        if(!socketConnected) return;

        
        if (!typing) {
            setTyping(true);
            console.log(typing);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();

        setTimeout(() => {
            const timeNow = new Date().getTime();
            if(timeNow - lastTypingTime >= 3000 && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, 3000);

      
        
    };


    return (
        <ChakraProvider value={system}>
            {selectedChat ? (
                
                <>
                
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    // fontFamily="Work sans"
                    d="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                {selectedChat.isGroupChat ? (
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} 
                    />
                    </Box>
                ) : (
                    <Box>
                        {getSender(user._id, selectedChat.users)} 
                        <span style={{ marginLeft: '5px', fontSize: '15px', color: 'white', backgroundColor: '#173F5F', borderRadius: '5px', padding: '2px'}}>
                            {getSenderProfile(user._id, selectedChat.users)}
                        </span>
                    </Box>
                )
                }
                    
                </Text>
              
                <Box
                    display="flex "
                    flexDirection="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="bg.chat"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                   {loading ? (
                     <Spinner   
                     size="xl"
                     w={20}
                     h={20}
                     margin="auto"
                     alignItems={"center"}/>

                   ):(
                    <div className='messages' >
                         <ScrollableChat messages={messages} />
                    </div>
                   )}
                </Box>
                        <Field 
                            onKeyDown={sendMessage}
                            id="first-name"
                            isRequired
                            mt={3}>
                            {isTyping ? 
                            <div>
                                <Lottie
                                options={defaultOptions}
                               
                                width={70}
                                style={{ marginBottom: 15, marginLeft: 0 }}/>
                            </div> : <></>}
                            <Input
                                variant="filled"
                                bg="bg.DEFAULT"
                                alignItems={"bottom"}
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </Field>

                </>
            ) : (
                <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3xl" pb={3} fontWeight="bold">
                    No Chat Selected 
                </Text>
                </Box>
            )}
        </ChakraProvider>
    )
    }

export default SingleChat