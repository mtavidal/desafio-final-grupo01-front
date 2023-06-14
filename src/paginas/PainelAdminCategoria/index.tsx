import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";
import styles from "./PainelAdminCategoria.module.css";
import CampoInput from "componentes/CampoInput";
import Botao from "componentes/Botao";
// import { Toaster, toast } from "react-hot-toast";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { useState } from "react";

export default function PainelAdminCategoria() {
  const [categoria, setCategoria] = useState("");

  // const notifyAdicionarProduto = () =>
  // toast.success(`Categoria adicionada com sucesso`);

  const cadastrarCategoria = (evento: React.FormEvent<HTMLFormElement>) => {
    //   evento.preventDefault();
    //   const adicionarCategoria = async () => {
    // try {
    //   const response = await api.post(`/products`, {
    //     title: nome,
    //     price: preco,
    //     description: descricao,
    //     image: imagem,
    //     category: categoria,
    //   });
    //   const data = await response.data;
    //   setAtualizaLista(data.id);
    //   notifyAdicionarProduto();
    // } catch (error) {
    //   alert("Erro na requisição");
    //   console.log(error);
  };
  //   };
  //   adicionarCategoria();
  //   setCategoria("");
  // };

  return (
    <>
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
        titulo="Gerenciamento de Categorias"
        subtitulo="Adicione, edite e delete as categorias"
      />
      <div className={styles.containerPainelCategoria}>
        <div className={styles.containerFormCategoria}>
          <form onSubmit={cadastrarCategoria}>
            <h3>Adicionar Categoria</h3>
            <CampoInput
              obrigatorio={true}
              label="Categoria"
              placeholder="Nome da categoria"
              valor={categoria}
              aoAlterado={(valor) => setCategoria(valor)}
            />
            <br />
            <Botao primario={false}>Adicionar Categoria</Botao>
            {/* <Toaster toastOptions={{ duration: 2000 }} /> */}
          </form>
          <div>lista de categorias</div>
        </div>
      </div>
    </>
  );
}
