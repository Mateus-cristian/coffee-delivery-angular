export interface IProducts {
  api: IProduct[];
}

export interface IProduct {
  id: number;
  image:string;
  name: string;
  description: string;
  price: number | string;
  quantity: number;
  amount: number;
  variation: [
    {
      name: string;
    }
  ];
}

export interface IAddress {
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;
  methodPayment: string;
  numero: string;
  rua: string;
}