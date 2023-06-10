import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetalhesProduto.module.css";
import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";
import Botao from "componentes/Botao";
import { useAppDispatch } from "hooks";
import { addProduto } from "store/modules/carrinho";

export default function DetalhesProduto() {
  const dispatch = useAppDispatch();

  const adicionarProdutoCarrinho = (produto: ProdutoNoCarrinho) => {
    dispatch(addProduto(produto));
  };

  const location = useLocation();
  const produtoNoCarrinho = location.state as ProdutoNoCarrinho;
  const navigate = useNavigate();
  produtoNoCarrinho.quantidade = 1;

  function irParaProdutos() {
    navigate("/produtos");
  }

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
          <h2>R${produtoNoCarrinho.price}</h2>
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
