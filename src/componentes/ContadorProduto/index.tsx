import { useState } from "react";
import styles from "./ContadorProduto.module.css";

interface ContadorProdutoProps {
  handleQtd: (valor: number) => void;
}

export default function ContadorProduto({ handleQtd }: ContadorProdutoProps) {
  const [qtdProduto, setQtdProduto] = useState(1);

  const incrementaContador = () => {
    setQtdProduto(qtdProduto + 1);
    handleQtd(qtdProduto + 1);
  };
  const decrementaContador = () => {
    if (qtdProduto > 0) {
      setQtdProduto(qtdProduto - 1);
      handleQtd(qtdProduto - 1);
    }
  };

  return (
    <div className={styles.ContainerContadorProduto}>
      <div className={styles.ContadorProduto}>
        <button onClick={decrementaContador}>-</button>
        <p>{qtdProduto}</p>
        <button onClick={incrementaContador}>+</button>
      </div>
    </div>
  );
}
