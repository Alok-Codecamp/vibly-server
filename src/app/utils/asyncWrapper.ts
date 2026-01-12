import type { RequestHandler } from "express";
import type { NextFunction, Request, Response } from "express-serve-static-core";


const asyncWrapper = (fn:RequestHandler)=>{
    return(req:Request, res:Response, next:NextFunction) => {
        Promise.resolve(fn(req,res,next)).catch(next);
}
}


export default asyncWrapper;