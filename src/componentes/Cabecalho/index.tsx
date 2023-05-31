import LinkEstilizado from "componentes/LinkEstilizado";
import styles from "./Cabecalho.module.css";
import logo from "./logo-good-eyewear.svg";
import IconeCarrinho from "@mui/icons-material/ShoppingCart";
import IconeBotao from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

export default function Cabecalho() {
  const navigate = useNavigate();
  const quantidadeProduto = 2;
  return (
    <header className={styles.cabecalho}>
      <nav>
        <LinkEstilizado style={styles.link} url="./">
          <img src={logo} alt="Logo do Good WearEye" />
        </LinkEstilizado>
        <div>
          <LinkEstilizado style={styles.link} url="./">
            Home
          </LinkEstilizado>
          <LinkEstilizado style={styles.link} url="/produtos">
            Produtos
          </LinkEstilizado>
        </div>
      </nav>
      <nav className={styles.carrinho}>
        <IconeBotao
          className={styles.iconeBotao}
          disabled={false}
          onClick={() => navigate("/carrinho")}
        >
          <Badge color="error" badgeContent={quantidadeProduto}>
            <IconeCarrinho className={styles.shoppingCartIcon} />
          </Badge>
        </IconeBotao>
        <LinkEstilizado style={styles.link} url="/login">
          Login
        </LinkEstilizado>
      </nav>
    </header>
  );
}
