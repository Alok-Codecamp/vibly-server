import type { Request, Response } from "express";
import { authServices} from "./auth.service.js";

// controller function for handle signup request
 const signup = async(req:Request, res:Response) => {
     try {
        const result = await authServices.signup();
        res.status(200).json({message: result});
     } catch (error) {
        res.status(500).json({message: 'Internal server error'});
     }
};

export const authController =  {
    signup
};