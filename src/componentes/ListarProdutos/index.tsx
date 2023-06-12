import styles from "./ListarProdutos.module.css";
import { useEffect, useState } from "react";
import { CardProduto } from "componentes/CardProduto";
import { api } from "lib/axios";
import { Produto } from "shared/interfaces/IProdutos";
import Botao from "componentes/Botao";
import { CardProdutoEditar } from "componentes/CardProdutoEditar";

interface ListarProdutosProps {
  ehPaginaHome?: boolean;
  ehPaginaAdmin?: boolean;
  limitPaginas: number;
}

export function ListarProdutos({
  ehPaginaHome = false,
  limitPaginas,
  ehPaginaAdmin = false,
}: ListarProdutosProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [limit, setLimit] = useState(limitPaginas);
  const [ehCarregamentoInicial, setEhCarregamentoInicial] = useState(true);
  const [estaCarregandoMais, setEstaCarregandoMais] = useState(false);

  const getMaisProdutos = async () => {
    try {
      setEstaCarregandoMais(true);
      const response = await api.get("/products", {
        params: {
          limit,
        },
      });
      setProdutos([...produtos, ...response.data]);
      setLimit(limit + 10);
    } catch (error) {
      alert("Erro na requisição");
    } finally {
      setEstaCarregandoMais(false);
    }
  };

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const response = await api.get("/products", {
          params: {
            limit: limitPaginas,
          },
        });
        setProdutos(response.data);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setEhCarregamentoInicial(false);
      }
    };

    getProdutos();
  }, [limitPaginas]);
  function removeProdutos(id: number) {
    const novaListaProdutos = produtos.filter((produto) => produto.id !== id);
    setProdutos([...novaListaProdutos]);
  }

  return (
    <div className={styles.containerProdutos}>
      {ehCarregamentoInicial && <p>Carregando produtos</p>}
      <div className={styles.listarProdutos}>
        {produtos.map((produto) => {
          return ehPaginaAdmin ? (
            <CardProdutoEditar
              key={produto.id}
              {...produto}
              atualizaLista={() => removeProdutos(produto.id)}
            />
          ) : (
            <CardProduto key={produto.id} {...produto} />
          );
        })}
      </div>
      {!ehCarregamentoInicial && produtos.length > 0 && (
        <Botao
          disabled={estaCarregandoMais}
          hidden={ehPaginaHome}
          onClick={getMaisProdutos}
        >
          {estaCarregandoMais ? "Carregando" : "Carregar mais produtos"}
        </Botao>
      )}
    </div>
  );
}
