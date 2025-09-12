import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: false, 
  },
  username: {
    type: String,
  },
  oauthProvider: {
    type: String, 
    default: null,
  },
  role: {
    type: String,
    required: true,
    default: "Customer",
    enum : ["Customer", "Admin"]
  },
  isMember: {
    type: Boolean,
    required: true,
    default: false,
  },
});


const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User