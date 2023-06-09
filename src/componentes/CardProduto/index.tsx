import { useNavigate } from "react-router-dom";
import styles from "./CardProduto.module.css";
import { Categoria } from "shared/interfaces/ICategoria";

interface ProdutoProps {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Categoria;
}

export function CardProduto({
  id,
  title,
  image,
  price,
  description,
  category,
}: ProdutoProps) {
  const navigate = useNavigate();

  function detalhesProduto(produto: ProdutoProps) {
    navigate("/detalhes", {
      state: produto,
    });
  }

  return (
    <div
      onClick={() =>
        detalhesProduto({ id, title, image, price, description, category })
      }
      className={styles.cardProduto}
    >
      <img src={image} alt={`produto ${title}`} />
      <h1>{title}</h1>
      <h2>
        {new Intl.NumberFormat("PT-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price)}
      </h2>
    </div>
  );
}
