import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { ReactNode } from "react";

interface RotaLoginProps {
  children: ReactNode;
}
export function RotaLogin({ children }: RotaLoginProps) {
  const usuario = useAppSelector((state) => state.authReducer.usuario);
  const ehAdmin = usuario?.type === "Administrador" ? true : false;
  if (!usuario) {
    return <>{children}</>;
  }

  if (ehAdmin) {
    return <Navigate to="/paineladmin/pedidos" />;
  } else {
    return <Navigate to="/painelcliente/pedidos" />;
  }
}
