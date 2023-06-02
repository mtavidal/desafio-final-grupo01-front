import { ListarProdutos } from "componentes/ListarProdutos";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function irParaProdutos() {
    navigate("/produtos");
  }
  return (
    <div className={styles.containerHome}>
      <h1>Pagina Home</h1>
      <ListarProdutos ehPaginaHome={true} limitPaginas={5} />
      <button onClick={irParaProdutos}>Ir para produtos</button>
    </div>
  );
}
