import { config } from "../../config/config.js";
import AppError from "../../errors/appError.js";
import sendEmail from "../../utils/mailSender.js";
import type { ISigninData, ISignupData } from "./auth.interface.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../user/user.model.js";
import type { IUser } from "../user/user.interface.js";
//service function for handle signup logic
const signup = async(signUpData:IUser) => {
    console.log(signUpData)
    if(!signUpData.email || !signUpData.password || !signUpData.firstName || !signUpData.lastName || !signUpData.dateOfBirth){
        throw new AppError(false,400,'Missing required fields');
    }
    const existedUser = await UserModel.findOne({email:signUpData.email});
    if(existedUser){
        throw new AppError(false,409,'User already registered, please login instead');
    }
    const userId = await UserModel.countDocuments({});
    signUpData['id'] = userId + 1;
    const result = await UserModel.create(signUpData);

    return result;
}

const signIn = async(loginData:ISigninData) => {
    // signin Logic here 

    const {email,password} = loginData;

    // validate input
    if(!email || !password){
        throw new AppError(false,400,'Missing required fields');
    }
    // check if user exists
    const existedUser = await UserModel.findOne({email});

    // if user not found
    if(!existedUser){
        throw new AppError(false,404,'User not found');
    }
    // compare password
    const isPasswordMatch = await bcrypt.compare(password,existedUser.password);

    console.log(isPasswordMatch)

    // if password does not match
    if(!isPasswordMatch){
        throw new AppError(false,401,'Invalid credentials');
    }

    //create payload for token
    const payload = { 
        userId: existedUser._id.toString(),
        email:existedUser.email,
        role: existedUser.role

    };
    
// generate jwt access token
    const access_token = jwt.sign(
     payload   
, config.jwt_access_secret as string, {expiresIn:'10m'});

const refresh_token = jwt.sign(payload,config.jwt_refresh_secret as string,{expiresIn:'7d'});
    
// return token
    return {
        access_token,
        refresh_token
    };
}

// service function for handle refresh token logic
const generateRefreshToken = async(refreshToken:string) => {
    // refresh token Logic here 
    if(!refreshToken){
        throw new AppError(false,401,'Refresh token not found');
    }
    const decoded = jwt.verify(refreshToken,config.jwt_refresh_secret as string)
}
// service function for handle forgot password logic
const forgotPassword = async(email:string) => {
    // forgot password Logic here 
    if(!email){
        throw new AppError(false,400,'Email is required');
    }
    const user = await UserModel.findOne({email:email})
    
    if(!user){
        throw new AppError(false,404,'User not found');
    }
    const payload = { 
        userId: user._id.toString(),
        email:user.email
     };

     
     const token = jwt.sign(
     payload   
, config.jwt_access_secret as string, {expiresIn:'10m'});

const responseEmail = await sendEmail(email,`<p>Your password reset link: <a href="http://localhost:5000/api/auth/reset-password/?token=${token}">Reset Password</a></p><p>This link is valid for 5 minutes.</p>`);

return token;
}

const resetPassword = async(token:string,newPassword:string)=>{
    // reset password Logic here
    if(!token || !newPassword){
        throw new AppError(false,400,'Token and new password are required');
    }
    let payload:any;
    // verify token
    try{
        payload = jwt.verify(token,config.jwt_access_secret as string)
    }catch(err:any){
        throw new AppError(false,400,err.message||'Invalid or expired token');
    }
    // extract userId and email from payload
    const {userId,email} = payload;
    const user = await UserModel.findOne({_id:userId,email:email})
// check if user exists
    if(!user){
        throw new AppError(false,404,'User not found');
    }
// update password
    user.password = newPassword;
    const result = await user.save();

    return result;
    
}


export const authServices =  {
    signup,
    signIn,
    generateRefreshToken,
    forgotPassword,
    resetPassword

};