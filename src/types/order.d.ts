import { TypeUser } from "./user";

export type Order = {
  _id : string
  userId : TypeUser
  orderedProduct : OrderedProduct
  totalPrice: number
  paymentMethod: "COD" | "Transfer" | "Credit Card" | "PayPal"
  paymentStatus: "unpaid" | "paid"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt : Date;
  updatedAt : Date
}

type OrderedProduct = {
    id : string
    price : number
    name : string
    img : string;
    quantity : number
  }