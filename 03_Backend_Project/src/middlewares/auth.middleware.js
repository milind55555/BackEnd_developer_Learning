import { APIError } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"


export const verifyJWT= asyncHandler(async(req,_,next)=>{
   try {
    const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
 
    if(!token){
     throw new APIError(401,"Unauthorized Request")
 
    }
 
   const decodedToken= await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
 
  const user= await User.findById(decodedToken?._id).select(
     "-password -refreshToken"
   )
 
   if(!user){
     //TODO:discuss about frontend
     throw new APIError(401,"Invalid Access Token")
   }
 
   req.user = user;
   next()
 
   } catch (error) {
        throw new APIError(401,"Invalid Access")
   }

}) 