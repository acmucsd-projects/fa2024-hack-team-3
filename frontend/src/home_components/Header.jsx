
import { useEffect, useState } from 'react';
import { Box, Flex, HStack, Image, Text, Icon, Button } from '@chakra-ui/react';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger, MenuSeparator, MenuItemGroup} from "../components/ui/menu";
import logo from '../assets/logo.svg';
import studybuddylogo_dark from '../assets/studybuddylogo_dark.svg';
import studybuddylogo_light from '../assets/studybuddylogo_light.svg';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaMoon, FaSun } from "react-icons/fa";
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MakePostButton from './MakePostButton';
import { Avatar } from '../components/ui/avatar';
import { jwtDecode } from 'jwt-decode';
import { Switch } from '../components/ui/switch';
import { useColorMode, ColorModeButton } from '../components/ui/color-mode';

import system from '../theme';
import { ChakraProvider } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';


const Header = ({ setPosts, courses }) => {
    const { colorMode } = useColorMode();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        username: "User",
        profilePicture: "/assets/account-icon.svg",
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserInfo({
                username: decodedToken.username,
                profilePicture: decodedToken.profilePicture || "/assets/account-icon.svg",
            });
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Clear token
        navigate("/login"); // Redirect to login page
    }
      
    return (
        <ChakraProvider value={system}>
        <Box 
            // px={4} 
            // py={3} 
            // bg={"white"} 
            zIndex={2}
            // borderBottomColor={"gray.200"}
            borderBottomWidth={"1.5px"}
            margin={"0"}
            px={"0"}
            paddingTop={"0"}
            paddingBottom={3}
            maxW={{base: "97vw", lg: "100vw"}}
        >
            <Flex 
                maxH={"9vh"} 
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{ base: "row", sm: "row" }}
            >
                <HStack spacing={2} as={Link} to={"/"}>
                    {/* Left: Logo Container */}
                    <Box position="relative" display="inline-block">
                        <Image 
                            src={colorMode === "dark" ? studybuddylogo_light : studybuddylogo_dark}
                            alt={"StudyLink Logo"} 
                            h={14} />
                        <Text
                            position="absolute"
                            top="50%"
                            left="130%"
                            transform="translate(-50%, -50%)"
                            fontSize="lg"
                            // color="black" // Ensure the text is visible
                            display={{ base: "none", sm: "flex"}}
                        >
                            Study<Text as='span' fontWeight="bold">Link</Text>
                        </Text>
                    </Box>
                </HStack>
                
                {/* Right: Buttons, Notification Icon, Profile */}
                <HStack alignItems={"center"} spaceX={2}>
                
                    <MakePostButton setPosts={setPosts} courses={courses}/>
                    <Link to={"/chat"}>
            {/* <Button colorScheme="blue" md="12">
              Chat with Buddies
                        </Button> */}
                        <FontAwesomeIcon 
                            icon={faComments} 
                            style={{
                                color: "093a80",
                                transition: 'color 500ms',
                            }} 
                            
                            size="xl"
                            onMouseOver={(e) => (e.target.style.color = '#2563eb')} 
                            onMouseOut={(e) => (e.target.style.color = '#093a80')}
                            />
                    </Link>
                    {/* Notification Icon */}
                    {/* <Box position={"relative"}>
                        <GoBell />
                        <Badge
                            position="absolute"
                            top="-4px"
                            right="-4px"
                            fontSize="xs"
                            colorScheme="blue"
                            borderRadius="full"
                        >
                            0
                        </Badge>
                    </Box> */}

                    {/* Profile Dropdown */}
                    <MenuRoot >
                        <MenuTrigger asChild>
                            <HStack cursor="pointer">
                                <Avatar 
                                    size="sm" 
                                    name={userInfo.username}
                                    src={userInfo.profilePicture}
                                />
                                <Box>
                                    <FaChevronDown size={12}/>
                                </Box>
                            </HStack>
                        </MenuTrigger>
                        <MenuContent>

                            
                            <MenuItemGroup>
                                {/* Dark/Light Mode Switch */}
                                <Box marginLeft={1} paddingBottom={1}>
                                    <ColorModeButton />
                                </Box>

                                {/* Profile */}
                                <MenuItem asChild value="profile" cursor="pointer" _hover={{ bg: "bg.menu"}}>
                                    <RouterLink
                                        to={"/profile"}
                                    >
                                        Profile
                                    </RouterLink>
                                </MenuItem>

                                {/* Account Settings */}
                                <MenuItem asChild value="settings" cursor="pointer" _hover={{ bg: "bg.menu"}}>
                                    <RouterLink
                                        to={"/settings"}
                                    >
                                        Settings
                                    </RouterLink>
                                </MenuItem>
                            </MenuItemGroup>
                            <MenuSeparator />
                            <MenuItemGroup>

                                {/* Logout Button */}
                                <MenuItem 
                                    _hover={{ bg: "bg.menu"}}
                                    value="logout"
                                    onClick={handleLogout}
                                    cursor="pointer"
                                >
                                    Logout
                                </MenuItem>
                            </MenuItemGroup>
                        </MenuContent>
                    </MenuRoot>

                </HStack>

            </Flex>
        </Box>
        </ChakraProvider>
    );

};

export default Header;
