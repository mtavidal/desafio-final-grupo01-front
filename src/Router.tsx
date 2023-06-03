import { Route, Routes } from "react-router-dom";

import Carrinho from "paginas/Carrinho";
import Home from "paginas/Home";
import ListagemProdutos from "paginas/ListagemProdutos";
import Login from "paginas/Login";
import DetalhesProduto from "paginas/DetalhesProduto";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<ListagemProdutos />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detalhes" element={<DetalhesProduto />} />

      {/* <Route path="/" element={<PaginaBase />}>
            <Route index element={<Inicio />} />
            <Route path="Favoritos" element={<Favoritos />} />
            <Route path=":id" element={<Player />} />
            <Route path="*" element={<NaoEncontrada />} />
        </Route> */}
    </Routes>
  );
}
