export interface TypeUser {
    _id : string;
    username : string;
    password : string;
    historyShopping : [
        {
            products: [
                {
                    productId: string;
                    quantity: number;
                    productName: string;
                    productPrice: number;
                    productCategory: string;
                },
            ],
            purchasedAt: Date;
            totalPrice: number;
        }
    ]
}