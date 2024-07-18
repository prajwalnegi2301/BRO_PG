// import mongoose from 'mongoose';

// const complaintSchema = new mongoose.Schema({
//     name:{
//         type:String,
//     },
//     phone:{
//         type:String,
//         minLength:[10,"Please Enter 10 digit phone Number"],
//     },
//     complaintDate:{
//         type:String,
//     },
//     roomNo:{
//         type:String,
//     },
//     pgNo:{
//         type:String,
//     },
//     desc:{
//         type:String,
//     },
//     status:{
//         type:String,
//         enum:["Pending", "Accepted", "Rejected"],
//         default: "Pending",
//     },
//     student:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
// },{
//     timestamps: true
// });

// const complaint = mongoose.model("Complaint", complaintSchema);
// export default complaint;