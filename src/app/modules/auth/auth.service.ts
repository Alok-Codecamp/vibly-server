import { config } from "../../config/config.js";
import AppError from "../../errors/appError.js";
import type { ISigninData, ISignupData } from "./auth.interface.js";
import signupModel from "./auth.model.js";
import jwt from "jsonwebtoken";
//service function for handle signup logic
const signup = async(signUpData:ISignupData) => {
    console.log(signUpData)
    if(!signUpData.email || !signUpData.password || !signUpData.firstName || !signUpData.lastName || !signUpData.dob    ){
        throw new AppError(false,400,'Missing required fields');
    }
    
    const result = await signupModel.create(signUpData);
    console.log(result)
    return result;
}

const signIn = async(loginData:ISigninData) => {
    // signin Logic here 
    if(!loginData.email || !loginData.password){
        throw new AppError(false,400,'Missing required fields');
    }
    const result = await signupModel.findOne({email:loginData.email});
    if(!result){
        throw new AppError(false,404,'User not found');
    }
    const payload = { 
        userId: result._id.toString(),
        email:result.email

    };
    
    const token = jwt.sign(
     payload   
, config.jwtSecret as string, {expiresIn:'7d'});
    
    return token;
}

export const authServices =  {
    signup,
    signIn

};