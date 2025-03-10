import { create } from "zustand";
import { Products } from "@/types/products";
import { ProductInCart } from "@/types/cart";
import useProducts from './useProducts'


interface TypeUseCart {
    cart : ProductInCart[];
    addToCart : (value:Products) => void ;
    deleteFromCart : (value:Products) => void ;
    deleteAllcart : () => void ;
}

const useCart = create<TypeUseCart>((set) => ({
    cart: (() => {
        try {
          return JSON.parse(localStorage.getItem('cart')!) || [];
        } catch (error) {
          console.error("Error parsing cart data:", error);
          return [];
        }
      })(),      
    addToCart : (value:Products) => set((state) => {
        const { minStock } = useProducts.getState()
        const isExist = state.cart.find((product) => product._id == value._id)
        minStock(value._id)
        if(isExist) {
            const final = state.cart.map((product) => product._id == value._id ? { ...product, qty : product.qty + 1, totalPrice : (product.qty + 1) * product.price } : product)
            if(!state.cart.length) localStorage.removeItem('cart')
            else localStorage.setItem('cart', JSON.stringify(final) )
            return { cart : final }
        } else {
            const final = [...state.cart, { ...value, qty : 1, totalPrice : value.price }]
            if(!state.cart.length) localStorage.removeItem('cart')
            else localStorage.setItem('cart', JSON.stringify(final) )
            return { cart : final }
        }
    }),
    deleteFromCart : (value) => set((state) => {
        const productInCart = state.cart.find((el) => el._id == value._id)
        if(productInCart?.qty == 1) {
            const final = state.cart.filter((product) => product._id !== value._id)
            localStorage.setItem('cart', JSON.stringify(final) )
            return { cart : final }
        }
        const final = state.cart.map((product) => product._id == value._id ? { ...product, qty : product.qty - 1, totalPrice : product.price * ( product.qty - 1 ) } : product)
        localStorage.setItem('cart', JSON.stringify(final) )
        return { cart : final }
    }),
    deleteAllcart : () => set(() => ({ cart : [] }))
}))

export default useCart