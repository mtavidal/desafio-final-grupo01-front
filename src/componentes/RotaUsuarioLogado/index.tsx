import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { ReactNode } from "react";

interface RotaUsuarioLogadoProps {
  children: ReactNode;
}
export function RotaUsuarioLogado({ children }: RotaUsuarioLogadoProps) {
  const usuario = useAppSelector((state) => state.authReducer.usuario);

  console.log("rota usuario logado:", usuario);
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
