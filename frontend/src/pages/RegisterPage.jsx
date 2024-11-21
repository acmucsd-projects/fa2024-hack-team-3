import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../login_register_components/Navbar';
import NavButton from '../login_register_components/NavButton';
import { Box, Container, Stack } from '@chakra-ui/react';
// import ImageSection from '../login_register_components/ImageSection';

const RegisterPage = () => {
    return (
        <Box>
            <Navbar />
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight="calc(100vh - 60px)" bg="gray.100">
                <Stack direction={{base: 'column', md: 'row'}} maxW="5xl" borderRadius="lg" overflow="hidden" bg="white">
                    <>HELLO</>
                    <>HI</>
                    <>YES</>
                </Stack>
            </Box>
        </Box>
    )
}

export default RegisterPage