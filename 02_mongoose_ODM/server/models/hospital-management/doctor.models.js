import mongoose from "mongoose";

const doctorSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        salary:{
            type:String,
            required:true
        },
        qualification:{
            type:String,
            required:true
        },
        experienceIn:{
            type:Number,
            default:0,
            required:true
        },
        worksInHospital:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Hospital"
            },
        ],
    }
    ,{timestamps:true})


 export const Doctor=mongoose.model("Doctor",doctorSchema)   