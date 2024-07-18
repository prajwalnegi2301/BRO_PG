import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

// ADMIN AUTHENTICATION AND AUTHORIZATION->
export const isAuthenticated = asyncErrorHandler(async(req,res,next)=>{
    // AUTHENTICATION->
    const { tokenA } = req.cookies
    if(!tokenA){
        return next(new ErrorHandler("Admin Not Authenticated", 401));
    }
    const decoded = jwt.verify(tokenA,process.env.JWT_REFRESHTSECRETA);
    req.user = await User.findById(decoded.id);

    //AUTHORIZATION->
    if(req.user.role !== "Admin"){
        return next(
            new ErrorHandler(
                `${req.user.role} not submitted for this resources!`,
                403
            )
        );
    }
    next();
})






// CUSTOMER AUTHNETICATION AND AUTHORIZATION->
export const isCustomerAuthenticated = asyncErrorHandler(async(req,res,next)=>{
    // AUTHENTICATION->
    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler("Customer Not Authenticated", 401));
    }
    const decoded = jwt.verify(token,process.env.JWT_REFRESHTSECRETC);
    req.user = await User.findById(decoded.id);
    
    // AUTHORIZATION->
    if(req.user.role !=="Customer"){
        return next(
            new ErrorHandler(
                `${req.user.role} not submitted for this resources!`,
                403
            )
        );
    }
    next();
})