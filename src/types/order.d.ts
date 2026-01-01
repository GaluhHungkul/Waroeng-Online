import { TypeUser } from "./user";

export type Order = {
  _id : string
  userId : TypeUser
  orderedProducts : OrderedProduct[]
  totalPrice: number
  paymentMethod: "cod" | "midtrans"
  paymentStatus: "unpaid" | "paid" | "failed"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt : Date;
  updatedAt : Date
  midtrans: {
    transactionStatus: string,
    paymentType: string,
    fraudStatus: string,
    paymentLink?: string
  },
}

type OrderedProduct = {
    productId : string
    price : number
    name : string
    img : string;
    quantity : number
  }