import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetalhesProduto.module.css";
import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";
import Botao from "componentes/Botao";
import { useAppDispatch } from "hooks";
import { addProduto } from "store/modules/carrinho";
import toast from "react-hot-toast";

export default function DetalhesProduto() {
  const dispatch = useAppDispatch();

  const adicionarProdutoCarrinho = (produto: ProdutoNoCarrinho) => {
    const carrinhoLocalStorage: ProdutoNoCarrinho[] = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );
    if (carrinhoLocalStorage.filter((e) => e.id === produto.id).length > 0) {
      alert("Produto já adicionado no carrinho.");
    } else {
      produto.quantidade = 1;
      dispatch(addProduto(produto));
      notify();
    }
  };

  const location = useLocation();
  const produtoNoCarrinho = location.state as ProdutoNoCarrinho;
  const navigate = useNavigate();

  function irParaProdutos() {
    navigate("/produtos");
  }
  const notify = () => toast.success("Item adicionado no carrinho.");
  return (
    <div className={styles.containerDetalhes}>
      <div className={styles.cardDetalhes}>
        <div className={styles.imgWrapper}>
          <img
            src={produtoNoCarrinho.image}
            alt={`produto ${produtoNoCarrinho.title}`}
            className={styles.hoverZoom}
          />
        </div>

        <div className={styles.textosDetalhes}>
          <h1>{produtoNoCarrinho.title}</h1>
          <h3>Categoria: {produtoNoCarrinho.category.nome}</h3>
          <h4>Descrição: {produtoNoCarrinho.description}</h4>
          <h2>
            {new Intl.NumberFormat("PT-BR", {
              style: "currency",
              currency: "BRL",
            }).format(produtoNoCarrinho.price)}
          </h2>
          <Botao
            primario={false}
            onClick={() => adicionarProdutoCarrinho(produtoNoCarrinho)}
          >
            Adicionar no Carrinho
          </Botao>
        </div>
      </div>
      <Botao onClick={irParaProdutos}>Continuar comprando</Botao>
    </div>
  );
}
