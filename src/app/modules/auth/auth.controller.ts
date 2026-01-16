import type { NextFunction, Request, Response } from "express";
import { authServices} from "./auth.service.js";
import AppError from "../../errors/appError.js";
import asyncWrapper from "../../utils/asyncWrapper.js";

// controller function for handle signup request
 const signup = asyncWrapper(async(req:Request, res:Response,next:NextFunction) => {
     
    const signUpData = req.body;
    const result = await authServices.signup(signUpData);
    res.status(200).json({message:"Signup successful", data: result});
   
});

const signIn = asyncWrapper(async(req:Request, res:Response,next:NextFunction) => {
    const loginData = req.body;
    const token = await authServices.signIn(loginData);
    if(!token) {
        throw new AppError(false,500,'Signin failed');
    }
    res.cookie('token',token,{
        httpOnly:true,
    })
    res.status(200).json({
        message:"Signin successful", token:token
    });
})
// controller function for handle forgot password request
const forgotPassword = asyncWrapper(async(req:Request, res:Response,next:NextFunction) => {

    const {email} = req.body;
    if(!email){
        throw new AppError(false,400,'Email is required');
    }
    const token = await authServices.forgotPassword(email);
    res.status(200).json({message:"Forgot password email sent", token: token});
});

// controller function for handle reset password request
const resetPassword = asyncWrapper(async(req:Request, res:Response,next:NextFunction) => {
    const token = req.query.token as string;
    const {newPassword} = req.body;
    if(!token || !newPassword){
        throw new AppError(false,400,'Token and new password are required');
    }

    const result = await authServices.resetPassword(token,newPassword);
    res.status(200).json({message:"Password reset successful", data: result});

})


// export all controller functions
export const authController =  {
    signup,
    signIn,
    forgotPassword,
    resetPassword
};