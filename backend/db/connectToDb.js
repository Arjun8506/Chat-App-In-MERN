import mongoose from "mongoose";

const connectToDatabase = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connection successful");
    } catch (error) {
        console.log("not connected");
    }

}

export default connectToDatabase;
