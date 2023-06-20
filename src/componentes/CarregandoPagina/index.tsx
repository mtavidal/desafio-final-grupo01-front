import styles from "./CarregandoPagina.module.css";
import logo from "../Cabecalho/logo-good-eyewear.svg";
interface CarregandoPaginaProps {
  visibilidade: boolean;
}

export default function CarregandoPagina({
  visibilidade,
}: CarregandoPaginaProps) {
  return (
    <div hidden={visibilidade} className={styles.containerCarregando}>
      <div className={styles.conteudoCarregando}>
        <img src={logo} alt="logo da empresa" />
        <h1>Carregando, aguarde.</h1>
      </div>
    </div>
  );
}
