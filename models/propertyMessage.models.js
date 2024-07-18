import mongoose from 'mongoose';


const propertyMessageSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    senderName:{
        type:String,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
},
{timestamps:true});

const propertyMessage = mongoose.model('PropertyMessage',propertyMessageSchema);
export default propertyMessage;