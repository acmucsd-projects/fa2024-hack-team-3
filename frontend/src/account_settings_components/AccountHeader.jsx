import React, {useEffect, useState} from "react";
import { Flex, VStack, Input, Container, Text, HStack, Button } from "@chakra-ui/react";
import { Avatar} from "../components/ui/avatar"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";

const AccountHeader = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    profilePicture: "",
    id: "",
  });

  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  // Update the new username on input change
  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
        const decodedToken = jwtDecode(token);
        setUserInfo({
            username: decodedToken.username,
            profilePicture: decodedToken.profilePicture || "/assets/account-icon.svg",
            id: decodedToken.id,
        });
        setNewUsername(decodedToken.username);
    } else {
        navigate("/login");
    }
  }, [navigate]);

  const handleSave = async () => {
    setError("");

    if (newUsername === userInfo.username) {
      setError("Must be new username");
      return;
    }

    try {
      // Check if the new username is already taken
      const checkResponse = await axios.post(
        "https://localhost:5000/api/users/check-username",
        { username: newUsername }
      );

      if (checkResponse.data.exists) {
        setError("Username already taken");
        return;
      }

      // Update username in backend
      const updateResponse = await axios.patch(`https://localhost:5000/api/users/${userInfo.id}`, 
        { username: newUsername }
      );

      const newToken = updateResponse.data.token;
      localStorage.setItem("authToken", newToken);

      // Update the user info in the state
      setUserInfo((prev) => ({
        ...prev,
        username: newUsername,
      }));

      // Show success message
      alert("Username updated successfully");
    } catch (err) {
      console.error("Error updating username:", err);
      setError("Error updating username");
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("profile-picture-input").click();
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`https://localhost:5000/api/users/${userInfo.id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      const { profilePicture, token } = response.data;

      // Update local state
      setUserInfo((prev) => ({
        ...prev,
        profilePicture,
      }));

      // Update token with new profilePicture
      localStorage.setItem("authToken", token);

      alert("Profile picture updated successfully");
    } catch (err) {
      console.error("Error uploading profile picture: ", err);
    }
  };

  return (
    <Flex
      direction="row"
      justify="center" // Centers horizontally
      h="10vh" // Full screen height
    >
      <VStack>
      <Avatar 
          size="2xl" 
          mt={1}
          name={userInfo.username}
          src={userInfo.profilePicture}
          _hover={{ cursor: "pointer" }}
          onClick={handleAvatarClick}
        />
      <input 
        type="file"
        id="profile-picture-input"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <Text 
        textStyle={"xs"} 
        onClick={handleAvatarClick}
        _hover={{ cursor: "pointer" }}
      >
        edit
      </Text>
      </VStack>
        <VStack align="justify" ml={6}> {/* Adds spacing between Avatar and the inputs */}
            <Text fontSize="lg" fontWeight="bold" mb={-1}>
                Username
            </Text>
            <HStack>
              <Input 
                value={newUsername}
                onChange={handleUsernameChange}
                w="150px" 
                bg={"bg.muted"}
              />
            <Button 
              w={"1px"}
              _hover={{bg: "blue.600"}}
              onClick={handleSave}
              background={"bg.buttons"}
              color={"white"}
            >
                <FaRegSave/>
            </Button>
            </HStack>
            <Text color="red.500" textStyle={"sm"}>{error}</Text>
        </VStack>
    </Flex>
  );
};

export default AccountHeader;
