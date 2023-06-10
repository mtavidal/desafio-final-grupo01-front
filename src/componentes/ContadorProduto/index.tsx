import { useState } from "react";
import styles from "./ContadorProduto.module.css";

interface ContadorProdutoProps {
  handleQtd: (valor: number) => void;
  qtdInicial?: number;
}

export default function ContadorProduto({
  handleQtd,
  qtdInicial = 1,
}: ContadorProdutoProps) {
  const [qtdProduto, setQtdProduto] = useState(qtdInicial);

  const incrementaContador = () => {
    setQtdProduto(qtdProduto + 1);
    handleQtd(qtdProduto + 1);
  };
  const decrementaContador = () => {
    if (qtdProduto > 1) {
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
