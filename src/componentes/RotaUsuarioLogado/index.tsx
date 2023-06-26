import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { ReactNode } from "react";

interface RotaUsuarioLogadoProps {
  children: ReactNode;
}
export function RotaUsuarioLogado({ children }: RotaUsuarioLogadoProps) {
  const { usuario, carregando } = useAppSelector((state) => state.authReducer);

  if (!usuario && !carregando) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
