// user controller

import type { NextFunction, Request, Response } from "express";
import asyncWrapper from "../../utils/asyncWrapper.js";
import { userServices } from "./user.service.js";
import AppError from "../../errors/appError.js";
import { UserRole } from "./user.interface.js";



const getUserProfile = asyncWrapper(async(req:Request, res:Response,next:NextFunction) => {
    const userContact = req.user?.email;
    
    
    const userProfile = await userServices.getUserProfile(userContact);
    res.status(200).json({data: userProfile, message: "User profile fetched successfully"});
})

const getAllUsers = asyncWrapper(async(req:Request, res:Response,next:NextFunction) => {
    // logic to get all users
    const currentUserPayload = req.user;
    if(!currentUserPayload?.email){
        throw new AppError(false,400,"User email not found in token");
    }
    if(currentUserPayload?.role !== UserRole.ADMIN){
        throw new AppError(false,403,"Unauthorized to access all users");
    }
 
    const allUsers  = await userServices.getAllUsers({email: currentUserPayload.email, role: currentUserPayload.role});
    res.status(200).json({data: allUsers, message: "All users fetched successfully"});
})

export const userController = {
    getUserProfile,
    getAllUsers
};