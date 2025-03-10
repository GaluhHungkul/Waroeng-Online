import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Slices/cartSlice'

const store = configureStore({
    reducer : {
        cart : cartReducer
    }
})

console.log('INITIAL STORE => ' , store.getState())

store.subscribe(() => {
    console.log('TERJADI PERUBAHAN PADA STORE => ' , store.getState())
})

export default store