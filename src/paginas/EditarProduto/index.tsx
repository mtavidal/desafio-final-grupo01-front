import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditarProduto.module.css";
import { Produto, ProdutoResponse } from "shared/interfaces/IProdutos";
import CampoInput from "componentes/CampoInput";
import { toast } from "react-hot-toast";
import Botao from "componentes/Botao";
import { useEffect, useState } from "react";
import { api } from "lib/axios";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { Categoria } from "shared/interfaces/ICategoria";
import CarregandoPagina from "componentes/CarregandoPagina";

export default function EditarProduto() {
  const location = useLocation();
  const dadosProduto = location.state as ProdutoResponse;
  const [produto, setProduto] = useState<Produto>();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<string | undefined>(
    `${produto?.categorias ? produto?.categorias.idcategoria : null}`
  );
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
  const [editando, setEditando] = useState(false);
  const [carregandoProduto, setCarregandoProduto] = useState(true);

  const navigate = useNavigate();
  const notifyEditarProduto = (id: number) =>
    toast.success(`Produto de id:${id} atualizado com sucesso`);

  const editarProduto = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const atualizarProduto = async () => {
      setEditando(true);
      try {
        const response = await api.put(`/produtos/${dadosProduto.id}`, {
          id: dadosProduto.id,
          title: nome,
          price: preco,
          description: descricao,
          image: imagem,
          category: categoria,
        });
        const data = await response.data;
        notifyEditarProduto(data.id);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setEditando(false);
      }
    };
    atualizarProduto();
  };
  useEffect(() => {
    const getProdutoId = async () => {
      try {
        const response = await api.get(`/produtos/${dadosProduto.id}`);
        const data = await response.data;
        setProduto(data);
        setNome(data.nome);
        setPreco(data.preco);
        setDescricao(data.descricao);
        setImagem(data.foto);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setCarregandoProduto(false);
      }
    };
    getProdutoId();

    const listarCategorias = async () => {
      try {
        const response = await api.get(`/categorias`);
        const data = await response.data;
        setListaCategorias(data);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      }
    };

    listarCategorias();
  }, [dadosProduto.id]);
  return (
    <div>
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Produtos"
        subtitulo="Adicione, edite e delete os produtos"
      />
      {editando || carregandoProduto ? (
        <>
          <div className={styles.containerPainel}></div>
          <CarregandoPagina visibilidade={editando || carregandoProduto} />
        </>
      ) : (
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
                <option value={produto?.categorias?.idcategoria}>
                  {produto?.categorias?.nome}
                </option>
                {listaCategorias.map((categoria) => {
                  return (
                    <option
                      key={categoria.idcategoria}
                      value={categoria.idcategoria}
                    >
                      {categoria.nome}
                    </option>
                  );
                })}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
