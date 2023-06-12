import { useNavigate } from "react-router-dom";
import styles from "./CardProdutoEditar.module.css";
import Botao from "componentes/Botao";
import { api } from "lib/axios";

interface ProdutoProps {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export function CardProdutoEditar({
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

  const deletarProduto = async (id: number) => {
    console.log("passou");
    try {
      const response = await api.delete(`/products/${id}`);
      console.log(response.data);
    } catch (error) {
      alert("Erro na requisição");
    }
  };

  return (
    <div className={styles.cardProduto}>
      <img src={image} alt={`produto ${title}`} />
      <h1>{title}</h1>
      <h2>R$ {price}</h2>
      <div className={styles.botoesEditar}>
        <Botao
          onClick={() =>
            detalhesProduto({ id, title, image, price, description, category })
          }
        >
          Editar
        </Botao>
        <Botao primario={false} onClick={() => deletarProduto(id)}>
          Deletar
        </Botao>
      </div>
    </div>
  );
}
