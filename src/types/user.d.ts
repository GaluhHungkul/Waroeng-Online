export interface TypeUser {
    _id : string;
    username : string;
    password : string;
    role : string;
    isMember : boolean;
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