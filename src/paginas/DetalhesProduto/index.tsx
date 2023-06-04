import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetalhesProduto.module.css";
import { Produto } from "shared/interfaces/IProdutos";
import Botao from "componentes/Botao";

export default function DetalhesProduto() {
  const location = useLocation();
  const produto = location.state as Produto;
  const navigate = useNavigate();

  function irParaProdutos() {
    navigate("/produtos");
  }
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
          <Botao primario={false}>Adicionar no Carrinho</Botao>
        </div>
      </div>
      <Botao onClick={irParaProdutos}>Continuar comprando</Botao>
    </div>
  );
}
