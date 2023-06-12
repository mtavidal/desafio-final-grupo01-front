import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";
import styles from "./PainelClientePedidos.module.css";

export default function PainelClientePedidos() {
  return (
    <>
      <CabecalhoAreaRestrita
        tituloArea="Painel do Cliente"
        link1="/painelcliente/pedidos"
        titulo1="Pedidos"
        link2="/painelcliente/editar"
        titulo2="Editar Cadastro"
        link3=" "
        titulo3=" "
        link4=" "
        titulo4=" "
      />
      <div className={styles.containerPainel}>
        <div>painel cliente pedidos</div>
      </div>
    </>
  );
}
