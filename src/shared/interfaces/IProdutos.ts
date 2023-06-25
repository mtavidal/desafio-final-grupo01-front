import { Categoria } from "./ICategoria";

export interface Produto {
  idproduto: number;
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
  idcategoria: number;
  categorias?: Categoria;
}

export interface ProdutoNoCarrinho extends ProdutoResponse {
  quantidade: number;
}
export interface ProdutoResponse {
  id: number;
  title: string;
  image: string;
  price: number;
  description?: string;
  category?: Categoria;
}
