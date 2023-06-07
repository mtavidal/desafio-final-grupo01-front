import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Produto } from "shared/interfaces/IProdutos";

interface CartState {
  cart: Produto[];
}

const initialState: CartState = {
  cart: [],
  //localstorage verificar
  //lembrar de limpar o carrinho
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduto: (state, action: PayloadAction<Produto>) => {
      const productInCart = state.cart.some(
        (product) => product.id === action.payload.id
      );

      if (productInCart) {
        alert("Produto já está no carrinho!");
        return;
      }

      state.cart = [...state.cart, action.payload];
    },
    removerProduto: (state, action: PayloadAction<Produto["id"]>) => {
      const productId = action.payload;
      const newCart = state.cart.filter((product) => product.id !== productId);
      state.cart = newCart;
    },
    esvaziarCarrinho: (state) => {
      state.cart = [];
    },
  },
});

export const { addProduto, removerProduto, esvaziarCarrinho } =
  cartSlice.actions;

export default cartSlice.reducer;
