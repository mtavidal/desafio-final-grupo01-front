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
import { RotaAdmin } from "componentes/RotaAdmin";
import { RotaUsuarioLogado } from "componentes/RotaUsuarioLogado";
import { RotaLogin } from "componentes/RotaLogin";
import NaoEncontrada from "paginas/NaoEncontrada";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<ListagemProdutos />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route
        path="/login"
        element={
          <RotaLogin>
            <Login />
          </RotaLogin>
        }
      />
      <Route path="/detalhes" element={<DetalhesProduto />} />
      <Route
        path="/sucesso"
        element={
          <RotaUsuarioLogado>
            <SucessoDoPedido />
          </RotaUsuarioLogado>
        }
      />
      <Route path="/cadastrousuario" element={<CadastroUsuario />} />
      <Route
        path="/paineladmin"
        element={
          <RotaAdmin>
            <PainelAdminPedido />
          </RotaAdmin>
        }
      />
      <Route
        path="/paineladmin/pedidos"
        element={
          <RotaAdmin>
            <PainelAdminPedido />
          </RotaAdmin>
        }
      />
      <Route
        path="/paineladmin/produtos"
        element={
          <RotaAdmin>
            <PainelAdminProduto />
          </RotaAdmin>
        }
      />
      <Route
        path="/paineladmin/produtos/editar"
        element={
          <RotaAdmin>
            <EditarProduto />
          </RotaAdmin>
        }
      />
      <Route
        path="/paineladmin/usuarios"
        element={
          <RotaAdmin>
            <PainelAdminUsuario />
          </RotaAdmin>
        }
      />
      <Route
        path="/paineladmin/usuarios/editar"
        element={
          <RotaAdmin>
            <EditarUsuario />
          </RotaAdmin>
        }
      />
      <Route
        path="/paineladmin/categorias"
        element={
          <RotaAdmin>
            <PainelAdminCategoria />
          </RotaAdmin>
        }
      />
      <Route
        path="/paineladmin/categorias/editar"
        element={
          <RotaAdmin>
            <EditarCategoria />
          </RotaAdmin>
        }
      />
      <Route
        path="/painelcliente"
        element={
          <RotaUsuarioLogado>
            <PainelClientePedidos />
          </RotaUsuarioLogado>
        }
      />
      <Route
        path="/painelcliente/pedidos"
        element={
          <RotaUsuarioLogado>
            <PainelClientePedidos />
          </RotaUsuarioLogado>
        }
      />
      <Route
        path="/painelcliente/editar"
        element={
          <RotaUsuarioLogado>
            <PainelClienteEditar />
          </RotaUsuarioLogado>
        }
      />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
