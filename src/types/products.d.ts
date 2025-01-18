export interface Products {
    _id: number;
    name: string;
    price: number;
    description: string;
    img: string;
    rate : {
      value: number;
      count: number;
    };
    category : string
    qty : number
  }