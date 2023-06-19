import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { ReactNode } from "react";

interface RotaLoginProps {
  children: ReactNode;
}
export function RotaLogin({ children }: RotaLoginProps) {
  const usuario = useAppSelector((state) => state.authReducer.usuario);
  const ehAdmin = usuario?.type === "Administrador" ? true : false;
  const params = useParams();

  if (!usuario) {
    return <>{children}</>;
  }

  if (params) {
    return <Navigate to="/carrinho" />;
  }

  if (ehAdmin) {
    return <Navigate to="/paineladmin/pedidos" />;
  } else {
    return <Navigate to="/painelcliente/pedidos" />;
  }
}
