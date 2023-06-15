import { useAppDispatch } from "hooks";
import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";
import { removerProduto, addProduto } from "store/modules/carrinho";
import styles from "./ProdutosNoCarrinho.module.css";
import Botao from "componentes/Botao";
import ContadorProduto from "componentes/ContadorProduto";
import { useNavigate } from "react-router-dom";

export default function ProdutosNoCarrinho({
  id,
  title,
  price,
  image,
  category,
  description,
  quantidade = 1,
}: ProdutoNoCarrinho) {
  const dispatch = useAppDispatch();
  const removerProdutoDoCarrinho = (id: number) => {
    dispatch(removerProduto(id));
  };

  const adicionarProdutoCarrinho = (produto: ProdutoNoCarrinho) => {
    dispatch(addProduto(produto));
  };

  function handleQtd(valor: number) {
    quantidade = valor;
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
  const navigate = useNavigate();
  function irDetalhesProdutos(produto: ProdutoNoCarrinho) {
    navigate("/detalhes", {
      state: produto,
    });
  }

  return (
    <div className={styles.produtosNoCarrinho}>
      <div className={styles.itensProduto}>
        <img
          src={image}
          alt={title}
          onClick={() =>
            irDetalhesProdutos({
              id,
              title,
              price,
              image,
              category,
              description,
              quantidade,
            })
          }
        />
        <div>
          <h1>{title}</h1>
          <h3>
            Preço unitário:{" "}
            {new Intl.NumberFormat("PT-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price)}
          </h3>
          <h2>
            {new Intl.NumberFormat("PT-BR", {
              style: "currency",
              currency: "BRL",
            }).format(quantidade * price)}
          </h2>
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
