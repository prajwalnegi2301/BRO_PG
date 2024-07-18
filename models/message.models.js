import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},
{timestamps:true});

const message = mongoose.model('Message',messageSchema);
export default message;