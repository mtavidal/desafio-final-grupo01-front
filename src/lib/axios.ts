import axios from "axios";

export const api = axios.create({
  baseURL: "https://fake-store-api-atualizada-production.up.railway.app/",
  // baseURL: "http://localhost:8765",
});
