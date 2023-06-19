import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { ReactNode } from "react";

interface RotaUsuarioLogadoProps {
  children: ReactNode;
}
export function RotaUsuarioLogado({ children }: RotaUsuarioLogadoProps) {
  const { usuario, carregando } = useAppSelector((state) => state.authReducer);

  console.log("rota usuario logado:", usuario);
  if (!usuario && !carregando) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
