import styles from "./CardProdutoPedido.module.css";

interface CardProdutoPedidoProps {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  quantidade: number;
}

export default function CardProdutoPedido({
  id,
  title,
  image,
  price,
  description,
  category,
  quantidade,
}: CardProdutoPedidoProps) {
  return (
    <div className={styles.cardProdutoPedido}>
      <h3>Qnt: {quantidade}</h3>
      <div>
        <img src={image} alt={`produto ${title}`} />
        <h1>{title}</h1>
        <h2>R$ {price}</h2>
      </div>
    </div>
  );
}
