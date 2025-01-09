import { Box, Text} from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({  user, handleFunction }) => {
  // const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="bg.buttons"
      _hover={{
        background: "blue.600",
      }}
      transition={"all 0.2s"}
      w="100%"
      display="flex"
      alignItems="center"
      color="white"
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