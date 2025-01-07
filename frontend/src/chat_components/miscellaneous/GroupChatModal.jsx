import React, { useEffect } from 'react'
import { Input, Stack, Box} from "@chakra-ui/react"
import { Button } from "../../components/ui/button"
import { IoMdAdd } from "react-icons/io";
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
import { Field } from "../../components/ui/field"
import { useState} from "react"
import {ChatState} from "../../../Context/ChatProvider"
import axios from "axios"

import UserListItem from '../UserListItem';
import UserBadgeItem from '../UserBadgeItem';


const GroupChatModal = () => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const { user, chats, setChats } = ChatState();



  const handleSearch = async(query) => {

    if (!query || query.trim() === "") {
     
      return;
    }
    setSearch(query);



    try{
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const { data } = await axios.get(`http://localhost:5000/api/users?search=${query}`, config);
      

      setSearchResult(data);
      // console.log(searchResult);
    }catch(error){
      alert("Error in GroupChatModal");
    }finally{
      setLoading(false);
    
    }
    
  }

  // const debouncedSearch = debounce(handleSearch, 500); 
  // const handleInputChange = (e) => {
  //   debouncedSearch(e);
  // };


  const handleSubmit = async() => {
    if (!groupChatName || !selectedUsers) {
      alert("Please fill all the fields");
      return;
    }
    if(selectedUsers.length < 2){
      alert("We need at least 2 members in a groupchat");
      return;
    }
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      }
      const {data} = await axios.post(`http://localhost:5000/api/chatpage/group`, {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map(user => user._id))
      }, config);

      setChats([data, ...chats])
      alert("Success in Creating Group Chat");
    }catch(error){
      alert("Error in Creating Group Chat");
    }
  }

  const handleGroup = async(userToAdd) => {
    if(selectedUsers.find((user) => user._id === userToAdd._id)){
      alert("User already added")
      return;
    }
   setSelectedUsers([...selectedUsers, userToAdd]);

  }

  const handleRemove = (userToRemove) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userToRemove._id));
  }

  return (
    <DialogRoot >
    <DialogTrigger asChild>
      <Button variant="outline" d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              >New Group Chat <IoMdAdd />
      </Button>
      
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Group Chat</DialogTitle>
      </DialogHeader>
      <DialogBody pb="4">

        <Stack gap="4">
          <Field >
            <Input
             placeholder="Group Chat Name"
             mb = {3}
             onChange= {(e) => setGroupChatName(e.target.value)}
            />
          </Field>

          <Field >
            <Input  
            placeholder="Add Users"
            mb = {1}
            
            onChange= {(e) =>{
              // handleInputChange(e.target.value);
              handleSearch(e.target.value);
              }}
            />
          </Field>

          <Box w="100%" d="flex" flexWrap="wrap">
            {selectedUsers.map((user) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                handleFunction={() => handleRemove(user)}
              />
            ))}
           </Box>

          {loading ?<>loading</> : (
            searchResult?.slice(0.4).map(user =>
              <UserListItem
              key={user._id}
              user = {user}
              handleFunction={() => handleGroup(user)}
              />
              
            )
          )}
        </Stack>
      </DialogBody>
      <DialogFooter>
        <DialogActionTrigger asChild>
          <Button 
          variant="outline"
          onClick={handleSubmit}
          >Submit</Button>
        </DialogActionTrigger>

      </DialogFooter>
    </DialogContent>
  </DialogRoot>
  )
}

export default GroupChatModal;