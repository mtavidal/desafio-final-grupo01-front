import Botao from "componentes/Botao";
import styles from "./FiltrarCategorias.module.css";

export default function FiltrarCategorias() {
  return (
    <div className={styles.containerCategorias}>
      <h2>Categorias</h2>
      <form action="">
        <label htmlFor="catDeGrau">
          <input id="catDeGrau" type="checkbox" />
          Óculos de Grau
        </label>
        <label htmlFor="catDeSol">
          <input id="catDeSol" type="checkbox" />
          Óculos de Sol
        </label>
        <label htmlFor="catInfantil">
          <input id="catInfantil" type="checkbox" />
          Óculos Infantil
        </label>
        <Botao primario={false}>Filtrar</Botao>
      </form>
    </div>
  );
}
