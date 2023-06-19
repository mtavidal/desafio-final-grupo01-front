import { useNavigate } from "react-router-dom";
import styles from "./CardProdutoEditar.module.css";
import Botao from "componentes/Botao";
import { api } from "lib/axios";
import toast from "react-hot-toast";
import { Categoria } from "shared/interfaces/ICategoria";

interface ProdutoProps {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Categoria;
  atualizaLista?: (id: number) => void;
}

export function CardProdutoEditar({
  id,
  title,
  image,
  price,
  description,
  category,
  atualizaLista,
}: ProdutoProps) {
  const navigate = useNavigate();
  function editarProduto(produto: ProdutoProps) {
    navigate("/paineladmin/produtos/editar", {
      state: produto,
    });
  }
  const notifyDelete = (id: any) =>
    toast.success(`Produto com id: ${id} deletado com sucesso!`);

  const deletarProduto = async (id: number) => {
    try {
      const response = await api.delete(`/products/${id}`);
      atualizaLista?.(id);
      notifyDelete(response.data);
    } catch (error) {
      alert("Erro na requisição");
    }
  };

  return (
    <div className={styles.cardProduto}>
      <img src={image} alt={`produto ${title}`} />
      <h1>{title}</h1>
      <h2>
        {new Intl.NumberFormat("PT-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price)}
      </h2>
      <div className={styles.botoesEditar}>
        <Botao
          onClick={() =>
            editarProduto({
              id,
              title,
              image,
              price,
              description,
              category,
            })
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
