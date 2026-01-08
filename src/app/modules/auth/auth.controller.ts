import type { NextFunction, Request, Response } from "express";
import { authServices} from "./auth.service.js";

// controller function for handle signup request
 const signup = async(req:Request, res:Response,next:NextFunction) => {
     try {
      const signUpData = req.body;
      throw new Error("Testing error handling");


        const result = await authServices.signup(signUpData);
        
        res.status(200).json({message:"Signup successful", data: result});
     } catch (error) {
      
        
      next(error);
     }
};

export const authController =  {
    signup
};