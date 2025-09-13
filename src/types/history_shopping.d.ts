export type TypeHistoryShopping = {
  products: [
    {
      productId: string;
      quantity: number;
      productName: string;
      productPrice: number;
      productCategory: string;
    }
  ];
  purchasedAt: Date;
  totalPrice: number;
}[];