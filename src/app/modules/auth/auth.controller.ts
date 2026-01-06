import type { Request, Response } from "express";
import { authServices} from "./auth.service.js";

// controller function for handle signup request
 const signup = async(req:Request, res:Response) => {
     try {
      const signUpData = req.body;
        const result = await authServices.signup(signUpData);
        
        res.status(200).json({message:"Signup successful", data: result});
     } catch (error) {
      console.log(error)
        res.status(500).json({message:error});
     }
};

export const authController =  {
    signup
};