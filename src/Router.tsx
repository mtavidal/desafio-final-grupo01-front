import { Route, Routes } from "react-router-dom";

import Carrinho from "paginas/Carrinho";
import Home from "paginas/Home";
import ListagemProdutos from "paginas/ListagemProdutos";
import Login from "paginas/Login";
import DetalhesProduto from "paginas/DetalhesProduto";
import SucessoDoPedido from "paginas/SucessoDoPedido";
import PainelAdminPedido from "paginas/PainelAdminPedido";
import PainelAdminProduto from "paginas/PainelAdminProduto";
import PainelAdminUsuario from "paginas/PainelAdminUsuario";
import PainelAdminCategoria from "paginas/PainelAdminCategoria";
import PainelClientePedidos from "paginas/PainelClientePedidos";
import PainelClienteEditar from "paginas/PainelClienteEditar";
import EditarProduto from "paginas/EditarProduto";
import CadastroUsuario from "paginas/CadastroUsuario";
import EditarUsuario from "paginas/EditarUsuario";
import EditarCategoria from "paginas/EditarCategoria";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<ListagemProdutos />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detalhes" element={<DetalhesProduto />} />
      <Route path="/sucesso" element={<SucessoDoPedido />} />
      <Route path="/cadastrousuario" element={<CadastroUsuario />} />
      <Route path="/paineladmin/pedidos" element={<PainelAdminPedido />} />
      <Route path="/paineladmin/produtos" element={<PainelAdminProduto />} />
      <Route path="/paineladmin/produtos/editar" element={<EditarProduto />} />
      <Route path="/paineladmin/usuarios" element={<PainelAdminUsuario />} />
      <Route path="/paineladmin/usuarios/editar" element={<EditarUsuario />} />
      <Route
        path="/paineladmin/categorias"
        element={<PainelAdminCategoria />}
      />
      <Route
        path="/paineladmin/categorias/editar"
        element={<EditarCategoria />}
      />
      <Route path="/painelcliente/pedidos" element={<PainelClientePedidos />} />
      <Route path="/painelcliente/editar" element={<PainelClienteEditar />} />

      {/* <Route path="/" element={<PaginaBase />}>
            <Route index element={<Inicio />} />
            <Route path="Favoritos" element={<Favoritos />} />
            <Route path=":id" element={<Player />} />
            <Route path="*" element={<NaoEncontrada />} />
        </Route> */}
    </Routes>
  );
}
