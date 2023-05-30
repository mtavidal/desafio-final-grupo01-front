import Cabecalho from "componentes/Cabecalho";
import Home from "paginas/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Cabecalho />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<PaginaBase />}>
            <Route index element={<Inicio />} />
            <Route path="Favoritos" element={<Favoritos />} />
            <Route path=":id" element={<Player />} />
            <Route path="*" element={<NaoEncontrada />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
