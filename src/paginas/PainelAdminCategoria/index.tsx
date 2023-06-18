import styles from "./PainelAdminCategoria.module.css";
import CampoInput from "componentes/CampoInput";
import Botao from "componentes/Botao";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { useState } from "react";
import ListarCategorias from "componentes/ListarCategorias";
import { toast } from "react-hot-toast";
import { api } from "lib/axios";

export default function PainelAdminCategoria() {
  const [categoria, setCategoria] = useState("");
  const [atualizaLista, setAtualizaLista] = useState(0);

  const notifyAdicionarCategoria = () =>
    toast.success(`Categoria adicionada com sucesso`);

  const cadastrarCategoria = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const adicionarCategoria = async () => {
      try {
        const response = await api.post(`/categoria`, {
          nome: categoria,
        });
        const data = await response.data;
        setAtualizaLista(data.id);
        notifyAdicionarCategoria();
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      }
    };
    adicionarCategoria();
    setCategoria("");
  };

  return (
    <>
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
          </form>
          <ListarCategorias atualizaLista={atualizaLista} />
        </div>
      </div>
    </>
  );
}
