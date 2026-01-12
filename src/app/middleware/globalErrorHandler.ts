import type { NextFunction, Request, Response } from "express"
import type { IError } from "../errors/error.interface.js"
import { config } from "../config/config.js"





const globalErrorHandler= (err:IError, req:Request, res:Response, next:NextFunction) =>{
  if (res.headersSent) {
    return next(err)
  }
  const field = Object.keys(err.keyValue || {})[0];
  if(err.name==="MongoServerError" && err.code===11000){
    err.statusCode=409;
    err.message=`Duplicate value for ${field}. Please use another value.`;
    err.success=false;
  }
  res.json({ 
    statusCode:err.statusCode,
    success:err.success,
    name:err.name,
    message:err.message,
    stack:config.node_env==="development"? err.stack : undefined,
  })
}



export default globalErrorHandler;