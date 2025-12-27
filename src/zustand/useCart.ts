import { create } from "zustand";
import { persist } from "zustand/middleware"
import { DetailProduct } from "@/types/api_response";
import { ProductInCart } from "@/types/cart";


interface TypeUseCart {
    cart : ProductInCart[];
    addToCart : (value:DetailProduct) => void ;
    deleteFromCart : (value:DetailProduct) => void ;
    clearCart : () => void;
}

const useCart = create<TypeUseCart>()(persist((set, get) => ({
    cart: [],      
    addToCart : (value) => {
        const { cart } = get()
        const isExist = cart.find((product) => product.id === value.id)
        let final
        if(isExist) {
            final = cart.map((product) => product.id === value.id ? { ...product, qty : product.qty + 1, totalPrice : (product.qty + 1) * product.price } : product)
        } else {
            final = [...cart, { ...value, qty : 1, totalPrice : value.price }]
        }
        set(() => ({ cart : final }))
        console.log(final.map(item => [item.id, item.title, item.qty]))
    },
    deleteFromCart : (value) => {
        const { cart } = get()
        const productInCart = cart.find((el) => el.id === value.id)
        if(!productInCart) return 
        let final;
        if(productInCart?.qty === 1) final = cart.filter((product) => product.id !== value.id) 
        else final = cart.map((product) => product.id === value.id ? { ...product, qty : product.qty - 1, totalPrice : product.price * ( product.qty - 1 ) } : product)
        set(() => ({ cart : final }))
    },
    clearCart : () => set(() => ({ cart : [] }))
}), {
        name : "cart-storage",
        
    }
))

export default useCart