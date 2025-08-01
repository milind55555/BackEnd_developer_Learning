import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            
        },
        fullname:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            
        },
        
        avatar:{
            type:String,//cloudanary url
            required:true,
            
        },
        coverImage:{
            type:String,//claudary url
        },
        watchHistory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        },
        password:{
            type:String,
            required:[true,"Pasword is required"]
        },
        refreshToken:{
            type:String
        }
    },{
        timestamps:true
    })

    userSchema.pre("save",async function(next){
        if(!this.isModified("password")) return next();

        
            this.password =await bcrypt.hash(this.password,10)
            next()
    })

    userSchema.methods.isPassword = async function(password){
        return  await  bcrypt.compare(password,this.password)
    }
    userSchema.methods.generateAccessToken= async function () {
        jwt.sign(
            {
                _id: this._id,
                email:this.email,
                username: this.username,
                fullname:this.fullname
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generateRefreshToken= async function () {
        jwt.sign(
            {
                _id: this._id, 
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }


    export const User=mongoose.model("User",userSchema)