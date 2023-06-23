import { ListarProdutos } from "componentes/ListarProdutos";
import styles from "./ListagemProdutos.module.css";
import FiltrarCategorias from "componentes/FiltrarCategorias";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { useState } from "react";

export default function ListagemProdutos() {
  const [mudaCategoria, setMudaCategoria] = useState<number | undefined>(-1);

  function filtrarCategoria(id: number | undefined) {
    setMudaCategoria(id);
  }

  return (
    <div className={styles.containerListagem}>
      <CabecalhoListaProdutos
        titulo="Os melhores óculos para você!"
        subtitulo="As melhores marcas e os melhores óculos de grau, de sol e infatis em um
            só lugar!"
      />
      <div className={styles.catElistagem}>
        <FiltrarCategorias handleMudaCategoria={filtrarCategoria} />
        <ListarProdutos categoria={mudaCategoria} limitPaginas={10} />
      </div>
    </div>
  );
}
