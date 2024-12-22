import React, { useState } from "react";
import { VStack, Container, Input, Text, Button } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import axios from "axios";

const PasswordForm = () => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (password) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      return "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    return "";
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please provide all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword === currentPassword) {
      setError("New password must be different.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        "http://localhost:5000/api/users/change-password",
        { currentPassword, newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Successfully updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password.");
    }
  };

  return (
    <VStack spacing={4} align="start" flex="1">
      <Container>
        <Text fontSize="lg" fontWeight="bold">
          Change Password
        </Text>
        <Input
          placeholder="Current Password" 
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          maxW="100%"
        />
      </Container>
      <Container>
        <Input 
          placeholder="New Password" 
          type="password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          maxW="100%"
        />
      </Container>
      <Container>
        <Input 
          placeholder="Retype New Password" 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxW="100%"/>
      </Container>
      <Container>
        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}
        <Button 
          onClick={handleSubmit}
          _hover={{ bg: "blue.600" }}
        >
          Save
        </Button>
      </Container>
      
    </VStack>
  );
};

export default PasswordForm;
