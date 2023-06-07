import { useAppDispatch } from "hooks";
import { Produto } from "shared/interfaces/IProdutos";
import { removerProduto } from "store/modules/carrinho";
import style from "./ProdutosNoCarrinho.module.css";
import Botao from "componentes/Botao";

export default function ProdutosNoCarrinho({
  id,
  title,
  price,
  image,
}: Produto) {
  const dispatch = useAppDispatch();
  const removerProdutoDoCarrinho = (id: number) => {
    dispatch(removerProduto(id));
  };

  return (
    <div className={style.produtosNoCarrinho}>
      <div className={style.itensProduto}>
        <img src={image} alt={title} />
        <div>
          <h1>{title}</h1>
          <h2>R$: {price}</h2>
        </div>
      </div>
      <Botao primario={false} onClick={() => removerProdutoDoCarrinho(id)}>
        Remover produto
      </Botao>
    </div>
  );
}
