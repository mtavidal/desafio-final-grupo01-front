import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";

export default function CabecalhoCliente() {
  return (
    <CabecalhoAreaRestrita
      tituloArea="Painel do Cliente"
      link1="/painelcliente/pedidos"
      titulo1="Pedidos"
      link2="/painelcliente/editar"
      titulo2="Editar Cadastro"
      link3=" "
      titulo3=" "
      link4=" "
      titulo4=" "
    />
  );
}
