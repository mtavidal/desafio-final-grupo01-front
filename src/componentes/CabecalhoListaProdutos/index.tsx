import styles from "./CabecalhoListaProdutos.module.css";

interface CabecalhoListaProdutosProps {
  titulo: string;
  subtitulo?: string;
}

export default function CabecalhoListaProdutos({
  titulo,
  subtitulo,
}: CabecalhoListaProdutosProps) {
  return (
    <div className={styles.containerCabProdutos}>
      <h1>{titulo}</h1>
      <h3>{subtitulo}</h3>
    </div>
  );
}
