import styles from "./PainelAdminPedido.module.css";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { Pedido } from "shared/interfaces/IPedido";
import { useEffect, useState } from "react";
import { api } from "lib/axios";
import Botao from "componentes/Botao";
import { toast } from "react-hot-toast";
import CarregandoPagina from "componentes/CarregandoPagina";

export default function PainelAdminPedido() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [pedidoDeletado, setPedidoDeletado] = useState(0);
  function formataData(isoDate: string) {
    const data = new Date(isoDate);
    return data.toLocaleDateString("pt-BR");
  }
  useEffect(() => {
    const getPedidos = async () => {
      try {
        const response = await api.get("/carts");
        setPedidos(response.data);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setCarregando(false);
      }
    };
    getPedidos();
  }, [pedidoDeletado]);

  const notifyDeletePedido = (id: any) =>
    toast.success(`Pedido com id: ${id} deletado com sucesso!`);

  const deletarPedido = async (id: number) => {
    const confirmaDeletar = window.confirm(
      `Tem certeza que deseja deletar o pedido de id: ${id}?`
    );
    if (confirmaDeletar) {
      setCarregando(true);
      try {
        const response = await api.delete(`/carts/${id}`);
        setPedidoDeletado(id);
        notifyDeletePedido(response.data);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setCarregando(false);
      }
    }
  };

  return (
    <>
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Pedidos"
        subtitulo="Visualize e delete os pedidos"
      />
      {carregando ? (
        <>
          <div className={styles.containerPaginaSucesso}></div>
          <CarregandoPagina visibilidade={carregando} />
        </>
      ) : (
        <div className={styles.containerPaginaSucesso}>
          <div className={styles.containerPedido}>
            {pedidos.map((pedido) => {
              return (
                <div className={styles.espacoPedidos} key={pedido.id}>
                  <div className={styles.paginaSucessoTitulo}>
                    <h2>Id do pedido: {pedido.id}</h2>
                    <h2>Id do cliente: {pedido.userId}</h2>
                    <h2>Data do pedido: {formataData(pedido.data)}</h2>
                  </div>
                  <h4>Itens do pedido: </h4>
                  <div className={styles.detalhesProdutoPedido}>
                    <div className={styles.detalhesProdutoPedidoTextos}>
                      {pedido.produtos.map((produto) => {
                        return (
                          <div
                            key={produto.id}
                            className={styles.cardItensPedido}
                          >
                            <h3> Qnt: {produto.quantidade} </h3>
                            <h3> {produto.title} </h3>
                            <h3>
                              {new Intl.NumberFormat("PT-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(produto.price)}
                            </h3>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.detalhesProdutoPedidoBotao}>
                      <Botao
                        primario={false}
                        onClick={() => deletarPedido(pedido.id)}
                      >
                        Deletar
                      </Botao>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
