import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditarCategoria.module.css";
import CampoInput from "componentes/CampoInput";
import { toast } from "react-hot-toast";
import Botao from "componentes/Botao";
import { useState } from "react";
import { api } from "lib/axios";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { Categoria } from "shared/interfaces/ICategoria";
import CarregandoPagina from "componentes/CarregandoPagina";

export default function EditarCategoria() {
  const location = useLocation();
  const dadosCategoria = location.state as Categoria;
  const [nome, setNome] = useState(`${dadosCategoria.nome}`);
  const [editando, setEditando] = useState(false);

  const navigate = useNavigate();
  const notifyEditarCategoria = (id: number) =>
    toast.success(`Categoria de id: ${id} atualizada com sucesso`);

  const editarCategoria = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const atualizarCategoria = async () => {
      setEditando(true);
      try {
        const response = await api.put(`/categoria/${dadosCategoria.id}`, {
          nome: nome,
        });
        const data = await response.data;
        notifyEditarCategoria(data.id);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setEditando(false);
      }
    };
    atualizarCategoria();
  };
  return (
    <>
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Usuários"
        subtitulo="Adicione, edite e delete os usuários"
      />
      {editando ? (
        <>
          <div className={styles.containerPainel}></div>
          <CarregandoPagina visibilidade={editando} />
        </>
      ) : (
        <div className={styles.containerPainel}>
          <div className={styles.containerFormCategorias}>
            <form onSubmit={editarCategoria}>
              <h3>Atualizar Categoria</h3>
              <CampoInput
                obrigatorio={true}
                label="Nome"
                placeholder="Nome da categoria"
                valor={nome}
                aoAlterado={(valor) => setNome(valor)}
              />
              <br />
              <div className={styles.botoes}>
                <Botao primario={false} disabled={editando}>
                  Atualizar Categoria
                </Botao>
                <Botao
                  primario={false}
                  onClick={() => navigate("/paineladmin/categorias")}
                >
                  Voltar
                </Botao>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
