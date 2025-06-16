import mongoose from "mongoose";

const SubToDoSchema =new mongoose.Schema(
    {
        content:{
            type:String,
            required:true,

        },
        complete:{
            type:Boolean,
            default:false
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true}
)

export const SubToDo=mongoose.model("Subtodo",SubToDoSchema) //stored subtodos in db
