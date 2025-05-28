import { create } from "zustand";
import { persist } from "zustand/middleware"
import { Products } from "@/types/products";
import { ProductInCart } from "@/types/cart";
import useProducts from './useProducts'


interface TypeUseCart {
    cart : ProductInCart[];
    addToCart : (value:Products) => void ;
    deleteFromCart : (value:Products) => void ;
}

const useCart = create<TypeUseCart>()(persist((set, get) => ({
    cart: [],      
    addToCart : (value) => {
        const { cart } = get()
        const { minStock } = useProducts.getState()
        const isExist = cart.find((product) => product._id === value._id)
        minStock(value._id)
        let final:ProductInCart[]
        if(isExist) {
            final = cart.map((product) => product._id === value._id ? { ...product, qty : product.qty + 1, totalPrice : (product.qty + 1) * product.price } : product)
        } else {
            final = [...cart, { ...value, qty : 1, totalPrice : value.price }]
        }
        set(() => ({ cart : final }))
    },
    deleteFromCart : (value) => set((state) => {
        const productInCart = state.cart.find((el) => el._id === value._id)
        if(productInCart?.qty === 1) {
            const final = state.cart.filter((product) => product._id !== value._id)
            return { cart : final }
        }
        const final = state.cart.map((product) => product._id === value._id ? { ...product, qty : product.qty - 1, totalPrice : product.price * ( product.qty - 1 ) } : product)
        return { cart : final }
    })
}), {
    name : "cart-storage"
}))

export default useCart