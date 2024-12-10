import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, IconButton, Text } from '@chakra-ui/react'
import accountIcon from '../assets/account-icon.svg';
import messageIcon from '../assets/message-icon.svg';

const Header = () => {
    // Define custom styles for active and inactive links
    const navLinkStyle = ({ isActive }) => ({
        fontWeight: isActive ? "bold" : "normal",
        textDecoration: isActive ? "none" : "underline",
    });

    return (
        <header className="header">
            <h1>StudyLink - Home</h1>
            <div className='header-icons'>
                {/* Account icon, no need for NavLink if it's not linking to another page*/}
                <img src={ accountIcon } alt='Account Icon' className='icon'/>

                {/* Use NavLink for the message icon to link to chat page */}
                <Link to='/chat'>
                    <img src={ messageIcon } alt='Message Icon' className='icon'/>
                </Link>
            </div>
        </header>
    );

};

export default Header;