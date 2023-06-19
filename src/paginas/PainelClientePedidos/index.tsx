import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import styles from "./PainelClientePedidos.module.css";

export default function PainelClientePedidos() {
  return (
    <>
      {" "}
      <CabecalhoListaProdutos
        titulo="Listagem de pedidos"
        subtitulo="Visualize todos os seus pedidos"
      />
      <div className={styles.containerPainel}>
        <div>painel cliente pedidos</div>
      </div>
    </>
  );
}
