import { TypeUser } from "./user";

export type Order = {
  _id : string
  user : TypeUser
  orderedProduct : {
    product : string
    price : number
    name : string
    quantity : number
    _id : string
  }
  totalPrice: number
  paymentMethod: "COD" | "Transfer" | "Credit Card" | "PayPal"
  paymentStatus: "unpaid" | "paid"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt : Date;
  updatedAt : Date
}