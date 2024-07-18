// import asyncErrorHandler from "../utils/asyncErrorHandler.js";
// import ErrorHandler from "../utils/errorMiddleware.js";
// import Complaint from "../models/complaint.models.js";


// // create Complaint->
// export const postComplaint = asyncErrorHandler(async (req, res, next) => {
  
//   const {
//     name,phone,complaintDate,roomNo,pgNo,desc
//   } = req.body;

//   if(!name || !phone || !complaintDate || !roomNo || !pgNo || !desc){
//       return next(new ErrorHandler("Fill the credentials",400));
//   }
  
//   const studentId = req.user._id;
//   const complaint = new Complaint({
//     name,phone,complaintDate,roomNo,pgNo,desc
//   })

//   complaint.student = studentId;
//   await complaint.save();
//   res.status(200).json({ message: "Complaint listed", success: true, complaint });
// });



 


// // get all complaints
// export const getAllcomplaints = asyncErrorHandler(async (req, res, next) => {
//   const complaints = await Complaint.find();
//   if (!complaints) {
//     return next(new ErrorHandler("no complaints found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     complaints,
//   });
// });

// // export const getComplaintOfUser = asyncErrorHandler(async (req, res, next) => {
// //   const user = req.user;
// //   const userId = user._id;
// //   const complaints = await Complaint.findOne({ student: userId });
// //   if (!complaints) {
// //     return next(new ErrorHandler("no complaints found", 404));
// //   }
// //   res.status(200).json({
// //     success: true,
// //     complaints,
// //   });
// // });

// // updating complaint Details
// export const updatecomplaintStatus = asyncErrorHandler(
//   async (req, res, next) => {
//     const { id } = req.params;
//     let complaint = await Complaint.findById(id);
//     if (!complaint) {
//       return next(new ErrorHandler("no complaints found", 400));
//     }
//     complaint = await Complaint.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       success: true,
//       message: "complaint Status Updated",
//       complaint,
//     });
//   }
// );

// // delete complaint Details
// export const deletecomplaint = asyncErrorHandler(async (req, res, next) => {
//   const user = req.user;
//   const userId = user._id;
//   let complaint = await Complaint.findByOne({ student: userId });
//   if (!complaint) {
//     return next(new ErrorHandler("complaint Not Found", 404));
//   }
//   await complaint.deleteOne();
//   res.status(200).json({
//     success: true,
//     message: "Appointed deleted",
//   });
// });


