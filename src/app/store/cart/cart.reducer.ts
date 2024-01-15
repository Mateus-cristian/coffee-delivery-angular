import { createReducer, on } from '@ngrx/store';
import { CartModel } from './cart.model';
import {
  addProductToCart,
  removeProductCart,
  clearCart,
  updatePageProducts,
  updateProductCart,
} from './cart.action';
import { IProduct } from 'src/app/interfaces/Product';

export const initialState: CartModel = {
  products: [],
  cart: [],
  total: 0,
};

// Função para calcular o total dos itens
function reducerTotalProducts(products:IProduct[]){
 return products.reduce((acc,currentValue) => {
    const valueProduct = Number(currentValue.price) * currentValue.quantity;
    return (acc += valueProduct);
  },0)
}

export const cartReducer = createReducer(
  initialState,
  on(updatePageProducts, (state, { products }) => {
    return {
      ...state,
      products: products,
    };
  }),

  // Adiciona o produto ao carrinho e atualiza o state de produtos e total
  on(addProductToCart, (state, { product }) => {
    const index = state.cart.findIndex((p) => p.id === product.id);
    let stateProduct = state.cart;

    if (index === -1) {
      stateProduct = [...state.cart, product];
    } else {
      stateProduct = state.cart.map((productState) => {
        if (productState.id === product.id) {
          return product;
        }
        return productState;
      });
    }

    // Atualiza o estado dos produtos
    const updateStateProduct = state.products.map((productState) => {
      if (productState.id === product.id) {
        return product;
      }
      return productState;
    });

    const totalProducts = reducerTotalProducts(updateStateProduct);

    return {
      ...state,
      cart: stateProduct,
      products: updateStateProduct,
      total: totalProducts,
    };
  }),

  // Remove o produto ao carrinho e atualiza o state de produtos e total
  on(removeProductCart, (state, { product }) => {
    const removeItem = state.cart.filter(
      (productState) => productState.id !== product.id
    );

    // Atualiza o estado dos produtos
    const updateStateProduct = state.products.map((productState) => {
      if (productState.id === product.id) {
        return { ...product, quantity: 0 };
      }
      return productState;
    });

    const totalProducts = reducerTotalProducts(updateStateProduct);

    return {
      products: updateStateProduct,
      cart: removeItem,
      total: totalProducts,
    };
  }),

  // limpa todo o estado
  on(clearCart, (state) => {
    return { cart: [], products: [], total: 0 };
  }),

  // altera um produto do carrinho e atualiza os estados demais
  on(updateProductCart, (state, { product, method }) => {
    let updateProductInCart = {} as IProduct;

    // atualiza o produto do carrinho conforme o metodo 'add' ou 'remove'
    // que adiciona ou remove 1 no contador do produto
    const updateStateCart = state.cart.map((productInCart) => {
      const findProductInCart = productInCart.id === product.id;

      if (findProductInCart && method === 'add') {
        const addCountToProduct = productInCart.quantity + 1;
        updateProductInCart = { ...productInCart, quantity: addCountToProduct };

        return { ...productInCart, quantity: addCountToProduct };
      } else if (findProductInCart && method === 'remove') {
        const subtractIfGreaterThanZero =
          productInCart.quantity > 0 ? productInCart.quantity - 1 : 0;

        updateProductInCart = {
          ...productInCart,
          quantity: subtractIfGreaterThanZero,
        };
        return { ...productInCart, quantity: subtractIfGreaterThanZero };
      }
      return productInCart;
    });

    // Atualiza o estado dos produtos
    const updateStateProduct = state.products.map((productState) => {
      if (productState.id === product.id) {
        return updateProductInCart;
      }
      return productState;
    });

    const totalProducts = reducerTotalProducts(updateStateProduct);

    return {
      cart: updateStateCart,
      products: updateStateProduct,
      total: totalProducts,
    };
  })
);
