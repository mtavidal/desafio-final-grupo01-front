import { ProdutoNoCarrinho } from "./IProdutos";

export interface Pedido {
  id: number;
  data: string;
  userId: number;
  produtos: ProdutoNoCarrinho[];
}
