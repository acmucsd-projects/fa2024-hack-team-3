// const asyncHandler = require("express-async-handler");
// const Message = require("../models/messageModel");
// const User = require("../models/userModel");
// const Chat = require("../models/chatModel");   
import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js"; 

const sendMessage = asyncHandler(async(req, res) => {
    const {content, chatId} = req.body;

    if(!content || !chatId){
        res.status(400).send({message: "Invalid data passed into request"});
        return;
    }

   var newMessage = {
        sender: req.user.id,
        content: content,
        chat: chatId,
    };

    try{
        let message = await Message.create(newMessage);

        message = await message.populate("sender", "username profilePicture");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "username profilePicture emailAddress",
        });
        await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message});
        res.status(201).json(message);
    }catch(error){
        res.status(400).send({message: "Failed to send message"});
    }


});

const allMessages = asyncHandler(async(req, res) => {


    try {
        var messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "username profilePicture emailAddress")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }

});

// module.exports = {sendMessage, allMessages};
export {sendMessage, allMessages};