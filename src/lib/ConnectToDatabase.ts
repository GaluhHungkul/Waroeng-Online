import mongoose from "mongoose";

export default async function ConnectToDatabase(msg="") {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_URL!)
        console.log("Connected to MongoDB Atlas " , msg)
    } catch (error) {
        console.log("MongoDB Atlas connection error : " , error)
    }
}