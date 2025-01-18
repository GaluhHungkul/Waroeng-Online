import { create } from "zustand";
import { Products } from "@/types/products";
import { ProductInCart } from "@/types/cart";



interface TypeUseCart {
    cart : ProductInCart[];
    addToCart : (value:Products) => void ;
    deleteFromCart : (value:Products) => void ;
    deleteAllcart : () => void ;
}

const useCart = create<TypeUseCart>((set) => ({
    cart : [],
    addToCart : (value:Products) => set((state) => {
        const isExist = state.cart.find((product) => product._id == value._id)
        if(isExist) {
            return { cart : state.cart.map((product) => product._id == value._id ? { ...product, qty : product.qty + 1, totalPrice : (product.qty + 1) * product.price } : product) }
        } else {
            return { cart : [...state.cart, { ...value, qty : 1, totalPrice : value.price }] }
        }
    }),
    deleteFromCart : (value) => set((state) => {
        const productInCart = state.cart.find((el) => el._id == value._id)
        if(productInCart?.qty == 1) return { cart : state.cart.filter((product) => product._id !== value._id) }
        return { cart : state.cart.map((product) => product._id == value._id ? { ...product, qty : product.qty - 1, totalPrice : product.price * ( product.qty - 1 ) } : product) }
    }),
    deleteAllcart : () => set(() => ({ cart : [] }))
}))

export default useCart