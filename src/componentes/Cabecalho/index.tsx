import CabecalhoLink from "componentes/CabecalhoLink";
import styles from "./Cabecalho.module.css";
import logo from "./logo-good-eyewear.svg";
import IconeCarrinho from "@mui/icons-material/ShoppingCart";
import IconeBotao from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

export default function Cabecalho() {
  const quantidadeProduto = 2;
  return (
    <header className={styles.cabecalho}>
      <nav>
        <CabecalhoLink style={styles.link} url="./">
          <img src={logo} alt="Logo do Good WearEye" />
        </CabecalhoLink>
        <div>
          <CabecalhoLink style={styles.link} url="./">
            Home
          </CabecalhoLink>
          <CabecalhoLink style={styles.link} url="#">
            Produtos
          </CabecalhoLink>
        </div>
      </nav>
      <nav className={styles.carrinho}>
        <IconeBotao
          className={styles.iconeBotao}
          disabled={false}
          // onClick={() => history.push('/carrinho')}
        >
          <Badge color="error" badgeContent={quantidadeProduto}>
            <IconeCarrinho className={styles.shoppingCartIcon} />
          </Badge>
        </IconeBotao>
        <CabecalhoLink style={styles.link} url="#">
          Login
        </CabecalhoLink>
      </nav>
    </header>
  );
}
