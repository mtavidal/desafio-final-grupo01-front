import styles from "./ListarProdutos.module.css";
import { useEffect, useState } from "react";
import { CardProduto } from "componentes/CardProduto";
import { api } from "lib/axios";
import { Produto, ProdutoResponse } from "shared/interfaces/IProdutos";
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
      const response = await api.get(
        `/produtos/?limit=${limit}/?offset=${skip}`,
        {
          // params: {
          //   limit,
          //   sort: "desc",
          //   skip,
          //   categoria: categoria,
          // },
        }
      );
      const responseProdutos = response.data.map((produto: Produto) => {
        return {
          id: produto.idproduto,
          title: produto.nome,
          image: produto.foto,
          price: produto.preco,
          description: produto.descricao,
          category: produto.idcategoria,
        };
      });
      setProdutos([...produtos, ...responseProdutos]);
      setSkip(skip + 10);
      setTotalProdutoBanco(response.data.total);
    } catch (error) {
      alert("Erro na requisição");
    } finally {
      setEstaCarregandoMais(false);
    }
  };

  useEffect(() => {
    const getProdutos = async () => {
      setEhCarregamentoInicial(true);
      try {
        const response = await api.get(`/produtos?limit=${limitPaginas}`, {
          // params: {
          //   limit: limitPaginas,
          //   sort: "desc",
          //   categoria: categoria,
          // },
        });
        const responseProdutos = response.data.map((produto: Produto) => {
          return {
            id: produto.idproduto,
            title: produto.nome,
            image: produto.foto,
            price: produto.preco,
            description: produto.descricao,
            category: produto.idcategoria,
          };
        });
        setProdutos(responseProdutos);
        setTotalProdutoBanco(response.data.total);
        setSkip(10);
      } catch (error) {
        console.log(error);
        alert("Erro na requisição");
      } finally {
        setEhCarregamentoInicial(false);
      }
    };

    getProdutos();
  }, [limitPaginas, atualizaLista, categoria]);

  function removeProdutos(id: number) {
    const novaListaProdutos = produtos.filter((produto) => produto.id !== id);
    setSkip(skip - 1);
    setProdutos([...novaListaProdutos]);
  }

  return (
    <div className={styles.containerProdutos}>
      {ehCarregamentoInicial && (
        <CarregandoPagina visibilidade={ehCarregamentoInicial} />
      )}
      <div className={styles.listarProdutos}>
        {produtos.length === 0 ? (
          <div className={styles.semProdutos}>
            <h1>Categoria sem produtos disponíveis</h1>
          </div>
        ) : (
          <>
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
          </>
        )}
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
