import {asyncHandler} from "../utils/asyncHandler.js";
import {APIError} from "../utils/APIerror.js"
import {User} from "../models/user.models.js"  //default not there in model.user.js
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {APIResponse} from '../utils/APIresponse.js'
import path from "path";
import fs from "fs";

const generateAccessAndRefreshToken = async(userId)=>{
  try {
  const user=  await User.findById(userId)
  const accessToken= user.generateAccessToken();
  const refreshToken =user.generateRefreshToken(); 

  user.refreshToken =refreshToken
 await user.save({ validateBeforeSave:false })

 return {accessToken ,refreshToken}
    
  } catch (error) {
    throw new APIError(500,"Something went wrong while generating refresh and acces token")
  }
}


const registerUser = asyncHandler( async(req,res)=>
    {
       //get user detail from frontend
       //validation -not empty
       // check if user is already exist:username or email
       //check for images
       //check for avatars
       //upload them to cloudinary,avatar 
       //create userObject - create entry in db
       //remove password and refresh token field from response
       //check for user creation
       //return res

      const {fullname,email,username,password} =req.body
      console.log("Email:",email);

   if (
  [fullname, email, username, password].some(field => !field || field.trim() === "")
) {
  throw new APIError(400, "All fields are required!");
}


     const existedUser=await User.findOne({
        $or :[{username},{email}]
      })
      console.log(existedUser);
      

      if(existedUser){
        throw new APIError(409,"User with email or usermane is already exists")
      } 
  console.log("req.files:", req.files);
  console.log("req.files:", req.files);
console.log("avatar[0]:", req.files?.avatar?.[0]);
console.log("avatar[0].path:", req.files?.avatar?.[0]?.path);


      // Use path.resolve to get absolute path
      const avatarLocalPath = req.files?.avatar?.[0]?.path
        ? path.resolve(req.files.avatar[0].path)
        : null;
      const coverImageLocalPath = req.files?.coverImage?.[0]?.path
        ? path.resolve(req.files.coverImage[0].path)
        : null;
        console.log("avatarLocalPath:", avatarLocalPath);
if (!fs.existsSync(avatarLocalPath)) {
    console.error("File does not exist:", avatarLocalPath);
}


     if(!avatarLocalPath){
        throw new APIError(400,"Avatar file is required")
     }

  const avatar=  await uploadOnCloudinary(avatarLocalPath)
  const coverImage =await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new APIError(400,"Avatar file is required")
  }

 const user =await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser =await User.findById(user._id).select(
    "-password -refreshToken" //do not include
  )
  if(!createdUser){
    throw new APIError(500,"Something went wrong while registering user")
  }


  return res.status(201).json(
    new APIError(200,createdUser,"User Registered Successfully")
  )

      

    }
)



const loginUser = asyncHandler( async(req,res)=>{
  //req body get data 
  // username or email
  //find user
  //password check
  //access and refresh token generate
  //send cookies

  const {email,username,password} = req.body;

  if(!email || !username){
    throw new APIError(400,"username or password is required")
  }

 const user =await User.findOne({
    $or: [{username},{email}]
  })

  if(!user){
    throw new APIError(404,"user does not exist")
  }

 const isPasswordValide= await user.isPassword(password)

 if(!isPasswordValide){
    throw new APIError(401,"Password  Incorrect or user invalid Credentials")
  }


const {accessToken , refreshToken}= await generateAccessAndRefreshToken(user._id);


const loggedUser = await User.findById(user._id).select(
  "-password -refreshToken"
)


const options ={
  httpOnly:true,  //cookies only modifies through server not frontend
  secure:true
}

return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
  new APIResponse(
    200,
    {
      user:loggedUser,accessToken,refreshToken
    },
    "User Logged In Successfully!!"
  )
)





})


const logOutUser = asyncHandler(async(req,res)=>{
 await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        refreshToken:undefined
      }
    },
    {
      new:true
    }
  )

  const options ={
  httpOnly:true,  //cookies only modifies through server not frontend
  secure:true
}

return res
.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(new APIResponse(200,{},"User Logged Out"))


})

    export {registerUser , loginUser, logOutUser}

