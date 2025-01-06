import React, { useState } from 'react';
import Navbar from '../login_register_components/Navbar';
import { Box, Container, Flex, Stack, Image, VStack, Heading, Text, Button} from '@chakra-ui/react';
import { Toaster, toaster } from '../components/ui/toaster';
import logo from '../assets/logo.svg';
import InputField from '../login_register_components/InputField';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {

    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => console.log(tokenResponse),
    // });

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    // Handle login
    const handleLogin = async () => {
        const { username, password } = formData;

        if (!username || !password) {
            setError("Please provide both username and password");
            return;
        }

        try {
            // Send login request to backend
            const response = await axios.post("http://localhost:5000/api/users/login", {
                username,
                password,
            });

            localStorage.setItem("authToken", response.data.token); // Save token to localStorage
            localStorage.setItem("authUserId", response.data.userId); // Save use   rId to localStorage
            // If login is successful
            toaster.create({
                title: "Login Successful!",
                description: `Welcome back, ${username}!`,
                duration: 3000,
                status: "success",
                isClosable: true,
                type: "success"
            });

            // Clear form data
            // setFormData({
            //     username: "",
            //     password: "",
            // });

            setTimeout(() => {navigate("/")}, 2000);
        } catch (err) {
            console.error("Login Error: ", err);
            setError(err.response?.data?.error || "An error occurred. Please try again.");
        }
    }

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission behavior
            handleLogin();
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
                    // maxH={"90%"}
                    h={{base: "100vh", md: "90%"}}

                >
                <form onKeyDown={handleKeyPress}>
                    <VStack spacing={4} align="flex" px={{base: 4,lg: 10}} ml={{lg: "0"}}>
                            <Heading size={"3xl"} mb={2} textAlign="left" color={"black"} fontWeight={"bold"}>
                                Login to StudyLink
                            </Heading>
                            <Text color={"gray.800"} textAlign={"left"} fontSize={"xl"} fontWeight={"medium"}>
                                Your Connection to Smarter Collaboration
                            </Text>

                            {/* Username Field */}
                            <InputField 
                                label={"Username"} 
                                name={"username"}
                                value={formData.username}
                                color={"gray.800"} 
                                onChange={handleChange}
                                required 
                                width={{base: "100%", lg: "80%"}}
                                
                            />

                            {/* Password Field */}
                            <InputField 
                                label={"Password"} 
                                name={"password"}
                                type={"password"}
                                value={formData.password}
                                color={"gray.800"} 
                                required 
                                width={{base: "100%", lg: "80%"}}
                                onChange={handleChange}
                            />

                            {/* Error Message */}
                            { error && (
                                <Text color={"red.500"} textAlign={"left"} fontSize={"md"} fontWeight={"medium"}>
                                    {error}
                                </Text>
                            )}

                            {/* Login Button */}
                            <Box width={{base: "100%", lg: "80%"}} textAlign="center" mt="1em">
                                <Button 
                                    variant="solid" 
                                    bg={'blue.800'} 
                                    _hover={{bg: "blue.700"}} 
                                    width="100%"
                                    onClick={handleLogin}
                                >
                                    <Text fontWeight={"bold"} color="white">
                                        LOGIN
                                    </Text>
                                </Button>
                            </Box>
                            {/* <Text textAlign={"left"} color={"gray.500"} pb="4"><a href='#'>Forgot Password?</a></Text> */}
                            <Text textAlign={"left"} color={'gray.500'}>Need an Account? <Text as={Link} to={'/register'} textDecoration="underline">Register</Text>

                            </Text>
                            
                            {/* <GoogleLogin 
                                onSuccess={(credentialResponse) => {
                                    const decoded = jwtDecode(credentialResponse.credential);
                                    console.log(decoded);
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                }}

                            /> */}

                            {/* <Button onClick={() => login()}> Sign in with Google</Button> */}
                    </VStack>
                    </form>
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

export default LoginPage

