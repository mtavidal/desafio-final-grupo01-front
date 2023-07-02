import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetalhesProduto.module.css";
import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";
import Botao from "componentes/Botao";
import { useAppDispatch } from "hooks";
import { addProduto } from "store/modules/carrinho";
import toast from "react-hot-toast";
import { api } from "lib/axios";
import { useEffect, useState } from "react";
import CarregandoPagina from "componentes/CarregandoPagina";

export default function DetalhesProduto() {
  const dispatch = useAppDispatch();
  const [carregandoProduto, setCarregandoProduto] = useState(true);
  const [produtoNoCarrinho, setProdutoNoCarrinho] =
    useState<ProdutoNoCarrinho>();

  const adicionarProdutoCarrinho = (produto: ProdutoNoCarrinho) => {
    const carrinhoLocalStorage: ProdutoNoCarrinho[] = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );
    if (carrinhoLocalStorage.filter((e) => e.id === produto.id).length > 0) {
      notifyJaNoCarrinho();
    } else {
      produto.quantidade = 1;
      dispatch(addProduto(produto));
      notify();
    }
  };

  const location = useLocation();
  const produtoParams = location.state as ProdutoNoCarrinho;
  const navigate = useNavigate();

  function irParaProdutos() {
    navigate("/produtos");
  }
  const notify = () => toast.success("Item adicionado no carrinho.");

  const notifyJaNoCarrinho = () =>
    toast.success("Este produto já está no carrinho", { icon: "⚠️" });

  useEffect(() => {
    const getProdutoId = async () => {
      try {
        const response = await api.get(`/produtos/${produtoParams.id}`);
        const data = await response.data;
        const conversaoProduto = {
          id: data.idproduto,
          title: data.nome,
          image: data.foto,
          price: data.preco,
          description: data.descricao,
          category: data.categorias,
          quantidade: 1,
        };
        setProdutoNoCarrinho(conversaoProduto);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setCarregandoProduto(false);
      }
    };
    getProdutoId();
  }, [produtoParams.id]);

  return (
    <>
      {carregandoProduto ? (
        <>
          <div className={styles.containerPainel}></div>
          <CarregandoPagina visibilidade={carregandoProduto} />
        </>
      ) : (
        <div className={styles.containerDetalhes}>
          <div className={styles.cardDetalhes}>
            <div className={styles.imgWrapper}>
              <img
                src={produtoNoCarrinho?.image}
                alt={`produto ${produtoNoCarrinho?.title}`}
                className={styles.hoverZoom}
              />
            </div>

            <div className={styles.textosDetalhes}>
              <h1>{produtoNoCarrinho?.title}</h1>
              <h3>Categoria: {produtoNoCarrinho?.category?.nome}</h3>
              <h4>Descrição: {produtoNoCarrinho?.description}</h4>
              <h2>
                {new Intl.NumberFormat("PT-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(produtoNoCarrinho ? produtoNoCarrinho.price : 0)}
              </h2>
              <Botao
                primario={false}
                onClick={() =>
                  produtoNoCarrinho
                    ? adicionarProdutoCarrinho(produtoNoCarrinho)
                    : ""
                }
              >
                Adicionar no Carrinho
              </Botao>
            </div>
          </div>
          <Botao onClick={irParaProdutos}>Continuar comprando</Botao>
        </div>
      )}
      ;
    </>
  );
}
