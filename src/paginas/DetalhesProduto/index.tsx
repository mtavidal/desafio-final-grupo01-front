import { useLocation } from "react-router-dom";
import styles from "./DetalhesProduto.module.css";
import { Produto } from "shared/interfaces/IProdutos";

export default function DetalhesProduto() {
  const location = useLocation();
  const produto = location.state as Produto;

  return (
    <div className={styles.containerDetalhes}>
      <h1>Pagina Detalhes do produto: </h1>
      <div className={styles.cardDetalhes}>
        <img src={produto.image} alt={`produto ${produto.title}`} />
        <div>
          <h1>{produto.title}</h1>
          <h3>Categoria: {produto.category}</h3>
          <h4>Descrição: {produto.description}</h4>
          <h2>R${produto.price}</h2>
          <button>Adicionar no Carrinho</button>
          <button>Continuar comprando</button>
        </div>
      </div>
    </div>
  );
}
