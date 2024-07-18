import mongoose, { mongo } from 'mongoose'

const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    message:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    status:{
        type: String,
        enum:["Pending", "Accepted","Rejected"],
    }
})

const contactUs = mongoose.model('ContactUs',contactUsSchema)
export default contactUs;