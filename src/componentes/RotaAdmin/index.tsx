import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { ReactNode } from "react";

interface RotaAdminProps {
  children: ReactNode;
}
export function RotaAdmin({ children }: RotaAdminProps) {
  const { usuario, carregando } = useAppSelector((state) => state.authReducer);
  const ehAdmin = usuario?.type === "Administrador" ? true : false;

  if (!ehAdmin && !carregando) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
