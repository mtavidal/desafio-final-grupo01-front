import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UsuarioResponse } from "shared/interfaces/IUsuarios";

interface LoginResponse {
  token: string;
  usuario: UsuarioResponse;
}

interface UserState {
  usuario: UsuarioResponse | null;
  token: string | null;
  carregando: boolean;
}

const token =
  localStorage.getItem("@desafio-final-grupo01-front:token") || null;

const initialState: UserState = {
  usuario: null,
  token,
  carregando: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      localStorage.setItem(
        "@desafio-final-grupo01-front:token",
        action.payload.token
      );

      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem("@desafio-final-grupo01-front:token");

      state.token = null;
      state.usuario = null;
    },
    setUser: (state, action: PayloadAction<UsuarioResponse>) => {
      state.usuario = action.payload;
    },
    finalizandoCarregamento: (state) => {
      state.carregando = false;
    },
  },
});

export const { login, logout, setUser, finalizandoCarregamento } =
  authSlice.actions;

export default authSlice.reducer;
