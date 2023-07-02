import styles from "./PainelAdminPedido.module.css";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { Pedido } from "shared/interfaces/IPedido";
import { useEffect, useState } from "react";
import { api } from "lib/axios";
import Botao from "componentes/Botao";
import { toast } from "react-hot-toast";
import CarregandoPagina from "componentes/CarregandoPagina";
import ModalComp from "componentes/ModalComp";

export default function PainelAdminPedido() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [pedidoDeletado, setPedidoDeletado] = useState(0);

  const limit = 10;
  const [skip, setSkip] = useState(10);
  const [totalPedidoBanco, setTotalPedidoBanco] = useState(0);
  const [estaCarregandoMais, setEstaCarregandoMais] = useState(false);

  const [abrirModal, setAbrirModal] = useState(false);
  const [idDelete, setIdDelete] = useState<number | null>(null);

  function formataData(isoDate: string) {
    const data = new Date(isoDate);
    return data.toLocaleDateString("pt-BR");
  }

  const getMaisPedidos = async () => {
    setEstaCarregandoMais(true);
    try {
      const response = await api.get("/carts", {
        params: {
          limit,
          sort: "desc",
          skip,
        },
      });

      setPedidos([...pedidos, ...response.data.carts]);
      setSkip(skip + 10);
      setTotalPedidoBanco(response.data.total);
    } catch (error) {
      alert("Erro na requisição");
    } finally {
      setEstaCarregandoMais(false);
    }
  };

  useEffect(() => {
    console.log("UseEffect");
    const getPedidos = async () => {
      try {
        const response = await api.get("/carts", {
          params: {
            limit,
            sort: "desc",
          },
        });
        const data = await response.data;
        console.log("Retorno api", data);
        setPedidos(data.carts);
        setTotalPedidoBanco(data.total);
        setSkip(10);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setCarregando(false);
      }
    };
    getPedidos();
  }, [pedidoDeletado]);

  useEffect(() => {
    if (idDelete) {
      setAbrirModal(true);
    }
  }, [idDelete]);

  const notifyDeletePedido = (id: any) =>
    toast.success(`Pedido com id: ${id} deletado com sucesso!`);

  const deletarPedido = async (id: number | null) => {
    if (!id) {
      return;
    }
    setCarregando(true);
    try {
      const response = await api.delete(`/carts/${id}`);
      const data = await response.data;
      setPedidoDeletado(id);
      notifyDeletePedido(data);
      setSkip(skip - 1);
    } catch (error) {
      alert("Erro na requisição");
    } finally {
      setCarregando(false);
      setAbrirModal(false);
      setIdDelete(null);
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
            {pedidos.length === 0 ? (
              <h2 className={styles.tituloSemPedido}>
                Nenhum pedido realizado.
              </h2>
            ) : (
              <>
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
                          <>
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
                          </>
                          <div className={styles.totalPedido}>
                            <h4>Total:</h4>
                            <h4>
                              {new Intl.NumberFormat("PT-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(pedido.totalPedido)}
                            </h4>
                          </div>
                        </div>
                        <div className={styles.detalhesProdutoPedidoBotao}>
                          <Botao
                            primario={false}
                            onClick={() => setIdDelete(pedido.id)}
                          >
                            Deletar
                          </Botao>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {!carregando && pedidos.length > 0 && (
              <div style={{ paddingTop: 25 }}>
                <Botao
                  disabled={estaCarregandoMais}
                  hidden={totalPedidoBanco <= skip}
                  onClick={getMaisPedidos}
                >
                  {estaCarregandoMais ? "Carregando" : "Carregar mais pedidos"}
                </Botao>
              </div>
            )}
          </div>
        </div>
      )}
      <ModalComp
        contentLabel="Modal confirma deletar"
        mostrarModal={abrirModal}
        handleConfirmarModal={() => deletarPedido(idDelete)}
        handleFecharModal={() => {
          setAbrirModal(false);
          setTimeout(() => setIdDelete(null), 500);
        }}
      >
        {`Deseja realmente deletar o pedido de id: ${idDelete}?`}
      </ModalComp>
    </>
  );
}
