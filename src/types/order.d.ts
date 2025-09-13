import { Product } from "./product";
import { TypeUser } from "./user";

export type Order = {
  _id : string
  user: TypeUser,
  products: {
    product : Product
    price : number
    name : string
    quantity : number
  }[]
  totalPrice: number
  paymentMethod: "COD" | "Transfer" | "Credit Card" | "PayPal"
  paymentStatus: "unpaid" | "paid"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt : Date;
  updatedAt : Date
}