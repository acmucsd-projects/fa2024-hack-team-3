import React from 'react'
import { Avatar, Box, Text } from '@chakra-ui/react'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender, isLastMessage, isSameUser, isSameSenderMargin } from '../../config/ChatLogic'
import { Tooltip } from '../components/ui/tooltip'
import { ChatState } from '../../Context/ChatProvider'

const SScrollableChat = ({messages}) => {
  const {user} = ChatState();
  return (
     <ScrollableFeed>
      

        {messages && 
          messages.map((message, index) => 
            // <div style={{display: "flex"}} key={index}>{message.content}</div>
            

            <div style={{display: "flex"}} key={message._id}>
              {/* {console.log(message)}
              {console.log(user._id)} */}
                  {/* {console.log(isSameSender(messages, message, index, user._id) )}
                  {console.log(isLastMessage(messages, index, user._id))}
                  {(isSameSender(messages, message, index, user._id) ||
                    isLastMessage(messages, index, user._id)) && (
                    <Tooltip label={message.sender.username} placement="bottom-start" hasArrow>
                      <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={message.sender.username}
                        src={message.sender.profilePicture}
                      />
                    </Tooltip>
                 
                  
                  )} */}
                  <div>{message.content}</div>
            </div>
    
        )} 

        
     </ScrollableFeed>
  )
}

export default SScrollableChat