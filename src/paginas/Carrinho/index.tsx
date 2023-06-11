import { useAppDispatch, useAppSelector } from "hooks";
import styles from "./Carrinho.module.css";
import ProdutosNoCarrinho from "componentes/ProdutosNoCarrinho";
import { esvaziarCarrinho } from "store/modules/carrinho";
import Botao from "componentes/Botao";
import { useNavigate } from "react-router-dom";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";

export default function Carrinho() {
  const cartState = useAppSelector((store) => store.cartReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  return (
    <>
      <CabecalhoListaProdutos titulo="Carrinho" />
      <div className={styles.carrinho}>
        {cartState.cart.length === 0 ? (
          <p>Não há produtos no carrinho.</p>
        ) : (
          <>
            {produtos}
            <div className={styles.total}>
              <h2>Total da compra:</h2>
              <h2>R$ {totalPedido.toFixed(2)}</h2>
            </div>
            <div className={styles.botoes}>
              <div>
                <Botao onClick={() => dispatch(esvaziarCarrinho())}>
                  Esvaziar carrinho
                </Botao>
                <Botao onClick={irParaProdutos}>Continuar comprando</Botao>
              </div>
              <Botao primario={false}>Finalizar Pedido</Botao>
            </div>
          </>
        )}
      </div>
    </>
  );
}
