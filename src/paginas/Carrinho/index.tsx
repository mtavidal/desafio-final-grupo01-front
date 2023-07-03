import { useAppDispatch, useAppSelector } from "hooks";
import styles from "./Carrinho.module.css";
import ProdutosNoCarrinho from "componentes/ProdutosNoCarrinho";
import { esvaziarCarrinho } from "store/modules/carrinho";
import Botao from "componentes/Botao";
import { useNavigate } from "react-router-dom";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { api } from "lib/axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import CarregandoPagina from "componentes/CarregandoPagina";
import carrinhoVazio from "./carrinhoVazio.svg";

export default function Carrinho() {
  const cartState = useAppSelector((store) => store.cartReducer);
  const usuario = useAppSelector((store) => store.authReducer.usuario);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const date = new Date();
  const [carregandoPedido, setCarregandoPedido] = useState(false);

  const produtos =
    cartState.cart.length > 0
      ? [...cartState.cart]
          .sort((a, b) => a.id - b.id)
          .map((produto) => (
            <ProdutosNoCarrinho key={produto.id} {...produto} />
          ))
      : [];

  const totalPedido =
    cartState.cart.length > 0
      ? cartState.cart
          .map((produto) => {
            return produto.quantidade * produto.price;
          })
          .reduce((total, price) => total + price)
      : 0;

  function irParaProdutos() {
    navigate("/produtos");
  }
  const notifyPedidoEnviado = () =>
    toast.success(`Pedido realizado com sucesso!`);

  function enviarPedido() {
    if (usuario) {
      const enviarPedido = async () => {
        setCarregandoPedido(true);
        try {
          const response = await api.post("/carts", {
            userId: usuario.id,
            date: date.toLocaleDateString(),
            products: cartState.cart,
            totalPedido: totalPedido,
          });

          navigate("/sucesso", {
            state: response.data,
          });
          notifyPedidoEnviado();
          dispatch(esvaziarCarrinho());
        } catch (error) {
          alert("Erro na requisição");
        } finally {
          setCarregandoPedido(false);
        }
      };
      enviarPedido();
    } else {
      navigate("/login?origin=carrinho");
    }
  }

  return (
    <>
      <CabecalhoListaProdutos titulo="Carrinho" />
      {carregandoPedido ? (
        <>
          <div className={styles.carrinho}></div>
          <CarregandoPagina visibilidade={carregandoPedido} />
        </>
      ) : (
        <>
          <div className={styles.carrinho}>
            {cartState.cart.length === 0 ? (
              <>
                <img
                  className={styles.carrinhovazio}
                  src={carrinhoVazio}
                  alt="carrinho vazio"
                />
                <h2 className={styles.carrinhovazioTexto}>
                  Carrinho vazio, adicione seus produtos aqui!{" "}
                </h2>
                <Botao primario={false} onClick={irParaProdutos}>
                  Continuar comprando
                </Botao>
              </>
            ) : (
              <>
                {produtos}
                <div className={styles.total}>
                  <h2>Total do pedido:</h2>
                  <h2>
                    {new Intl.NumberFormat("PT-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(totalPedido)}
                  </h2>
                </div>
                <div className={styles.botoes}>
                  <div className={styles.botoesOpcoes}>
                    <Botao
                      onClick={() => {
                        dispatch(esvaziarCarrinho());
                        window.scrollTo(0, 0);
                      }}
                    >
                      Esvaziar carrinho
                    </Botao>
                    <Botao onClick={irParaProdutos}>Continuar comprando</Botao>
                  </div>
                  <Botao primario={false} onClick={enviarPedido}>
                    Finalizar Pedido
                  </Botao>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
