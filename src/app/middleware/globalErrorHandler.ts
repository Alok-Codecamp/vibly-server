import type { NextFunction, Request, Response } from "express"
import { success } from "zod"

class AppError extends Error{

};



const globalErrorHandler= (err:any, req:Request, res:Response, next:NextFunction) =>{
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.json({ statusCode:500,
    success:false,
    message:"custom error handler"          })
}



export default globalErrorHandler;