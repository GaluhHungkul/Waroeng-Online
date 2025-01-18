import mongoose from "mongoose";

export default async function ConnectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
    }
}