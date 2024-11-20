import React from 'react';
import Navbar from '../login_register_components/Navbar';
import { Box, Container, Flex, Stack, Image, VStack, Heading, Text, Input, Button} from '@chakra-ui/react';
import { Field } from "../components/ui/field"
import logo from '../assets/logo.svg';
import InputField from '../login_register_components/InputField';
// import ImageSection from '../login_register_components/ImageSection';

const LoginPage = () => {
    return (
        <Box>
            <Navbar />
            <Flex
                h="90vh"
                maxH="90vh"
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
                >
                    <VStack spacing={4} align="flex" px={{base: 4,lg: 10}} ml={{lg: "20"}}>
                            <Heading size={"3xl"} mb={2} textAlign="left" color={"black"} fontWeight={"bold"}>
                                We've Missed You!
                            </Heading>
                            <Text color={"gray.800"} textAlign={"left"} fontSize={"xl"} fontWeight={"medium"}>
                                Many study buddies are waiting to study with you!
                            </Text>
                            <InputField label={"Username"} color={"gray.800"} required width={{base: "100%", lg: "50%"}}/>
                            <InputField label={"Password"} color={"gray.800"} required width={{base: "100%", lg: "50%"}}/>
                            <Box width={{base: "100%", lg: "50%"}} textAlign="center" mt="1em">
                                <Button variant="solid" bg={'blue.800'} _hover={{bg: "blue.700"}} width="100%">
                                    <Text fontWeight={"bold"}>
                                        LOGIN
                                    </Text>
                                </Button>
                            </Box>
                            <Text textAlign={"left"} color={"gray.500"} pb="4"><a href='#'>Forgot Password?</a></Text>
                            <Text textAlign={"center"} color={'gray.500'}>Need an Account? <a href='register'><u>SIGN UP</u></a></Text>
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

export default LoginPage


{/* <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight="calc(100vh - 60px)" bg="gray.100">
                <Stack direction={{base: 'column', md: 'row'}} maxW="5xl" borderRadius="lg" overflow="hidden" bg="white">
                    <>HELLO</>
                    <>HI</>
                    <>YES</>
                </Stack>
            </Box> */}