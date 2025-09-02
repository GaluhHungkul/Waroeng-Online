import { Product } from "./product";

export  interface ProductInCart extends Product {
    qty : number;
    totalPrice : number
}