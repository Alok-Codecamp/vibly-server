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
export const authController =  {
    signup,
    signIn
};