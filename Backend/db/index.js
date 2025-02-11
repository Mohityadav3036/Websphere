
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv"
dotenv.config({
    path : './env'
})

const connectDB = async () => {
 try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log("MONGODB connect successfully at DB folder🎊🎊🎊🎊");
 } catch (error) {
    console.log("⚠️ ⚠️ ⚠️  ERROR TO CONNECT MOONGODB ⚠️ ⚠️ ⚠️")
    process.exit(1);
 }
}

export default connectDB;