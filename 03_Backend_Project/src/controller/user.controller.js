import {asyncHandler} from "../utils/asyncHandler.js";
import {APIError} from "../utils/APIerror.js"
import {User} from "../models/user.models.js"  //default not there in model.user.js
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {APIResponse} from '../utils/APIresponse.js'


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

      if(
        [fullname,email,username,password].some((field)=>{
            field?.trim() === ""
        })
      ){
            throw new APIError(400,"All fields are required!")
      }


     const existedUser= User.findOne({
        $or :[{username},{email}]
      })
      console.log(existedUser);
      

      if(existedUser){
        throw new APIError(409,"User with email or usermane is already exists")
      } 


      const  avatarLocalPath= req.files?.avatar[0]?.path;

     const coverImageLocalPath = req.files?.coverImage[0]?.path;


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


    export {registerUser}

