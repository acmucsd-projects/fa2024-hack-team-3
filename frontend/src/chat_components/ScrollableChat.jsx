import React from 'react'
import { Avatar} from '../components/ui/avatar'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender, isLastMessage, isSameUser, isSameSenderMargin } from '../../config/ChatLogic'
import { Tooltip } from '../components/ui/tooltip'
import { ChatState } from '../../Context/ChatProvider'
import system from '../theme'

const ScrollableChat = ({messages}) => {
  const {user} = ChatState();
  return ( 
    <div style={{ height: "100%", overflowY: "scroll" }}>
     <ScrollableFeed forceScroll={true}>
    
        {messages && 
          messages.map((message, index) =>  // <div style={{display: "flex"}} key={index}>{message.content}</div>
            

            <div style={{display: "flex"}} key={message._id}>
                  {(isSameSender(messages, message, index, user._id) ||
                    isLastMessage(messages, index, user._id)) && (
                    <Tooltip content={message.sender.username} placement="bottom-start" hasArrow>
                      <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={message.sender.username}
                        src={message.sender.profilePicture}
                      />
                    </Tooltip>
                  )}
                 <span
                style={{
                  backgroundColor: `${
                    message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  color: "black",
                  marginLeft: isSameSenderMargin(messages, message, index, user._id),
                  marginTop: isSameUser(messages, message, index, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {message.content}
              </span>
            </div>
    
        )} 

        
     </ScrollableFeed>
     </div>
  )
}

export default ScrollableChat