// require('dotenv').config({path:'/.env'})
import dotenv from "dotenv"
import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/db.js";
import {app} from './app.js'
import e from "express";

dotenv.config({
    path:'/.env'
}) 

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error:",error);
        throw error 
        
    })
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
        
    })
})
.catch((e)=>{
    console.log(`MongoDb Connection failed!!`);
    
})


















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