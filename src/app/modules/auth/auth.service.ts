import { config } from "../../config/config.js";
import AppError from "../../errors/appError.js";
import sendEmail from "../../utils/mailSender.js";
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
const forgotPassword = async(email:string) => {
    // forgot password Logic here 
    if(!email){
        throw new AppError(false,400,'Email is required');
    }
    const user = await signupModel.findOne({email:email})
    if(!user){
        throw new AppError(false,404,'User not found');
    }
    const payload = { 
        userId: user._id.toString(),
        email:user.email
     };

     
     const token = jwt.sign(
     payload   
, config.jwtSecret as string, {expiresIn:'7d'});

const responseEmail = await sendEmail(email,`<p>Your password reset link: <a href="http://localhost:5000/api/auth/reset-password/?token=${token}">Reset Password</a></p><p>This link is valid for 5 minutes.</p>`);

console.log(responseEmail)
return token;
}



export const authServices =  {
    signup,
    signIn,
    forgotPassword

};