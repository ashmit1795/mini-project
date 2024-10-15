import mongoose from "mongoose";
import DB_NAME from "../constants.js";
import { error } from "console";

// Connect to MongoDB
const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch {
        console.error(error);
        throw error;
    }
}

export default connectDB;