import { Produto, ProdutoNoCarrinho } from "./IProdutos";

export interface Pedido {
  idpedido: number;
  // data: string;
  idpessoa: number;
  pedido_produtos: PedidoProduto[];
  valor: number;
}
export interface PedidoProduto {
  idpedido: number;
  idproduto: number;
  quantidade: number;
  produto: Produto;
}
export interface PedidoResponse {
  id: number;
  // data: string;
  userId: number;
  produtos: ProdutoNoCarrinho[];
  totalPedido: number;
}
