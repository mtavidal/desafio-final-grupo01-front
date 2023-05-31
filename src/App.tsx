import Cabecalho from "componentes/Cabecalho";
import Rodape from "componentes/Rodape";
import Carrinho from "paginas/Carrinho";
import Home from "paginas/Home";
import ListagemProdutos from "paginas/ListagemProdutos";
import Login from "paginas/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Cabecalho />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<ListagemProdutos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<PaginaBase />}>
            <Route index element={<Inicio />} />
            <Route path="Favoritos" element={<Favoritos />} />
            <Route path=":id" element={<Player />} />
            <Route path="*" element={<NaoEncontrada />} />
        </Route> */}
      </Routes>
      <Rodape />
    </BrowserRouter>
  );
}

export default App;
