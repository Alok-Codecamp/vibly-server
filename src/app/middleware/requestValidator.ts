import asyncWrapper from "../utils/asyncWrapper.js";
import type { NextFunction, Request, Response } from "express";
import type { AnyObject } from "mongoose";
import type { ZodType } from "zod";
import type { ZodTypeAny } from "zod/v3";



const requestValidator =<T > (zodSchema:ZodType<T>)=>{
    return asyncWrapper(async(req:Request,res:Response,next:NextFunction)=>{
        await zodSchema.parseAsync(req.body);
        next();
    })
}
export default requestValidator;