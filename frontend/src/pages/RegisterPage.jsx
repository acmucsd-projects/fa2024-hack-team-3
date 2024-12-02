import React from 'react';
import { useState } from 'react';
import Navbar from '../login_register_components/Navbar';
import { Box, Container, Flex, Stack, Image, VStack, Heading, Text, Input, Button} from '@chakra-ui/react';
import { Toaster, toaster } from '../components/ui/toaster';
import { Field } from "../components/ui/field"
import logo from '../assets/logo.svg';
import InputField from '../login_register_components/InputField';
// import ImageSection from '../login_register_components/ImageSection';
import {GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    // State for form fields
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value}); // Update the form data
    }

    // Handle form submission
    const handleSubmit = async () => {
        const { username, email, password, confirmPassword } = formData;

        console.log({
            username,
            emailAddress: email,
            password,
        })

        if (password !== confirmPassword) {
            toaster.create({
                title: "Passwords do not match",
                description: "Please make sure your passwords match.",
                duration: 3000,
                status: "error",
                isClosable: true
            });
            return;
        }

        try {
            // Make API call to register user
            const response = await axios.post("http://localhost:5000/api/users", {
                username,
                emailAddress: email,
                password,
            });

            // Show success toast
            toaster.create({
                title: "Registration Successful!",
                description: `Welcome, ${response.data.username}! Redirecting back to Login Page ...`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Clear form data
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {navigate("/login")}, 3000);
        } catch (err) {
            // Show error toast
            const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
            toaster.create({
                title: "Registration Failed",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box>
            <Toaster />
            <Navbar />
            <Flex
                h="90%"
                maxH="90%"
                align="center"
                justify="center"
                bg="gray.100"
                direction={{ base: "col", lg: "row" }}
            >
                {/* Form Section */}
                <Container
                    flex={{ base: 2}}
                    p={8}
                    borderRadius="lg"
                    mx="4"
                    maxH={"90%"}
                >
                    <VStack spacing={4} align="flex-start" px={{base: 4, lg: 10}} ml={{lg: "0"}}>
                            <Heading size={"3xl"} mb={2} textAlign="left" color={"black"} fontWeight={"bold"}>
                                Study With Us!
                            </Heading>
                            <Text color={"gray.800"} textAlign={"left"} fontSize={"xl"} fontWeight={"medium"} maxW={{lg: "80%"}}>
                                Stuck on an assignment? Or need someone to motivate you to keep studying? Come study with us!
                            </Text>
                            <InputField 
                                label={"Username"}
                                name={"username"}
                                value={formData.username}
                                onChange={handleChange}
                                color={"gray.800"}
                                required
                                width={{base: "100%", lg: "80%"}}
                            />
                            <InputField 
                                label={"Email"} 
                                name={"email"}
                                value={formData.email}
                                onChange={handleChange}
                                color={"gray.800"} 
                                required 
                                width={{base: "100%", lg: "80%"}}
                            /> 
                            <InputField 
                                label={"Password"} 
                                name={"password"}
                                type={"password"}
                                value={formData.password}
                                onChange={handleChange}
                                color={"gray.800"} 
                                required 
                                width={{base: "100%", lg: "80%"}}
                            />
                            <InputField 
                                label={"Confirm Password"} 
                                name={"confirmPassword"}
                                type={"password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                color={"gray.800"} 
                                required 
                                width={{base: "100%", lg: "80%"}}/>
                            <Box width={{base: "100%", lg: "80%"}} textAlign="center" mt="1em" >
                                <Button variant="solid" bg={'blue.800'} _hover={{bg: "blue.700"}} width="100%"
                                    onClick={handleSubmit}
                                >
                                    <Text fontWeight={"bold"}>
                                        REGISTER
                                    </Text>
                                </Button>
                            </Box>
                            <Text textAlign={"left"} color={'gray.500'} pt={4}>Already have an account? <a href='login'><u>LOGIN</u></a></Text>
                            <GoogleLogin 
                                onSuccess={(credentialResponse) => {
                                    const decoded = jwtDecode(credentialResponse.credential);
                                    console.log(decoded);
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                }}

                            />
                    </VStack>
                </Container>
                <Box 
                    display={{ base: "none", md: "flex" }}
                    flex={{base: 0, md: 3 }} // Image section takes more space on large screens
                    alignItems="center"
                    justifyContent="center"
                    bg="gray.100" // Optional for visual clarity
                >
                    <Image
                        src={logo}
                        alt="Study Illustration"
                        // maxW="90%"
                        objectFit={"contain"}
                        h="90vh"
                        p={4}
                        zIndex={1}
                    />
                </Box>


            </Flex>
        </Box>
    )
}

export default RegisterPage

