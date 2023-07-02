import { useEffect, useState } from "react";
import styles from "./ListarCategorias.module.css";
import { api } from "lib/axios";
import Botao from "componentes/Botao";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Categoria } from "shared/interfaces/ICategoria";
import CarregandoPagina from "componentes/CarregandoPagina";
import ModalComp from "componentes/ModalComp";
import { AxiosError } from "axios";

interface ListarCategoriasProps {
  atualizaLista?: number;
}

export default function ListarCategorias({
  atualizaLista = 0,
}: ListarCategoriasProps) {
  const [carregandoCategoria, setCarregandoCategoria] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaDeletada, setCategoriaDeletada] = useState(0);

  const [abrirModal, setAbrirModal] = useState(false);
  const [idDelete, setIdDelete] = useState<number | null>(null);

  const [abrirModalErro, setAbrirModalErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const response = await api.get("/categoria", {
          params: {
            sort: "desc",
          },
        });
        setCategorias(response.data);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setCarregandoCategoria(false);
      }
    };
    getCategorias();
  }, [atualizaLista, categoriaDeletada]);

  useEffect(() => {
    if (idDelete) {
      setAbrirModal(true);
    }
  }, [idDelete]);

  const notifyDeleteCategoria = (id: any) =>
    toast.success(`Categoria com id: ${id} deletada com sucesso!`);

  const deletarCategoria = async (id: number | null) => {
    if (!id) {
      return;
    }
    setCarregandoCategoria(true);
    try {
      const response = await api.delete(`/categoria/${id}`);
      setCategoriaDeletada(id);
      notifyDeleteCategoria(response.data);
    } catch (error) {
      const err = error as AxiosError<any | string>;
      if (err.response?.status === 409) {
        setAbrirModalErro(true);
        setMensagemErro(err.response.data.mensagem);
      }
      console.log(error);
    } finally {
      setCarregandoCategoria(false);
      setAbrirModal(false);
      setIdDelete(null);
    }
  };

  const navigate = useNavigate();
  function editarCategoria(categoria: Categoria) {
    navigate("/paineladmin/categorias/editar", {
      state: categoria,
    });
  }

  return (
    <div className={styles.containerCategorias}>
      {carregandoCategoria ? (
        <CarregandoPagina visibilidade={carregandoCategoria} />
      ) : (
        <div className={styles.listarCategorias}>
          <h3 className={styles.listarCategoriasCabecalhoMobile}>
            Lista de Categorias
          </h3>
          <div className={styles.cardCategoriasCabecalho}>
            <div className={styles.cardCategoriasTextos}>
              <h3 className={styles.cardCategoriasTexto}>Nome categoria</h3>
              <h3 className={styles.cardCategoriasTexto}>ID categoria</h3>
            </div>
            <div className={styles.cardCategoriasBotoes}>
              <h3>Ações</h3>
            </div>
          </div>
          {categorias.map((categoria) => {
            return (
              <div key={categoria.id} className={styles.cardCategorias}>
                <div className={styles.cardCategoriasTextos}>
                  <h4 className={styles.cardCategoriasTexto}>
                    {categoria.nome}
                  </h4>
                  <h4 className={styles.cardCategoriasTexto}>{categoria.id}</h4>
                </div>
                <div className={styles.cardCategoriasBotoes}>
                  <Botao
                    onClick={() =>
                      editarCategoria({
                        id: categoria.id,
                        nome: categoria.nome,
                      })
                    }
                  >
                    Editar
                  </Botao>
                  <Botao
                    primario={false}
                    onClick={() => setIdDelete(categoria.id)}
                  >
                    Deletar
                  </Botao>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ModalComp
        contentLabel="Modal confirma deletar"
        mostrarModal={abrirModal}
        handleConfirmarModal={() => deletarCategoria(idDelete)}
        handleFecharModal={() => {
          setAbrirModal(false);
          setTimeout(() => setIdDelete(null), 500);
        }}
      >
        {`Deseja realmente deletar a categoria de id: ${idDelete}?`}
      </ModalComp>
      <ModalComp
        contentLabel="Modal erro categoria com produto cadastrado"
        mostrarModal={abrirModalErro}
        handleFecharModal={() => setAbrirModalErro(false)}
      >
        {mensagemErro}
      </ModalComp>
    </div>
  );
}
