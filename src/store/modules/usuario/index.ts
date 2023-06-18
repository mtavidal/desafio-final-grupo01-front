import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Usuario } from "shared/interfaces/IUsuarios";

interface LoginResponse {
  token: string;
  usuario: Usuario;
}

interface UserState {
  usuario: Usuario | null;
  token: string | null;
}

const token =
  localStorage.getItem("@desafio-final-grupo01-front:token") || null;

const initialState: UserState = {
  usuario: null,
  token,
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
    setUser: (state, action: PayloadAction<Usuario>) => {
      state.usuario = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
