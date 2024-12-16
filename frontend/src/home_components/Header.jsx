// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Flex, IconButton, Text } from '@chakra-ui/react'
// import accountIcon from '../assets/account-icon.svg';
// import messageIcon from '../assets/message-icon.svg';
import React from 'react';
import { Box, Flex, HStack, Image, Menu, Text } from '@chakra-ui/react';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger, MenuSeparator, MenuItemGroup} from "../components/ui/menu";
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
// import { FaChevronDown } from "react-icons/fa";
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MakePostButton from './MakePostButton';
import { Avatar } from '../components/ui/avatar';




const Header = ({ setPosts, courses }) => {
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

    // const [posts, setPosts] = useState([]);

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

                {/* Center: Explore */}
                {/* <Text fontSize={"lg"} fontWeight={"bold"} color={"gray.500"}>
                    Explore
                </Text> */}

                {/* Right: Buttons, Notification Icon, Profile */}
                <HStack spacing={5} alignItems={"center"}>
                    {/* New Post Button */}
                    {/* <Button>
                        <IoIosAddCircleOutline /><Text color={'white'} fontWeight={'bold'}>{"New Post"}</Text>
                    </Button> */}

                    {/* <Button 
                        // colorScheme="blue"
                        // bg="blue.800"
                        _hover={{ bg: "blue.700" }}
                    >
                        <IoIosAddCircleOutline size={20} /><Text fontWeight="bold">New Post</Text>
                    </Button> */}

                    <MakePostButton setPosts={setPosts} courses={courses} />
                    
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
                            {/* <Button size="sm" variant="outline" width={"15vh"} _hover={{ bg: "blue.700" }}>
                            <Text fontWeight={"bold"}>Profile</Text><FaChevronDown />
                            </Button> */}
                            <Box cursor="pointer">
                                <Avatar size="sm" name="User" src="/assets/account-icon.svg" />
                            </Box>
                        </MenuTrigger>
                        <MenuContent>
                            <MenuItemGroup>
                                <MenuItem asChild value="settings" cursor="pointer">
                                    <RouterLink
                                        to={"/settings"}
                                    >
                                        Settings
                                    </RouterLink>
                                </MenuItem>
                            </MenuItemGroup>
                            <MenuSeparator />
                            <MenuItemGroup>
                                <MenuItem 
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

// ultility component for link styling within logo text
function LinkText({ children, color}) {
    return (
        <Text as="span" color={color}>
            {children}
        </Text>
    );
}