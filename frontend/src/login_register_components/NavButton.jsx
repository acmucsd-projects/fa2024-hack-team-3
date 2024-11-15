import { Link } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';

const NavButton = ({ label, to, bg, col}) => {
    return (
        <Button as={Link} to={to} variant="solid" bg={bg}>
            <Text color={col} fontWeight={'bold'}>{label}</Text>
        </Button>
    );
}

export default NavButton;