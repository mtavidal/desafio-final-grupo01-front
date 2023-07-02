import styles from "./PainelAdminCategoria.module.css";
import CampoInput from "componentes/CampoInput";
import Botao from "componentes/Botao";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { useState } from "react";
import ListarCategorias from "componentes/ListarCategorias";
import { toast } from "react-hot-toast";
import { api } from "lib/axios";
import CarregandoPagina from "componentes/CarregandoPagina";
import ModalComp from "componentes/ModalComp";
import { AxiosError } from "axios";

export default function PainelAdminCategoria() {
  const [categoria, setCategoria] = useState("");
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [adicionandoCategorias, setAdicionandoCategorias] = useState(false);

  const [abrirModal, setAbrirModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const notifyAdicionarCategoria = () =>
    toast.success(`Categoria adicionada com sucesso`);

  const cadastrarCategoria = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const adicionarCategoria = async () => {
      setAdicionandoCategorias(true);
      try {
        const response = await api.post(`/categoria`, {
          nome: categoria,
        });
        const data = await response.data;
        setAtualizaLista(data.id);
        notifyAdicionarCategoria();
      } catch (error) {
        const err = error as AxiosError<any | string>;
        if (err.response?.status === 409) {
          setAbrirModal(true);
          setMensagemErro(err.response.data.mensagem);
        }
        console.log(error);
      } finally {
        setAdicionandoCategorias(false);
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
      {adicionandoCategorias ? (
        <>
          <div className={styles.containerPainelCategoria}></div>
          <CarregandoPagina visibilidade={adicionandoCategorias} />
        </>
      ) : (
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
      )}
      <ModalComp
        contentLabel="Modal erro categoria já existe"
        mostrarModal={abrirModal}
        handleFecharModal={() => setAbrirModal(false)}
      >
        {mensagemErro}
      </ModalComp>
    </>
  );
}
