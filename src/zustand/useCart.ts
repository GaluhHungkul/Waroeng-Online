import { create } from "zustand";
import { persist } from "zustand/middleware"
import { Products } from "@/types/products";
import { ProductInCart } from "@/types/cart";


interface TypeUseCart {
    cart : ProductInCart[];
    addToCart : (value:Products) => void ;
    deleteFromCart : (value:Products) => void ;
}

const useCart = create<TypeUseCart>()(persist((set, get) => ({
    cart: [],      
    addToCart : (value) => {
        const { cart } = get()
        const isExist = cart.find((product) => product._id === value._id)
        let final
        if(isExist) {
            final = cart.map((product) => product._id === value._id ? { ...product, qty : product.qty + 1, totalPrice : (product.qty + 1) * product.price } : product)
        } else {
            final = [...cart, { ...value, qty : 1, totalPrice : value.price }]
        }
        set(() => ({ cart : final }))
    },
    deleteFromCart : (value) => {
        const { cart } = get()
        const productInCart = cart.find((el) => el._id === value._id)
        if(!productInCart) return 
        let final;
        if(productInCart?.qty === 1) final = cart.filter((product) => product._id !== value._id) 
        else final = cart.map((product) => product._id === value._id ? { ...product, qty : product.qty - 1, totalPrice : product.price * ( product.qty - 1 ) } : product)
        set(() => ({ cart : final }))
    }
}), {
    name : "cart-storage"
}))

export default useCart