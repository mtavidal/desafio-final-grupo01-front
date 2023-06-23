import styles from "./ListarProdutos.module.css";
import { useEffect, useState } from "react";
import { CardProduto } from "componentes/CardProduto";
import { api } from "lib/axios";
import { ProdutoResponse } from "shared/interfaces/IProdutos";
import Botao from "componentes/Botao";
import { CardProdutoEditar } from "componentes/CardProdutoEditar";
import CarregandoPagina from "componentes/CarregandoPagina";

interface ListarProdutosProps {
  ehPaginaHome?: boolean;
  ehPaginaAdmin?: boolean;
  limitPaginas: number;
  atualizaLista?: number;
  categoria?: number | null;
}

export function ListarProdutos({
  ehPaginaHome = false,
  limitPaginas,
  ehPaginaAdmin = false,
  atualizaLista = 0,
  categoria = null,
}: ListarProdutosProps) {
  const [produtos, setProdutos] = useState<ProdutoResponse[]>([]);
  const limit = limitPaginas;
  const [skip, setSkip] = useState(10);
  const [totalProdutoBanco, setTotalProdutoBanco] = useState(0);
  const [ehCarregamentoInicial, setEhCarregamentoInicial] = useState(true);
  const [estaCarregandoMais, setEstaCarregandoMais] = useState(false);

  const getMaisProdutos = async () => {
    setEstaCarregandoMais(true);
    try {
      const response = await api.get("/products", {
        params: {
          limit,
          sort: "desc",
          skip,
          categoria: categoria,
        },
      });
      const responseProdutos = response.data.produtos.map(
        (produto: ProdutoResponse) => {
          return {
            id: produto.id,
            title: produto.title,
            image: produto.image,
            price: produto.price,
            description: produto.description,
            category: produto.category,
          };
        }
      );
      setProdutos([...produtos, ...responseProdutos]);
      setSkip(skip + 10);
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
            sort: "desc",
            categoria: categoria,
          },
        });
        const responseProdutos = response.data.produtos.map(
          (produto: ProdutoResponse) => {
            return {
              id: produto.id,
              title: produto.title,
              image: produto.image,
              price: produto.price,
              description: produto.description,
              category: produto.category,
            };
          }
        );
        setProdutos(responseProdutos);
        setTotalProdutoBanco(response.data.total);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setEhCarregamentoInicial(false);
      }
    };

    getProdutos();
  }, [limitPaginas, atualizaLista, categoria]);

  function removeProdutos(id: number) {
    const novaListaProdutos = produtos.filter((produto) => produto.id !== id);
    setProdutos([...novaListaProdutos]);
  }

  return (
    <div className={styles.containerProdutos}>
      {ehCarregamentoInicial && (
        <CarregandoPagina visibilidade={ehCarregamentoInicial} />
      )}
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
          hidden={ehPaginaHome || totalProdutoBanco <= skip}
          onClick={getMaisProdutos}
        >
          {estaCarregandoMais ? "Carregando" : "Carregar mais produtos"}
        </Botao>
      )}
    </div>
  );
}
