import Cabecalho from "componentes/Cabecalho";
import CabecalhoAdmin from "componentes/CabecalhoAdmin";
import CabecalhoCliente from "componentes/CabecalhoCliente";
import CarregandoPagina from "componentes/CarregandoPagina";
import Navbar from "componentes/Navbar";
import Rodape from "componentes/Rodape";
import { useAppDispatch, useAppSelector } from "hooks";
import { api } from "lib/axios";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Router from "Router";
import { finalizandoCarregamento, setUser } from "store/modules/usuario";

function App() {
  const { token, usuario, carregando } = useAppSelector(
    (state) => state.authReducer
  );
  const dispatch = useAppDispatch();
  const temUsuario = usuario ? true : false;
  const ehAdmin = usuario?.type === "Administrador" ? true : false;

  useEffect(() => {
    const estaLogado = async () => {
      try {
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // if (!usuario) {
          //   const response = await api.get(`/auth/check`);
          //   const data = await response.data;
          //   dispatch(setUser(data.usuario));
          // }
        }
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        dispatch(finalizandoCarregamento());
      }
    };
    estaLogado();
  }, [token, usuario, dispatch]);
  return (
    <>
      <Toaster toastOptions={{ duration: 2000 }} />
      {carregando ? (
        <CarregandoPagina visibilidade={carregando} />
      ) : (
        <>
          <Cabecalho />
          <Navbar ehAdmin={ehAdmin} temUsuario={temUsuario} />
          {usuario ? ehAdmin ? <CabecalhoAdmin /> : <CabecalhoCliente /> : ""}
          <Router />
          <Rodape />
        </>
      )}
    </>
  );
}

export default App;
