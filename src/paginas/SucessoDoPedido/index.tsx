import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import styles from "./SucessoDoPedido.module.css";
import { useLocation } from "react-router-dom";
import { Pedido } from "shared/interfaces/IPedido";
import CardProdutoPedido from "componentes/CardProdutoPedido";

export default function SucessoDoPedido() {
  const location = useLocation();
  const pedidoRetorno = location.state as Pedido;
  function formataData(isoDate: string) {
    const data = new Date(isoDate);
    return data.toLocaleDateString("pt-BR");
  }
  return (
    <div>
      <CabecalhoListaProdutos
        titulo="Pedido Realizado com Sucesso!"
        subtitulo="Veja detalhes do seu pedido"
      />
      <div className={styles.containerPaginaSucesso}>
        <div className={styles.containerPedido}>
          <div className={styles.paginaSucessoTitulo}>
            <h2>Id do pedido: {pedidoRetorno.id}</h2>
            <h2>Data do pedido: {formataData(pedidoRetorno.data)}</h2>
          </div>
          <h4>Itens do pedido: </h4>
          {pedidoRetorno.produtos.map((produto) => {
            return <CardProdutoPedido key={produto.id} {...produto} />;
          })}
        </div>
        <div className={styles.total}>
          <h2>Total do pedido:</h2>
          <h2>
            {new Intl.NumberFormat("PT-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pedidoRetorno.totalPedido)}
          </h2>
        </div>
      </div>
    </div>
  );
}
