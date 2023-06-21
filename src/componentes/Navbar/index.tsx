import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import LinkEstilizado from "componentes/LinkEstilizado";
import logo from "./logo-good-eyewear.svg";
import IconeCarrinho from "@mui/icons-material/ShoppingCart";
import IconeBotao from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { logout } from "store/modules/usuario";
import menu from "./menu.svg";
import closeMenu from "./closeMenu.svg";

interface NavbarProps {
  temUsuario: boolean;
  ehAdmin?: boolean;
}

export default function Navbar({ ehAdmin, temUsuario }: NavbarProps) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const cartState = useAppSelector((state) => state.cartReducer);
  const quantidadeProduto = cartState.cart.length;

  const usuario = useAppSelector((state) => state.authReducer.usuario);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  const recolherMenu = () => {
    if (toggleMenu) {
      setToggleMenu(!toggleMenu);
    }
  };

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
      {screenWidth > 680 ? (
        <></>
      ) : (
        <nav className={styles.navBar}>
          <div className={styles.cabecalhoNavBar}>
            <LinkEstilizado
              recolherMenu={recolherMenu}
              style={styles.link}
              url="./"
            >
              <img src={logo} alt="Logo do Good WearEye" />
            </LinkEstilizado>
            <IconeBotao
              className={styles.iconeBotao}
              disabled={false}
              onClick={() => {
                navigate("/carrinho");
                recolherMenu();
              }}
            >
              <Badge color="error" badgeContent={quantidadeProduto}>
                <IconeCarrinho className={styles.shoppingCartIcon} />
              </Badge>
            </IconeBotao>
            {!toggleMenu ? (
              <img
                className={styles.menuIcon}
                src={menu}
                alt="icone menu"
                onClick={toggleNav}
              />
            ) : (
              <img
                className={styles.menuIcon}
                src={closeMenu}
                alt="icone menu"
                onClick={toggleNav}
              />
            )}
          </div>
          {toggleMenu && (
            <>
              <ul className={styles.list}>
                <li className={styles.items}>
                  {" "}
                  <LinkEstilizado
                    recolherMenu={recolherMenu}
                    style={styles.link}
                    url="./"
                  >
                    Home
                  </LinkEstilizado>
                </li>
                <li className={styles.items}>
                  <LinkEstilizado
                    recolherMenu={recolherMenu}
                    style={styles.link}
                    url="/produtos"
                  >
                    Produtos
                  </LinkEstilizado>
                </li>
                <li className={styles.itemsRestritoTitulo}>
                  {" "}
                  {usuario ? (
                    <>
                      {ehAdmin ? (
                        <h4 className={styles.tituloPainel}>
                          Painel do Administrador
                        </h4>
                      ) : (
                        <h4 className={styles.tituloPainel}>
                          Painel do Cliente
                        </h4>
                      )}
                      <div className={styles.logado}>
                        <p>Olá, {usuario.name.split(" ")[0]}</p>
                      </div>
                    </>
                  ) : (
                    <LinkEstilizado
                      recolherMenu={recolherMenu}
                      style={styles.link}
                      url="/login"
                    >
                      Login
                    </LinkEstilizado>
                  )}
                </li>
                {temUsuario ? (
                  ehAdmin ? (
                    <>
                      <li className={styles.itemsRestrito}>
                        <LinkEstilizado
                          recolherMenu={recolherMenu}
                          style={styles.link}
                          url="/paineladmin/pedidos"
                        >
                          Pedidos
                        </LinkEstilizado>
                      </li>
                      <li className={styles.itemsRestrito}>
                        <LinkEstilizado
                          recolherMenu={recolherMenu}
                          style={styles.link}
                          url="/paineladmin/produtos"
                        >
                          Produtos
                        </LinkEstilizado>
                      </li>
                      <li className={styles.itemsRestrito}>
                        <LinkEstilizado
                          recolherMenu={recolherMenu}
                          style={styles.link}
                          url="/paineladmin/usuarios"
                        >
                          Usuários
                        </LinkEstilizado>
                      </li>
                      <li className={styles.itemsRestrito}>
                        <LinkEstilizado
                          recolherMenu={recolherMenu}
                          style={styles.link}
                          url="/paineladmin/categorias"
                        >
                          Categorias
                        </LinkEstilizado>
                      </li>
                      <li className={styles.itemsRestrito}>
                        <div className={styles.logado}>
                          <button
                            onClick={() => {
                              dispatch(logout());
                              recolherMenu();
                            }}
                          >
                            sair
                          </button>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={styles.itemsRestrito}>
                        <LinkEstilizado
                          recolherMenu={recolherMenu}
                          style={styles.link}
                          url="/painelcliente/pedidos"
                        >
                          Pedidos
                        </LinkEstilizado>
                      </li>
                      <li className={styles.itemsRestrito}>
                        <LinkEstilizado
                          recolherMenu={recolherMenu}
                          style={styles.link}
                          url="/painelcliente/editar"
                        >
                          Editar Cadastro
                        </LinkEstilizado>
                      </li>
                      <li className={styles.itemsRestrito}>
                        <div className={styles.logado}>
                          <button
                            onClick={() => {
                              dispatch(logout());
                              recolherMenu();
                            }}
                          >
                            sair
                          </button>
                        </div>
                      </li>
                    </>
                  )
                ) : (
                  <></>
                )}
              </ul>
            </>
          )}
        </nav>
      )}
    </>
  );
}
