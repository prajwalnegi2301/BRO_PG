import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";
import Message from "../models/message.models.js";
import Conversation from "../models/conversation.models.js";

export const createMessage = asyncErrorHandler(async(req,res,next)=>{
    const { id:receiverId } = req.params;
    const senderId = req.user._id;
    const {message} = req.body;
    let conversation = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]},
    })

    if (!conversation) {
        // Handle case where the conversation does not exist
        conversation = new Conversation({
            participants: [senderId, receiverId],
            messages: [],
        });
    }
    if(!message){
        return next(new ErrorHandler("Enter message",400));
    }
    const newMessage = new Message({
        message,
        
    })
    
    newMessage.sender = senderId;
    newMessage.receiver = receiverId;
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(),newMessage.save()]);
    res
    .status(200)
    .json({message:"New Message created",success:true,newMessage});

})

export const getAllMessages = asyncErrorHandler(async(req,res,next)=>{
    try{
        const{id:userToChatId}=req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{ $all:[senderId,userToChatId]},
        }).populate("messages");
        
        if(!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);
    }
    catch(err){
        return next(new ErrorHandler("Internal server Error",500));
    }
    res
    .status(200)
    .json({message:"All messages",success:true});
})


