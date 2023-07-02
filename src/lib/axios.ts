import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("Usuário não autorizado!");
    } else if (error.response.status === 409) {
      console.log(error.response.data.mensagem);
    } else {
      alert("Erro na requisição");
    }
    throw error;
  }
);
