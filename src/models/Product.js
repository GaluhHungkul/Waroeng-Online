import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Harga tidak boleh negatif']
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rate : {
        value : {
            type: Number,
            required: true,
            min: [0, 'Nilai tidak boleh negatif'],
            max: [5, 'Nilai tidak boleh melebihi 5']
        },
        count : {
            type: Number,
            required: true,
            min: [0, 'Jumlah tidak boleh negatif']
        }
    }
})

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)

export default Product;