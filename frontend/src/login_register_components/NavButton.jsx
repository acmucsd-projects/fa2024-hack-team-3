import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NavButton = ({ label, to}) => {
    return (
        <Button as={Link} to={to} variant="outline" colorScheme='teal'>
            {label}
        </Button>
    );
}

export default NavButton;