
import { Box, Flex, HStack, Image, Text, Button } from "@chakra-ui/react";
import NavButton from "./NavButton";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import system from '../theme'
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import  {ChakraProvider} from "@chakra-ui/react";
import studybuddylogo_dark from '../assets/studybuddylogo_dark.svg';
import studybuddylogo_light from '../assets/studybuddylogo_light.svg';

const Navbar = () => {
    const { colorMode } = useColorMode();
    return (
        <ChakraProvider value={system}>
        <Box 
            px={4} 
            py={3} 
            // bg={"white"} 
            zIndex={2}
            // borderBottomWidth={"1.5px"}
        >
                
            <Flex
                maxH={"9vh"} 
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{ base: "row", sm: "row" }}
            >
                <HStack spacing={2} as={Link} to={"/"}>
                    {/* Logo Container */}
                    <Box position="relative" display="inline-block">
                        <Image 
                            src={colorMode === "dark" ? studybuddylogo_light : studybuddylogo_dark}
                            alt={"StudyLink Logo"} 
                            h={14} 
                        />
                        <Text
                            position="absolute"
                            top="50%"
                            left="130%"
                            transform="translate(-50%, -50%)"
                            fontSize="lg"
                            // color="black" // Ensure the text is visible
                            display={{ base: "none", sm: "flex"}}
                        >
                            Study<LinkText color={"black.500"}>
                                    <Text as='span' fontWeight="bold">
                                        Link
                                    </Text>
                                </LinkText>
                        </Text>
                    </Box>
                </HStack>

                <HStack spacing={2} alignItems={"center"}>
                    <Button as={Link} to={'/register'} variant="solid" bg={'bg.buttons'} _hover={{bg: "blue.600"}}>
                        <FiUserPlus style={{color: "white"}}/><Text color={'white'} fontWeight={'bold'}>{"Register"}</Text>
                    </Button>
                    <NavButton to={"/login"} label={"Login"} bg={'gray.200'} col={'blue.800'}/>
                </HStack>
            </Flex>
        </Box>
        </ChakraProvider>
    )
};

export default Navbar;

// ultility component for link styling within logo text
function LinkText({ children, color}) {
    return (
        <Text as="span" color={color}>
            {children}
        </Text>
    );
}