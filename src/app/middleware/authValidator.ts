import { config } from "../config/config.js";
import asyncWrapper from "../utils/asyncWrapper.js"
import jwt, { type JwtPayload } from "jsonwebtoken";



const authValidator = (requierdRoles:string[])=>{
    return asyncWrapper(async(req, res, next) => {
        console.log(requierdRoles)
        const token = req.headers.authorization as string;
        if(!token){
            return res.status(401).json({message:"unAuthorized user"});
        }

        const decodedToken = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
        console.log(decodedToken);
        if(!decodedToken){
            return res.status(401).json({message:'unAuthorized user'});0
        }
        else if(!requierdRoles.includes(decodedToken.role)){
            return res.status(403).json({message:`Forbidden: Insufficient permissions. only ${requierdRoles.join(', ')} can access this resource.`});
        }
        else{
            console.log("User authorized with role:", decodedToken.role);
            req.user = decodedToken
        }
        
        

        next();

    })
}

export default authValidator;