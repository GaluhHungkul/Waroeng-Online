import { TypeUser } from "./user";

export type Order = {
  userId : TypeUser
  orderedProduct : {
    productId : string
    price : number
    name : string
    img : string;
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