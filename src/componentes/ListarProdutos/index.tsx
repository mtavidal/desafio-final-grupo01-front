import styles from "./ListarProdutos.module.css";
import { useEffect, useState } from "react";
import { CardProduto } from "componentes/CardProduto";
import { api } from "lib/axios";
import { Produto } from "shared/interfaces/IProdutos";
import Botao from "componentes/Botao";

interface ListarProdutosProps {
  ehPaginaHome: boolean;
  limitPaginas: number;
}

export function ListarProdutos({
  ehPaginaHome,
  limitPaginas,
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
  console.log(produtos);
  return (
    <div className={styles.containerProdutos}>
      {ehCarregamentoInicial && <p>Carregando produtos</p>}
      <div className={styles.listarProdutos}>
        {produtos.map((produto) => (
          <CardProduto key={produto.id} {...produto} />
        ))}
      </div>
      {!ehCarregamentoInicial && (
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
