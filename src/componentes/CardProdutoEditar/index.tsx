import { useNavigate } from "react-router-dom";
import styles from "./CardProdutoEditar.module.css";
import Botao from "componentes/Botao";
import { api } from "lib/axios";
import toast, { Toaster } from "react-hot-toast";

interface ProdutoProps {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
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
  function detalhesProduto(produto: ProdutoProps) {
    navigate("/detalhes", {
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
      <h2>R$ {price}</h2>
      <div className={styles.botoesEditar}>
        <Botao
          onClick={() =>
            detalhesProduto({
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
        <Toaster toastOptions={{ duration: 1200 }} />
      </div>
    </div>
  );
}
