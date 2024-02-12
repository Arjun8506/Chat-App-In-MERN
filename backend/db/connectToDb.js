import mongoose from "mongoose";

const connectToDatabase = ()=>{

    try {
        mongoose.connect("mongodb://127.0.0.1:27017/Chat-App")
        console.log("connection successful");
    } catch (error) {
        console.log("not connected");
    }

}

export default connectToDatabase;
