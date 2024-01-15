import { IProduct } from "src/app/interfaces/Product";

export interface IAppState {
  cart: CartModel;
}

export class CartModel {
  public products: IProduct[] = [];
  public cart: IProduct[] = [];
  public total: number = 0;
}
