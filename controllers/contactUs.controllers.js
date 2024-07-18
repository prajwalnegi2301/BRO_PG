import ContactUs from "../models/contactUs.models.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";

export const createContactUs = asyncErrorHandler(async(req,res,next)=>{
    const user = req.user;
    const userId = user._id;
    const {name,message}=req.body;
    if(!message){
        return next(new ErrorHandler("Please provide a message",400));
    }
    if(name===""){
        name=null;
    }
    const newContactUs = new ContactUs({
        name,message
    })
    newContactUs.createdBy = userId;
    newContactUs.status = "Pending";
    await newContactUs.save();
    res.status(200)
    .json({message:"new message created",newContactUs});
})

export const getAllContactUs = asyncErrorHandler(async(req,res,next)=>{
    const user = req.user;
    const userId = user._id;
    const messages = await ContactUs.find({createdBy:userId});
    if(!messages){
        return next(new ErrorHandler("No messages",400));
    }
    res.status(200)
    .json({message:"messagess..",messages});
})



export const getAllComplaints = asyncErrorHandler(async (req, res, next) => {
    const messages = await ContactUs.find();
    if (!messages || messages.length === 0) {
        return next(new ErrorHandler("No messages found", 400));
    }
    res.status(200).json({
        success: true,
        messages
    });
});

export const updateContactUs = asyncErrorHandler(async(req,res,next)=>{
    const {messageId} = req.params;
    const{status} = req.body;
    let messages = await ContactUs.findById(messageId);
    if(!messages){
        return next(new ErrorHandler("No messages",400));
    }
    messages = await ContactUs.findByIdAndUpdate(messageId,{status},{ new: true, runValidators: true, useFindAndModify: false });
    res.status(200)
    .json({message:"messagess..",messages});
})