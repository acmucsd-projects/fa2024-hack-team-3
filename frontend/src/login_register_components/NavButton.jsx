import React from 'react'; // Add the missing import statement for React
import { Link } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';

const NavButton = ({ label, to, bg, col}) => {
    return (
        <Button as={Link} to={to} variant="solid" bg={bg} _hover={{bg: 'gray.300'}}>
            <Text color={col} fontWeight={'bold'}>{label}</Text>
        </Button>
    );
}

export default NavButton;