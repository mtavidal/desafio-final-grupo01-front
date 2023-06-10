import { useAppDispatch, useAppSelector } from "hooks";
import styles from "./Carrinho.module.css";
import ProdutosNoCarrinho from "componentes/ProdutosNoCarrinho";
import { esvaziarCarrinho } from "store/modules/carrinho";
import Botao from "componentes/Botao";
import { useNavigate } from "react-router-dom";

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

  function irParaProdutos() {
    navigate("/produtos");
  }
  return (
    <div className={styles.carrinho}>
      <h1>Carrinho</h1>
      {cartState.cart.length === 0 ? (
        <p>Não há produtos no carrinho.</p>
      ) : (
        <>
          {produtos}
          <div className={styles.botoes}>
            <Botao onClick={() => dispatch(esvaziarCarrinho())}>
              Esvaziar carrinho
            </Botao>
            <Botao onClick={irParaProdutos}>Continuar comprando</Botao>
            <Botao primario={false}>Finalizar Pedido</Botao>
          </div>
        </>
      )}
    </div>
  );
}
