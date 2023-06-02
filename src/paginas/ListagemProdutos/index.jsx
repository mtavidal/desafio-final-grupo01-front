import { ListarProdutos } from 'componentes/ListarProdutos'
import styles from './ListagemProdutos.module.css'

export default function ListagemProdutos() {
    return (
        <div>
            <h1>Pagina listagem de produtos</h1>
            <ListarProdutos ehPaginaHome={false}  limitPaginas={10} />
        </div>
    )
}