import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import styles from "./NaoEncontrada.module.css";
import Botao from "componentes/Botao";
import { useNavigate } from "react-router-dom";

export default function NaoEncontrada() {
  const navigate = useNavigate();

  function irProdutos() {
    navigate("/produtos");
  }
  function irHome() {
    navigate("/");
  }
  return (
    <>
      <CabecalhoListaProdutos
        titulo="Ops! Essa página não existe."
        subtitulo="Erro 404, página não encontrada."
      />
      <div className={styles.containerNaoEncontrada}>
        <div className={styles.conteudo}>
          <h3>Continue navegando pelo nosso site:</h3>
          <Botao primario={false} onClick={irHome}>
            Ir para home
          </Botao>
          <Botao primario={false} onClick={irProdutos}>
            Continuar comprando
          </Botao>
        </div>
      </div>
    </>
  );
}
