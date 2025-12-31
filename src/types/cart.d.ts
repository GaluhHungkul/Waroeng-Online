import { DetailProduct } from "./api_response";

export  interface ProductInCart extends DetailProduct {
    qty : number;
}