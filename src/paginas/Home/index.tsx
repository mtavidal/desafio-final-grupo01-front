import { ListarProdutos } from "componentes/ListarProdutos";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Botao from "componentes/Botao";

export default function Home() {
  const navigate = useNavigate();

  function irParaProdutos() {
    navigate("/produtos");
  }
  return (
    <div className={styles.containerHome}>
      <h1>Pagina Home</h1>
      <ListarProdutos ehPaginaHome={true} limitPaginas={5} />
      <Botao onClick={irParaProdutos}>Ir para produtos</Botao>
    </div>
  );
}
