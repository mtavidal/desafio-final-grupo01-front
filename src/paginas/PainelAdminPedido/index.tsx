import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";
import styles from "./PainelAdminPedido.module.css";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { Pedido } from "shared/interfaces/IPedido";
import { useEffect, useState } from "react";
import { api } from "lib/axios";
import Botao from "componentes/Botao";

export default function PainelAdminPedido() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(false);
  function formataData(isoDate: string) {
    const data = new Date(isoDate);
    return data.toLocaleDateString("pt-BR");
  }
  useEffect(() => {
    const getPedidos = async () => {
      try {
        setCarregando(true);
        const response = await api.get("/carts");
        setPedidos(response.data);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setCarregando(false);
      }
    };
    getPedidos();
  }, []);
  console.log(pedidos);
  return (
    <>
      <CabecalhoAreaRestrita
        tituloArea="Painel do Administrador"
        link1="/paineladmin/pedidos"
        titulo1="Pedidos"
        link2="/paineladmin/produtos"
        titulo2="Produtos"
        link3="/paineladmin/usuarios"
        titulo3="Usuários"
        link4="/paineladmin/categorias"
        titulo4="Categorias"
      />
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Pedidos"
        subtitulo="Visualize e delete os pedidos"
      />{" "}
      {carregando ? (
        <h1> Carregando pedidos... </h1>
      ) : (
        <div className={styles.containerPaginaSucesso}>
          <div className={styles.containerPedido}>
            {pedidos.map((pedido) => {
              return (
                <div className={styles.espacoPedidos} key={pedido.id}>
                  <div className={styles.paginaSucessoTitulo}>
                    <h2>Id do pedido: {pedido.id}</h2>
                    <h2>Data do pedido: {formataData(pedido.data)}</h2>
                  </div>
                  <h4>Itens do pedido: </h4>
                  <div className={styles.detalhesProdutoPedido}>
                    <div>
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
                    <Botao primario={false}>Deletar</Botao>
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
