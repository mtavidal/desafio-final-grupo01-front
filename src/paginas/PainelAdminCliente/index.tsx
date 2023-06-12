import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";
import styles from "./PainelAdminCliente.module.css";

export default function PainelAdminCliente() {
  return (
    <>
      <CabecalhoAreaRestrita
        tituloArea="Painel do Administrador"
        link1="/paineladmin/pedidos"
        titulo1="Pedidos"
        link2="/paineladmin/produtos"
        titulo2="Produtos"
        link3="/paineladmin/clientes"
        titulo3="Clientes"
        link4="/paineladmin/categorias"
        titulo4="Categorias"
      />
      <div className={styles.containerPainel}>
        <div>Painel cliente</div>
      </div>
    </>
  );
}
