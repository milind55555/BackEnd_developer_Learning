import mongoose from "mongoose";

const todoSchema =new mongoose.Schema(
    {
        content:{
            type:true,
            required:true
        },
        complete:{
            type:Boolean,
            default:false,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        subTodos:[  
            {
                 type:mongoose.Schema.Types.ObjectId,
                 ref:"Subtodo"
            }
            
        ]//Array od sub-todos
    }
    ,{timestamps:true}
)

export const Todo = mongoose.model("Todo",todoSchema)