import mongoose from "mongoose"

const medicalrecordSchema=new mongoose.Schema(
    {}
    ,{timestamps:true})

export const MedicalRecord=mongoose.model("MedicalRecord",medicalrecordSchema)    