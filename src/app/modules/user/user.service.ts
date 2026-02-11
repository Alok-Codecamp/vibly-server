// user service

import AppError from "../../errors/appError.js";
import { UserModel } from "./user.model.js";




const getUserProfile = async (userContact: string) => {
    // logic to get user profile by userId
    if(!userContact) {
        throw new Error('User ID is required');
    }
    
    const userProfile = await UserModel.findOne({email: userContact})
    return userProfile;
}

const getAllUsers = async (adminPayload:{email:string, role:string}) => {
    // logic to get all users
    const currentAdmin = await UserModel.findOne({email:adminPayload.email});
    if(!currentAdmin){
        throw new AppError(false,404,"Admin user not found");
    }
    if(adminPayload?.role !== currentAdmin?.role){
        throw new  AppError(false,403,"Unauthorized to access all users");
    }

    const users = await UserModel.find({});
    return users;
}



export const userServices = {
    getUserProfile,
    getAllUsers
};