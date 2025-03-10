import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        value : JSON.parse(localStorage.getItem('cart')) ||  []
    },
    reducers : {
        addToCart(state, action) {
            const { id, price } = action.payload
            
            const item = state.value.find(a => a.id === id)
            if(item) {
                item.qty++  
            } else {
                state.value.push({id, price, qty : 1})
            }
            localStorage.setItem('cart', JSON.stringify(state.value))
        },
        removeFromCart(state, action) {
            const { id } = action.payload
            const index = state.value.findIndex(a => a.id === id)
            if(index === -1) return
            if(!state.value[index].qty) return
            if(state.value[index].qty === 1) state.value.splice(index, 1)
            else state.value[index].qty--
            localStorage.setItem('cart', JSON.stringify(state.value))
            if(!state.value.length) return localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify(state.value))
        }
    }
})


export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer