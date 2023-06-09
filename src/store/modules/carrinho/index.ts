import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";

interface CartState {
  cart: ProdutoNoCarrinho[];
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
    addProduto: (state, action: PayloadAction<ProdutoNoCarrinho>) => {
      const newCart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      state.cart = newCart;
      state.cart = [...state.cart, action.payload];
    },
    removerProduto: (state, action: PayloadAction<ProdutoNoCarrinho["id"]>) => {
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
