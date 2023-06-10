import { useAppDispatch } from "hooks";
import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";
import { removerProduto, addProduto } from "store/modules/carrinho";
import styles from "./ProdutosNoCarrinho.module.css";
import Botao from "componentes/Botao";
import ContadorProduto from "componentes/ContadorProduto";
import { useState } from "react";

export default function ProdutosNoCarrinho({
  id,
  title,
  price,
  image,
  category,
  description,
  quantidade,
}: ProdutoNoCarrinho) {
  const dispatch = useAppDispatch();
  const removerProdutoDoCarrinho = (id: number) => {
    dispatch(removerProduto(id));
  };

  const adicionarProdutoCarrinho = (produto: ProdutoNoCarrinho) => {
    dispatch(addProduto(produto));
  };

  const [mudaQuantidade, setMudaQuantidade] = useState(1);
  console.log(id, quantidade);
  function handleQtd(valor: number) {
    quantidade = valor;
    setMudaQuantidade(quantidade);
    adicionarProdutoCarrinho({
      id,
      title,
      price,
      image,
      category,
      description,
      quantidade,
    });
  }

  return (
    <div className={styles.produtosNoCarrinho}>
      <div className={styles.itensProduto}>
        <img src={image} alt={title} />
        <div>
          <h1>
            {title} | R$: {price}
          </h1>
          <h2>R$: {mudaQuantidade * price}</h2>
        </div>
      </div>
      <div className={styles.contatorEbotao}>
        <ContadorProduto
          qtdInicial={quantidade}
          handleQtd={(valor) => handleQtd(valor)}
        />
        <Botao primario={false} onClick={() => removerProdutoDoCarrinho(id)}>
          Remover produto
        </Botao>
      </div>
    </div>
  );
}
