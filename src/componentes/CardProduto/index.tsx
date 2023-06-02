import styles from "./CardProduto.module.css";

interface ProdutoProps {
  id: number;
  // nome: string
  // foto: string
  // preco: number
  // descricao: string
  // categoria: string
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export function CardProduto({
  id,
  title,
  image,
  price,
  description,
  category,
}: ProdutoProps) {
  function detalhesProduto(produto: ProdutoProps) {
    console.log("clicou", id);
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
      <h2>R${price}</h2>
    </div>
  );
}
