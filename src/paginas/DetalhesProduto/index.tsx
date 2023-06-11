import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetalhesProduto.module.css";
import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";
import Botao from "componentes/Botao";
import { useAppDispatch } from "hooks";
import { addProduto } from "store/modules/carrinho";
import toast, { Toaster } from "react-hot-toast";

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
        <img
          src={produtoNoCarrinho.image}
          alt={`produto ${produtoNoCarrinho.title}`}
        />
        <div className={styles.textosDetalhes}>
          <h1>{produtoNoCarrinho.title}</h1>
          <h3>Categoria: {produtoNoCarrinho.category}</h3>
          <h4>Descrição: {produtoNoCarrinho.description}</h4>
          <h2>R$ {produtoNoCarrinho.price}</h2>
          <Botao
            primario={false}
            onClick={() => adicionarProdutoCarrinho(produtoNoCarrinho)}
          >
            Adicionar no Carrinho
          </Botao>
          <Toaster toastOptions={{ duration: 1200 }} />
        </div>
      </div>
      <Botao onClick={irParaProdutos}>Continuar comprando</Botao>
    </div>
  );
}
