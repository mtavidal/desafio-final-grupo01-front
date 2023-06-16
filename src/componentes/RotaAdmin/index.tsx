import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { ReactNode } from "react";

interface RotaAdminProps {
  children: ReactNode;
}
export function RotaAdmin({ children }: RotaAdminProps) {
  const usuario = useAppSelector((state) => state.authReducer.usuario);
  const ehAdmin = usuario?.type === "Administrador" ? true : false;

  if (!ehAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
