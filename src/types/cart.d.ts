import { Products } from "./products";

export  interface ProductInCart extends Products {
    qty : number;
    totalPrice : number
}