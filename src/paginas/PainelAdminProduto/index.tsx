import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";
import styles from "./PainelAdminProduto.module.css";
import { ListarProdutos } from "componentes/ListarProdutos";
import Botao from "componentes/Botao";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";

export default function PainelAdminProduto() {
  return (
    <>
      <CabecalhoAreaRestrita
        tituloArea="Painel do Administrador"
        link1="/paineladmin/pedidos"
        titulo1="Pedidos"
        link2="/paineladmin/produtos"
        titulo2="Produtos"
        link3="/paineladmin/clientes"
        titulo3="Clientes"
        link4="/paineladmin/categorias"
        titulo4="Categorias"
      />
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Produtos"
        subtitulo="Adicione, edite e delete os produtos"
      />
      <div className={styles.containerPainel}>
        <div className={styles.containerFormProdutos}>
          <form action="">
            <h3>Adicionar Produto</h3>
            <label htmlFor="nomeProduto">Nome: </label>
            <input id="nomeProduto" type="text" />
            <label htmlFor="descricaoProduto">Descrição: </label>
            <input id="descricaoProduto" type="text" />
            <label htmlFor="categoriaProduto">Categoria: </label>
            <input id="categoriaProduto" type="text" />
            <label htmlFor="precoProduto">Preço: </label>
            <input id="precoProduto" type="number" step="0.01" />
            <label htmlFor="imagemProduto">URL da Imagem: </label>
            <input id="imagemProduto" type="text" />
            <br />
            <Botao primario={false}>Adicionar</Botao>
          </form>
          <ListarProdutos limitPaginas={10} ehPaginaAdmin={true} />
        </div>
      </div>
    </>
  );
}
