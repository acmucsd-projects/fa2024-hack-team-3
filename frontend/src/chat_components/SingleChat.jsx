import React, {useState, useEffect} from 'react'
import {ChatState} from "../../Context/ChatProvider";
import {Box, Text, Spinner, Input} from "@chakra-ui/react";
import {getSender, getSenderProfile} from "../../config/ChatLogic";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import {Field} from "../components/ui/field";
import axios from "axios";
import "./style.css";
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const {selectedChat, setSelectedChat, user} = ChatState();
    const [newMessage, setnewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchMessages = async() => {
        if(!selectedChat) return;

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            
            const {data} = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, config);
            // console.log(data);
            setMessages(data);

        }catch(error) {
            alert("Error fetching messages");
        }finally {
            setLoading(false);
        }


    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    const sendMessage = async(event) => {
      
        if(event.key === "Enter" && newMessage) {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                };

                setnewMessage("");
                const {data} = await axios.post("http://localhost:5000/api/message", {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

                console.log(data);
               
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
      
        
    };


    return (
        <>
            {selectedChat ? (
                
                <>
                
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    fontFamily="Work sans"
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
                        Chat with {getSender(user._id, selectedChat.users)} 
                        <span style={{ marginLeft: '5px', fontSize: '15px', color: 'white', backgroundColor: '#173F5F', borderRadius: '5px', padding: '2px'}}>
                            {getSenderProfile(user._id, selectedChat.users)}
                        </span>
                    </Box>
                )
                }
                    
                </Text>
              
                <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
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
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                alignItems={"bottom"}
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </Field>

                </>
            ) : (
                <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                    Click on a user to start chatting
                </Text>
                </Box>
            )}
        </>
    )
    }

export default SingleChat