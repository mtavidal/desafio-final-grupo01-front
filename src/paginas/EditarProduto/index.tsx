import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditarProduto.module.css";
import { ProdutoNoCarrinho } from "shared/interfaces/IProdutos";
import CampoInput from "componentes/CampoInput";
import { Toaster, toast } from "react-hot-toast";
import Botao from "componentes/Botao";
import { useState } from "react";
import { api } from "lib/axios";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";

export default function EditarProduto() {
  const location = useLocation();
  const dadosProduto = location.state as ProdutoNoCarrinho;
  const [nome, setNome] = useState(`${dadosProduto.title}`);
  const [descricao, setDescricao] = useState(`${dadosProduto.description}`);
  const [categoria, setCategoria] = useState(`${dadosProduto.category}`);
  const [preco, setPreco] = useState(`${dadosProduto.price}`);
  const [imagem, setImagem] = useState(`${dadosProduto.image}`);
  const [editando, setEditando] = useState(false);

  const navigate = useNavigate();
  const notifyEditarProduto = () =>
    toast.success(`Produto atualizado com sucesso`);

  const editarProduto = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const atualizarProduto = async () => {
      try {
        setEditando(true);
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
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setEditando(false);
      }
    };
    atualizarProduto();
  };
  return (
    <div>
      <CabecalhoAreaRestrita
        tituloArea="Painel do Administrador"
        link1="/paineladmin/pedidos"
        titulo1="Pedidos"
        link2="/paineladmin/produtos"
        titulo2="Produtos"
        link3="/paineladmin/usuarios"
        titulo3="Usuários"
        link4="/paineladmin/categorias"
        titulo4="Categorias"
      />
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Produtos"
        subtitulo="Adicione, edite e delete os produtos"
      />
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
            <div className={styles.botoes}>
              <Botao primario={false} disabled={editando}>
                Atualizar Produto
              </Botao>
              <Botao
                primario={false}
                onClick={() => navigate("/paineladmin/produtos")}
              >
                Voltar
              </Botao>
            </div>
            <Toaster toastOptions={{ duration: 3000 }} />
          </form>
        </div>
      </div>
    </div>
  );
}
