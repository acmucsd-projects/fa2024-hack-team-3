import React from 'react'
import {Badge} from '@chakra-ui/react'
import { IoIosClose } from "react-icons/io";

const UserBadgeItem = ({user, handleFunction, admin}) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundColor="bg.tags"
      color = "white"
      cursor="pointer"
      onClick={handleFunction}
      _hover={{ bg: "blue.600" }}
    >
      {user.username}
      
      {/* {admin === user._id && <span> (Admin)</span>} */}
      <IoIosClose  pl={1} />
    </Badge>
  );
}

export default UserBadgeItem