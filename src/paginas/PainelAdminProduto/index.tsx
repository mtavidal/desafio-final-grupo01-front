import styles from "./PainelAdminProduto.module.css";
import { ListarProdutos } from "componentes/ListarProdutos";
import Botao from "componentes/Botao";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import CampoInput from "componentes/CampoInput";
import { useEffect, useState } from "react";
import { api } from "lib/axios";
import toast from "react-hot-toast";
import { Categoria } from "shared/interfaces/ICategoria";
import CarregandoPagina from "componentes/CarregandoPagina";

export default function PainelAdminProduto() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [adicionandoProduto, setAdicionandoProduto] = useState(false);
  const [listandoCategoria, setListandoCategoria] = useState(true);

  const notifyAdicionarProduto = () =>
    toast.success(`Produto adicionado com sucesso`);

  const cadastrarProduto = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const adicionarProduto = async () => {
      setAdicionandoProduto(true);
      try {
        const response = await api.post(`/products`, {
          title: nome,
          price: preco,
          description: descricao,
          image: imagem,
          category: categoria,
        });
        const data = await response.data;
        setAtualizaLista(data.id);
        notifyAdicionarProduto();
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setAdicionandoProduto(false);
      }
    };
    adicionarProduto();
    setNome("");
    setDescricao("");
    setImagem("");
    setCategoria("");
    setPreco("");
    setImagem("");
  };
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
  return (
    <>
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Produtos"
        subtitulo="Adicione, edite e delete os produtos"
      />
      {adicionandoProduto ? (
        <>
          <div className={styles.containerPainel}></div>
          <CarregandoPagina visibilidade={adicionandoProduto} />
        </>
      ) : (
        <div className={styles.containerPainel}>
          <div className={styles.containerFormProdutos}>
            <form onSubmit={cadastrarProduto}>
              <h3>Adicionar Produto</h3>
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
              <label className={styles.ajusteLabel}>Categoria</label>
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
                    <option value="">Selecione a categoria</option>
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
              <Botao primario={false}>Adicionar Produto</Botao>
            </form>
            <ListarProdutos
              limitPaginas={10}
              ehPaginaAdmin={true}
              atualizaLista={atualizaLista}
            />
          </div>
        </div>
      )}
    </>
  );
}
