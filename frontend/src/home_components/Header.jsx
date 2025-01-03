// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Flex, IconButton, Text } from '@chakra-ui/react'
// import accountIcon from '../assets/account-icon.svg';
// import messageIcon from '../assets/message-icon.svg';
import { useEffect, useState } from 'react';
import { Box, Flex, HStack, Image, Text, Icon } from '@chakra-ui/react';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger, MenuSeparator, MenuItemGroup} from "../components/ui/menu";
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaMoon, FaSun } from "react-icons/fa";
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MakePostButton from './MakePostButton';
import { Avatar } from '../components/ui/avatar';
import { jwtDecode } from 'jwt-decode';
import { Switch } from '../components/ui/switch';
import { ColorModeButton } from '../components/ui/color-mode';



const Header = ({ setPosts, courses, toggleColorMode, colorMode }) => {
    // Define custom styles for active and inactive links
    // const navLinkStyle = ({ isActive }) => ({
    //     fontWeight: isActive ? "bold" : "normal",
    //     textDecoration: isActive ? "none" : "underline",
    // });

    // return (
    //     <header className="header">
    //         <h1>StudyLink - Home</h1>
    //         <div className='header-icons'>
    //             {/* Account icon, no need for NavLink if it's not linking to another page*/}
    //             <img src={ accountIcon } alt='Account Icon' className='icon'/>

    //             {/* Use NavLink for the message icon to link to chat page */}
    //             <Link to='/chat'>
    //                 <img src={ messageIcon } alt='Message Icon' className='icon'/>
    //             </Link>
    //         </div>
    //     </header>
    // );
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
                        <Image src={logo} alt={"StudyLink Logo"} h={20} />
                        <Text
                            position="absolute"
                            top="50%"
                            left="140%"
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
                <HStack alignItems={"center"}>

                    <MakePostButton setPosts={setPosts} courses={courses}/>
                    
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
    );

};

export default Header;
