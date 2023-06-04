import { ReactNode } from "react";
import styles from "./Botao.module.css";

interface BotaoProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  primario?: boolean;
  hidden?: boolean;
}

export default function Botao({
  children,
  onClick,
  disabled,
  hidden,
  primario = true,
}: BotaoProps) {
  return (
    <button
      className={
        primario ? styles.botao : styles.botao + " " + styles.secundario
      }
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
    >
      {children}
    </button>
  );
}
