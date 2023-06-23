import Botao from "componentes/Botao";
import styles from "./FiltrarCategorias.module.css";
import { useEffect, useState } from "react";
import { Categoria } from "shared/interfaces/ICategoria";
import { api } from "lib/axios";

interface FiltrarCategoriasProps {
  handleMudaCategoria: (id: number | undefined) => void;
}

export default function FiltrarCategorias({
  handleMudaCategoria,
}: FiltrarCategoriasProps) {
  const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<number | undefined>(-1);
  const [listandoCategoria, setListandoCategoria] = useState(true);

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

    handleMudaCategoria(categoria);
  };

  return (
    <>
      <div className={styles.containerCategorias}>
        <form onSubmit={filtrarPorCategoria}>
          <h3>Categorias</h3>
          <select
            className={styles.ajusteSelect}
            name="selectCategoria"
            id="selectCategoria"
            required
            value={categoria}
            onChange={(evento: React.ChangeEvent<HTMLSelectElement>) => {
              const value = Number(evento.target.value);
              setCategoria(value);
            }}
          >
            {listandoCategoria ? (
              <option value="">Carregando Categorias</option>
            ) : (
              <>
                <option>Filtre por categoria</option>
                <option value="-1">Todos os produtos</option>
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
    </>
  );
}
