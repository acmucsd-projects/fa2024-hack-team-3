const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
// const { create } = require("../models/commentModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");

const accessChat = asyncHandler(async(req, res)=> {
    const {receiver_id} = req.body;
    const sender_id = req.user.id;

    if (!sender_id) {
        console.log("Sender ID not sent");
        return res.status(400).send({ message: "Sender ID not sent" });
    }

    if(!receiver_id){
        console.log("Username not sent");
        return res.sendStatus(400);
    }

    // Checking if the 
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            // { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: sender_id } } },
            { users: { $elemMatch: { $eq: receiver_id} } },
        ],
    })
     .populate("users", "-password")
     .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username emailAddress"
    });
    
    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName:"sender",
            isGroupChat: false,
            users: [sender_id, receiver_id],
        };

        try{
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id})
                .popluate("users", "-password");

            res.status(200).send(FullChat);
        }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChat = asyncHandler(async(req, res) =>{
    try{
        Chat.find({users: {$elemMatch: { $eq: req.user.id}}})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "username emailAddress"
                });

                res.status(200).send(results);
            });
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

const createGroupChat = asyncHandler(async(req, res) => {
    if(! req.body.users || !req.body.name){
        return res.status(400).send({ message: "Please fill all fields"});
    }

    var users = JSON.parse(req.body.users);
    // var users = JSON.parse(req.body.users).map((userId) => mongoose.Types.ObjectId(userId));

    if(users.length < 2){
        return res.status(400).send({message: "We need at least 2 people in a groupchat"});
    }

    users.push(req.user.id);

    try{
        var chatData = {
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user.id
        };

        const groupChat = await Chat.create(chatData);
        const FullgroupChat = await Chat.findOne({_id: groupChat._id})
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(FullgroupChat);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }

});

const renameGroupChat = asyncHandler(async(req, res) => {
    const {chatId, chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!updatedChat){
        res.status(404).send({message: "Chat not Found"});
    }
    else{
        res.status(200).json(updatedChat);
    }
});

const addToGroup = asyncHandler(async(req, res) => {
    const {chatId, userId } = req.body;

    const addedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $push:{users: userId}},
        { new: true } 
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!addedChat){
        res.status(404).send({message: "Chat not Found"});
    }
    else{
        res.status(200).json(addedChat);
    }
});

const removeFromGroup = asyncHandler(async(req, res) => {
    const {chatId, userId } = req.body;

    const removedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull:{users: userId}},
        { new: true } 
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!removedChat){
        res.status(404).send({message: "Chat not Found"});
    }
    else{
        res.status(200).json(removedChat);
    }
});
module.exports = {accessChat, fetchChat, createGroupChat, renameGroupChat, addToGroup, removeFromGroup};