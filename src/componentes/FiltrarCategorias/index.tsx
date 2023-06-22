import Botao from "componentes/Botao";
import styles from "./FiltrarCategorias.module.css";
import { useEffect, useState } from "react";
import { Categoria } from "shared/interfaces/ICategoria";
import { api } from "lib/axios";
import CarregandoPagina from "componentes/CarregandoPagina";

export default function FiltrarCategorias() {
  const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState("");
  const [listandoCategoria, setListandoCategoria] = useState(true);
  const [filtrandoCategoria, setFiltrandoCategoria] = useState(false);

  useEffect(() => {
    const listarCategorias = async () => {
      try {
        const response = await api.get(`/categoria`);
        const data = await response.data;
        setListaCategorias(data);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setListandoCategoria(false);
      }
    };
    listarCategorias();
  }, []);

  const filtrarPorCategoria = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const getProdutosCategoria = async () => {
      setFiltrandoCategoria(true);
      try {
        const response = await api.get(`/products`, {
          params: {
            categoria: categoria,
          },
        });
        const data = await response.data;
        console.log(data.produtos);
        // setAtualizaLista(data.id);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setFiltrandoCategoria(false);
      }
    };
    getProdutosCategoria();
    setCategoria("");
  };

  return (
    <>
      {filtrandoCategoria ? (
        <>
          <CarregandoPagina visibilidade={filtrandoCategoria} />
        </>
      ) : (
        <div className={styles.containerCategorias}>
          <form onSubmit={filtrarPorCategoria}>
            <h3>Categorias</h3>
            <select
              className={styles.ajusteSelect}
              name="selectCategoria"
              id="selectCategoria"
              required
              value={categoria}
              onChange={(evento: React.ChangeEvent<HTMLSelectElement>) =>
                setCategoria(evento.target.value)
              }
            >
              {listandoCategoria ? (
                <option value="">Carregando Categorias</option>
              ) : (
                <>
                  <option value="">Filtre por categoria</option>
                  {listaCategorias.map((categoria) => {
                    return (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
            <Botao primario={false}>Filtrar</Botao>
          </form>
        </div>
      )}
    </>
  );
}
