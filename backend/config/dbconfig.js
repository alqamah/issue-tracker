import mongoose from "mongoose";
export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/issueTracker");
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);
    }
}