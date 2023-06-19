import { Categoria } from "./ICategoria";

export interface Produto {
  id: number;
  // nome: string
  // foto: string
  // preco: number
  // descricao: string
  // categoria: string
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export interface ProdutoNoCarrinho extends Produto {
  quantidade: number;
}
export interface ProdutoResponse {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Categoria;
}
