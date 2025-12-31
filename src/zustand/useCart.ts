import { create } from "zustand";
import { persist } from "zustand/middleware"
import { DetailProduct } from "@/types/api_response";
import { ProductInCart } from "@/types/cart";


interface TypeUseCart {
    cart : ProductInCart[];
    addToCart : (value:DetailProduct) => void ;
    deleteFromCart : (value:number) => void ;
    removeFromCart : (id:number) => void;
    clearCart : () => void;
}

const useCart = create<TypeUseCart>()(persist((set, get) => ({
    cart: [],      
    addToCart : (value) => {
        const { cart } = get()
        const isExist = cart.find((product) => product.id === value.id)
        let final
        if(isExist) {
            final = cart.map((product) => product.id === value.id ? { ...product, qty : product.qty + 1 } : product)
        } else {
            final = [...cart, { ...value, qty : 1 }]
        }
        set(() => ({ cart : final }))
        console.log(cart.map(p => p.priceAfterDiscount))
    },
    deleteFromCart : (id) => {
        const { cart } = get()
        const productInCart = cart.find((el) => el.id === id)
        if(!productInCart) return 
        let final;
        if(productInCart?.qty === 1) final = cart.filter((product) => product.id !== id) 
        else final = cart.map((product) => product.id === id ? { ...product, qty : product.qty - 1 } : product)
        set(() => ({ cart : final }))
    },
    removeFromCart : (id) => set({ cart : get().cart.filter(item => item.id !== id) }),
    clearCart : () => set(() => ({ cart : [] }))
}), {
        name : "cart-storage",
        
    }
))

export default useCart