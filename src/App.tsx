import Cabecalho from "componentes/Cabecalho";
import Rodape from "componentes/Rodape";
import { Toaster } from "react-hot-toast";
import Router from "Router";

function App() {
  return (
    <>
      <Toaster toastOptions={{ duration: 2000 }} />
      <Cabecalho />
      <Router />
      <Rodape />
    </>
  );
}

export default App;
