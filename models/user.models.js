import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter name"],
        minLength:[3, "Name must contain atleast 3 characters"],
    },
    dob:{
        type:String,
        required:[true,"Enter you date of birth"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Others"],
    },
    avatar: {
        public_id:String,
        url: String,
      },
    phone:{
        type:String,
        required:[true,"Enter Phone Number"],
        minLength:[10, "Phone Number must be 10 digit"],
    },
    email:{
        type:String,
    
    },
    password:{
        type:String,
        minLength:[8,"Password must be atleast 8 characters"],
    },
    token:{
        type:String,
    },
    docAvatar:{
        public_id:String,
        url:String,
    },
    role:{
        type:String,
        enum:["Admin","Customer"],
    }
},
{timestamps:true});

const user = mongoose.model("User", userSchema);
export default user;