
import { Box, Flex, HStack, Image, Text, Button } from "@chakra-ui/react";
import NavButton from "./NavButton";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";

const Navbar = () => {
    return (
        <Box px={4} py={3} bg={"white"}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{ base: "column", sm: "row" }}
            >
                <HStack spacing={2} as={Link} to={"/"}>
                    {/* Logo Container */}
                    <Box position="relative" display="inline-block">
                        <Image src={logo} alt={"StudyLink Logo"} h={20} />
                        <Text
                            position="absolute"
                            top="50%"
                            left="140%"
                            transform="translate(-50%, -50%)"
                            fontSize="lg"
                            color="black" // Ensure the text is visible
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
                    <Button as={Link} to={'/register'} variant="solid" bg={'blue.800'}>
                        <FiUserPlus style={{color: "white"}}/><Text color={'white'} fontWeight={'bold'}>{"Register"}</Text>
                    </Button>
                    <NavButton to={"/login"} label={"Login"} bg={'gray.200'} col={'blue.800'}/>
                </HStack>
            </Flex>
        </Box>
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