import { useEffect, useState } from "react";
import styles from "./ListarCategorias.module.css";
import { api } from "lib/axios";
import Botao from "componentes/Botao";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Categoria } from "shared/interfaces/ICategoria";
import CarregandoPagina from "componentes/CarregandoPagina";

interface ListarCategoriasProps {
  atualizaLista?: number;
}

export default function ListarCategorias({
  atualizaLista = 0,
}: ListarCategoriasProps) {
  const [carregandoCategoria, setCarregandoCategoria] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaDeletada, setCategoriaDeletada] = useState(0);
  useEffect(() => {
    const getCategorias = async () => {
      try {
        const response = await api.get("/categorias", {
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

  const notifyDeleteCategoria = (id: any) =>
    toast.success(`Categoria com id: ${id} deletada com sucesso!`);

  const deletarCategoria = async (id: number) => {
    const confirmaDeletar = window.confirm(
      `Tem certeza que deseja deletar a categoria de id: ${id}?`
    );
    if (confirmaDeletar) {
      setCarregandoCategoria(true);
      try {
        await api.delete(`/categorias/${id}`);
        setCategoriaDeletada(id);
        notifyDeleteCategoria(id);
      } catch (error) {
        console.log(error);
      } finally {
        setCarregandoCategoria(false);
      }
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
              <div
                key={categoria.idcategoria}
                className={styles.cardCategorias}
              >
                <div className={styles.cardCategoriasTextos}>
                  <h4 className={styles.cardCategoriasTexto}>
                    {categoria.nome}
                  </h4>
                  <h4 className={styles.cardCategoriasTexto}>
                    {categoria.idcategoria}
                  </h4>
                </div>
                <div className={styles.cardCategoriasBotoes}>
                  <Botao
                    onClick={() =>
                      editarCategoria({
                        idcategoria: categoria.idcategoria,
                        nome: categoria.nome,
                      })
                    }
                  >
                    Editar
                  </Botao>
                  <Botao
                    primario={false}
                    onClick={() => deletarCategoria(categoria.idcategoria)}
                  >
                    Deletar
                  </Botao>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
