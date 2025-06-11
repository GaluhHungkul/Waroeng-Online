import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            productName: { type: String, required: true },
            productPrice: { type: Number, required: true },
            productCategory: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    purchasedAt: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    historyShopping: { 
        type: [HistorySchema], 
        default: []    
    },
    role : {
        type : String,
        required : true, 
        default : "Customer"
    },
    isMember : {
        type : Boolean, 
        required : true, 
        default : false
    },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User