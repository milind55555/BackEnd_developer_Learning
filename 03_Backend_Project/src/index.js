// require('dotenv').config({path:'/.env'})
import dotenv from "dotenv"
import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/db.js";

dotenv.config({
    path:'/.env'
})

connectDB()


















/*

import express from "express"
const app =express()

(async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
       app.on("error",()=>{
            console.log("Error :",error);
            throw error
            
       })


       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
        
       })
       
    } catch (error) {
        console.log(error);
        throw error
        
    }
})()

*/