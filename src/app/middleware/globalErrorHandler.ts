import type { NextFunction, Request, Response } from "express"
import type { IError } from "../errors/error.interface.js"
import { config } from "../config/config.js"
import zodErrorFormater from "../errors/zodError.js"





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
  // format zod error here 
  if(err.name==="ZodError"){
   const formattedErrors = zodErrorFormater(err as any);
    err.statusCode=400; 
    err.success=false;
    err.message="Validation Error";
    err.errors=formattedErrors;
  }
  res.json({ 
    statusCode:err.statusCode,
    success:err.success,
    name:err.name,
    message:err.message,
    errors:err.errors,
    stack:config.node_env==="development"? err.stack : undefined,
  })
}



export default globalErrorHandler;