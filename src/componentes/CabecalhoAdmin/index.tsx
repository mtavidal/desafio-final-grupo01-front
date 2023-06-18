import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";

export default function CabecalhoAdmin() {
  return (
    <CabecalhoAreaRestrita
      tituloArea="Painel do Administrador"
      link1="/paineladmin/pedidos"
      titulo1="Pedidos"
      link2="/paineladmin/produtos"
      titulo2="Produtos"
      link3="/paineladmin/usuarios"
      titulo3="Usuários"
      link4="/paineladmin/categorias"
      titulo4="Categorias"
    />
  );
}
