import mongoose from "mongoose";

export default async function ConnectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_URL!)
    } catch (error) {
        console.log("MongoDB Atlas connection error : " , error)
    }
}