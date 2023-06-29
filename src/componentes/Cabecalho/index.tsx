import LinkEstilizado from "componentes/LinkEstilizado";
import styles from "./Cabecalho.module.css";
import logo from "./logo-good-eyewear.svg";
import IconeCarrinho from "@mui/icons-material/ShoppingCart";
import IconeBotao from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { logout } from "store/modules/usuario";
import { useState, useEffect } from "react";

export default function Cabecalho() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const cartState = useAppSelector((state) => state.cartReducer);
  const quantidadeProduto = cartState.cart.length;

  const usuario = useAppSelector((state) => state.authReducer.usuario);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <>
      {screenWidth > 680 && (
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
            {usuario ? (
              <div className={styles.logado}>
                <h5>Olá, {usuario.name.split(" ")[0]}</h5>
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  sair
                </button>
              </div>
            ) : (
              <LinkEstilizado style={styles.link} url="/login">
                Login
              </LinkEstilizado>
            )}
          </nav>
        </header>
      )}
    </>
  );
}
