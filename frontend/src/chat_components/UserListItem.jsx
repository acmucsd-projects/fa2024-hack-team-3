import { Box, Text} from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({  user, handleFunction }) => {
  // const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        size="sm"
        mr={2}
        cursor="pointer"
        name={user.username}
        src={user.profilePicture}
      />
      <Box>
        <Text>{user.username}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.emailAddress}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;