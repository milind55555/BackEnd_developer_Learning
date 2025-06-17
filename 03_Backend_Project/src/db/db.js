import mongoose  from "mongoose";
import  { DB_NAME} from "../constants.js"


const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`\n MondoDB connected!! DB HOST: `);
        
    } catch (error) {
        console.log("MONGO DB CONNECTION Faied: ",error);
        process.exit(1)
        
    }
}

export default connectDB