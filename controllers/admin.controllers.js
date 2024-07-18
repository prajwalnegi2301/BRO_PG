import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";



// REGISTER ADMIN->
export const registerAdmin = asyncErrorHandler(async (req, res,next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported", 400));
  }
  const { name, dob, gender, phone, email, password, role } = req.body;
  if (!name || !dob || !gender || !phone || !email || !role || !password) {
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


  const tokenA = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESHTSECRETA,
    {
      expiresIn: process.env.JWT_REFRESHTEXPIRESA,
    }
  );
  user.token = tokenA;
  
  await user.save();
  res
    .status(200)
    .cookie("tokenA", tokenA, {
      expiresIn: new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message: "Admin registered successfully",
      user,
    });
});




// LOGIN ADMIN->
export const loginAdmin = asyncErrorHandler(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Fill the credentials", 400));
  }
  const userPresent = await User.findOne({ email });
  if (!userPresent) {
    return next(new ErrorHandler("User not registered", 400));
  }

  const passwordCompare =  bcrypt.compareSync(password, userPresent.password);
  if (!passwordCompare) {
    return next(new ErrorHandler("Incorrect Password", 400));
  }
  const userPresentRole = userPresent.role;
  if(userPresentRole!==role){
    return next(new ErrorHandler("Enter Role",400));
  }


  const tokenA = jwt.sign(
    {
      id: userPresent._id,
    },
    process.env.JWT_REFRESHTSECRETA,
    {
      expiresIn: process.env.JWT_REFRESHTEXPIRESA,
    }
  );
  userPresent.token = tokenA;

  res
    .status(200)
    .cookie("tokenA", tokenA, {
      expiresIn: new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
      httpOnly:true,
    })

    .json({ message: "Admin Logged in Successfully", success: true });

});


// LOGOUT->
export const logoutAdmin = asyncErrorHandler(async (req, res, next) => {
  res
  .status(200)
  .cookie("tokenA", "",{
    expiresIn: new Date(Date.now()),
    httpOnly:true,
  })

  .json({
    message: "user Logged Out",
    success:true,
  });
});


//GET Admim->
export const getAdmin = asyncErrorHandler(async (req, res,next) => {

  const userPresent = await User.findOne({role:"Admin"});
  if(!userPresent){
      return next(new ErrorHandler("Customer not found",400))
  }
  res
  .status(200)
  .json({message:"Admin achieved",success:true,userPresent});
});

