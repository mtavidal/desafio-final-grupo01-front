import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import styles from "./SucessoDoPedido.module.css";
import { useLocation } from "react-router-dom";
import { Pedido } from "shared/interfaces/IPedido";
// import { api } from "lib/axios";

export default function SucessoDoPedido() {
  const location = useLocation();
  const pedidoRetorno = location.state as Pedido;
  // const getPedido = async () => {
  //   try {
  //     const response = await api.get(`/cart/${pedidoRetorno.id}`);
  //     console.log(response.data);
  //   } catch (error) {
  //     alert("Erro na requisição");
  //   }
  // };
  // getPedido();

  return (
    <div>
      <CabecalhoListaProdutos
        titulo="Pedido Realizado com Sucesso!"
        subtitulo="Veja detalhes do seu pedido"
      />
      <div className={styles.containerPaginaSucesso}>
        <div>
          <h2>Id do pedido: {pedidoRetorno.id}</h2>
          <h2>Data do pedido: {pedidoRetorno.date}</h2>
        </div>
        <p>lista com os itens do pedido</p>
      </div>
    </div>
  );
}
