import { ListarProdutos } from "componentes/ListarProdutos";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Botao from "componentes/Botao";
import CarrosselBanner from "componentes/CarrosselBanner";
import logoCarrera from "./imagens/CARRERA-LOGO.png";
import logoDior from "./imagens/LOGO-DIOR.png";
import logoOakley from "./imagens/LOGO-OAKLEY.png";
import logoRayban from "./imagens/LOGO-RAYBAN.png";
import logoVogue from "./imagens/VOGUE-LOGO.png";

export default function Home() {
  const navigate = useNavigate();

  function irParaProdutos() {
    navigate("/produtos");
  }
  return (
    <div className={styles.containerHome}>
      <h1 className={styles.titulo}>
        Aqui você encontra as melhores marcas de óculos com os melhores preços
        do Brasil!
      </h1>
      <CarrosselBanner />
      <div className={styles.containerMarcas}>
        <img src={logoCarrera} alt="logo carrera" />
        <img src={logoDior} alt="logo dior" />
        <img src={logoOakley} alt="logo oakley" />
        <img src={logoRayban} alt="logo rayban" />
        <img src={logoVogue} alt="logo vogue" />
      </div>
      <ListarProdutos ehPaginaHome={true} limitPaginas={5} />
      <Botao onClick={irParaProdutos}>Ir para produtos</Botao>
    </div>
  );
}
