import axios from "axios";

export const api = axios.create({
  baseURL: "https://desafio-final-back-production-87a1.up.railway.app",
  // baseURL: "http://localhost:8765",
});
