import axios from "axios";

export const api = axios.create({
  baseURL: "https://desafio-final-back-production-87a1.up.railway.app",
  // baseURL: "http://localhost:8765",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      alert("Usuário não autorizado!");
    } else if (error.response.status === 409) {
      alert(error.response.data.mensagem);
    } else {
      alert("Erro na requisição");
    }
    throw error;
  }
);
