import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/interfaces/Product';

export const updatePageProducts = createAction(
  '[Cart] Add updatePageProducts',
  props<{ products: IProduct[] }>()
);

export const addProductToCart = createAction(
  '[Cart] Add Product',
  props<{ product: IProduct }>()
);


export const removeProductCart = createAction(
  '[Cart] Remove Product',
  props<{ product: IProduct }>()
);

export const updateProductCart = createAction(
  '[Cart] updateProductCart Product',
  props<{ product: IProduct, method: "add" | "remove" }>()
);

export const clearCart = createAction('[Cart] Clear Cart');
