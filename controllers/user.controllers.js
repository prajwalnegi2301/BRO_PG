import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";
import cloudinary from 'cloudinary'


// REGISTER CUSTOMER->
export const registerCustomer = asyncErrorHandler(async (req, res,next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported", 400));
  }
  const { name, dob, gender, phone, email, password,role } = req.body;
  if (!name || !dob || !gender || !phone || !email || !role || !password ) {
    return next(new ErrorHandler("Fill the credentials", 400));
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorHandler("User already exist", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    email,
    dob,
    gender,
    phone,
    role,
    password: hashedPassword,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESHTSECRETC,
    {
      expiresIn: process.env.JWT_REFRESHTEXPIRESC,
    }
  );
  user.token = token;
  
  await user.save();
  res
    .status(200)
 
    .cookie("token", token, {
      expiresIn: new Date(Date.now()+process.env.COOKIE_EXPIRES *24*60*60*1000),
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message: "User successfully created",
      user,
    });
});




// LOGIN CUSTOMER->
export const loginCustomer = asyncErrorHandler(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Fill the credentials", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not registered", 400));
  }
  const passwordCompare =  bcrypt.compareSync(password, user.password);
  if (!passwordCompare) {
    return next(new ErrorHandler("Correct your password", 400));
  }

  const UserRole = user.role;
  if(UserRole!==role){
    return next(new ErrorHandler("User not associated with this role", 400));
  }


  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESHTSECRETC,
    {
      expiresIn: process.env.JWT_REFRESHTEXPIRESC,
    }
  );
  user.token = token;
  
  res
    .status(200)
    .cookie("token", token, {
      expiresIn: new Date(Date.now()+process.env.COOKIE_EXPIRES *24*60*60*1000),
      httpOnly:true
    })
 
    .json({
      success: true,
      message: "User successfully login",
      user
    });
});




// LOGOUT CUSTOMER->
export const logOutCustomer = asyncErrorHandler(async (req, res, next) => {
  res
  .status(200)
  .cookie("token", "",{
    expiresIn: new Date(Date.now()),
    httpOnly:true,
  })

  .json({
    message: "Logged Out",
    success:true,
  });
});



// DELETE CUSTOMER
export const deleteCustomer = asyncErrorHandler(async (req, res,next) => {
    const user = req.user;
    const userId = user._id;
    const findUser = await User.findById(userId);
    if(!findUser){
      return next(new ErrorHandler("Cannot find Customer",400))
    }
    await findUser.deleteOne()
    res
    .status(200)
    .json({message:"User deleted",success:true})
    
});


// Our Profile->
export const getParticularCustomer = asyncErrorHandler(async (req, res,next) => {
    let user = req.user;
    const userId = user._id;
     user = await User.findById(userId);
    if(!user){
        return next(new ErrorHandler("User not found",400))
    }
    res
    .status(200)
    .json({message:"user achieved",success:true,user});
});



