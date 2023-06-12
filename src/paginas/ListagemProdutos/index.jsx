import { ListarProdutos } from 'componentes/ListarProdutos'
import styles from './ListagemProdutos.module.css'
import FiltrarCategorias from 'componentes/FiltrarCategorias'
import CabecalhoListaProdutos from 'componentes/CabecalhoListaProdutos'

export default function ListagemProdutos() {
    return (
        <div className={styles.containerListagem}>
            <CabecalhoListaProdutos 
            titulo="Os melhores óculos para você!" 
            subtitulo="As melhores marcas e os melhores óculos de grau, de sol e infatis em um
            só lugar!"
            />
            <div className={styles.catElistagem}>
                <FiltrarCategorias />
                <ListarProdutos limitPaginas={10} />
            </div>
            
        </div>
    )
}