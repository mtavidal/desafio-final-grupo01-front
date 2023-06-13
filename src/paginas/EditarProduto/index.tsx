import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditarProduto.module.css";
import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";
import CampoInput from "componentes/CampoInput";
import { Toaster, toast } from "react-hot-toast";
import Botao from "componentes/Botao";
import { useState } from "react";
import { api } from "lib/axios";

export default function EditarProduto() {
  const location = useLocation();
  const dadosProduto = location.state as ProdutoNoCarrinho;
  const [nome, setNome] = useState(`${dadosProduto.title}`);
  const [descricao, setDescricao] = useState(`${dadosProduto.description}`);
  const [categoria, setCategoria] = useState(`${dadosProduto.category}`);
  const [preco, setPreco] = useState(`${dadosProduto.price}`);
  const [imagem, setImagem] = useState(`${dadosProduto.image}`);

  const navigate = useNavigate();
  const notifyEditarProduto = () =>
    toast.success(`Produto atualizado com sucesso`);

  const editarProduto = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const atualizarProduto = async () => {
      try {
        const response = await api.put(`/products/${dadosProduto.id}`, {
          id: dadosProduto.id,
          title: nome,
          price: preco,
          description: descricao,
          image: imagem,
          category: categoria,
        });
        const data = await response.data;
        console.log(data);
        notifyEditarProduto();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      }
    };
    atualizarProduto();
  };
  return (
    <div>
      <div className={styles.containerPainel}>
        <div className={styles.containerFormProdutos}>
          <form onSubmit={editarProduto}>
            <h3>Atualizar Produto</h3>
            <CampoInput
              obrigatorio={true}
              label="Nome"
              placeholder="Nome do produto"
              valor={nome}
              aoAlterado={(valor) => setNome(valor)}
            />
            <CampoInput
              obrigatorio={true}
              label="Descrição"
              placeholder="Breve descrição do produto"
              valor={descricao}
              aoAlterado={(valor) => setDescricao(valor)}
              tipo="textarea"
            />
            <CampoInput
              obrigatorio={true}
              label="Categoria"
              placeholder="Categoria do produto"
              valor={categoria}
              aoAlterado={(valor) => setCategoria(valor)}
            />
            <CampoInput
              obrigatorio={true}
              label="Preço"
              placeholder="Valor do produto"
              valor={preco}
              aoAlterado={(valor) => setPreco(valor.replace(/,/g, "."))}
              tipo="number"
            />
            <CampoInput
              obrigatorio={true}
              label="URL da Imagem"
              placeholder="Endereço da imagem do produto"
              valor={imagem}
              aoAlterado={(valor) => setImagem(valor)}
            />
            <br />
            <Botao primario={false}>Atualizar Produto</Botao>
            <Toaster toastOptions={{ duration: 1000 }} />
          </form>
        </div>
      </div>
    </div>
  );
}
