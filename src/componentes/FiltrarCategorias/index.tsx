import Botao from "componentes/Botao";
import styles from "./FiltrarCategorias.module.css";
import { useState } from "react";

export default function FiltrarCategorias() {
  const [ehInfantil, setEhinfantil] = useState(false);
  const [ehDeGrau, setEhDeGrau] = useState(false);
  const [ehDeSol, setEhDeSol] = useState(false);
  return (
    <div className={styles.containerCategorias}>
      <form action="">
        <h3>Categorias</h3>
        <label htmlFor="catDeGrau">
          <input
            id="catDeGrau"
            checked={ehDeSol}
            onChange={(evento) => setEhDeSol(evento.target.checked)}
            type="checkbox"
          />
          Óculos de Grau
        </label>
        <label htmlFor="catDeSol">
          <input
            id="catDeSol"
            checked={ehDeGrau}
            onChange={(evento) => setEhDeGrau(evento.target.checked)}
            type="checkbox"
          />
          Óculos de Sol
        </label>
        <label htmlFor="catInfantil">
          <input
            id="catInfantil"
            checked={ehInfantil}
            onChange={(evento) => setEhinfantil(evento.target.checked)}
            type="checkbox"
          />
          Óculos Infantil
        </label>
        <Botao primario={false}>Filtrar</Botao>
      </form>
    </div>
  );
}
