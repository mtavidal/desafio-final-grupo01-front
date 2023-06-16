import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./modules/carrinho";
import authReducer from "./modules/usuario";

export const store = configureStore({
  reducer: {
    cartReducer,
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
