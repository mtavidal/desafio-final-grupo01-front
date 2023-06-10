import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";

interface CartState {
  cart: ProdutoNoCarrinho[];
}

const carrinhoLocalStorage = JSON.parse(
  localStorage.getItem("carrinho") || "[]"
);

const initialState: CartState = {
  cart: carrinhoLocalStorage ? carrinhoLocalStorage : [],
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
      localStorage.setItem("carrinho", JSON.stringify(state.cart));
    },
    removerProduto: (state, action: PayloadAction<ProdutoNoCarrinho["id"]>) => {
      const productId = action.payload;
      const newCart = state.cart.filter((product) => product.id !== productId);
      state.cart = newCart;
      localStorage.setItem("carrinho", JSON.stringify(state.cart));
    },
    esvaziarCarrinho: (state) => {
      state.cart = [];
      localStorage.setItem("carrinho", JSON.stringify(state.cart));
    },
  },
});

export const { addProduto, removerProduto, esvaziarCarrinho } =
  cartSlice.actions;

export default cartSlice.reducer;
