import LinkEstilizado from "componentes/LinkEstilizado";
import styles from "./CabecalhoAreaRestrita.module.css";

interface CabecalhoAreaRestritaProps {
  tituloArea: "Painel do Administrador" | "Painel do Cliente";
  link1: string;
  titulo1: string;
  link2: string;
  titulo2: string;
  link3: string;
  titulo3: string;
  link4: string;
  titulo4: string;
}

export default function CabecalhoAreaRestrita({
  tituloArea,
  link1,
  titulo1,
  link2,
  titulo2,
  link3,
  titulo3,
  link4,
  titulo4,
}: CabecalhoAreaRestritaProps) {
  return (
    <nav className={styles.cabecalhoPainel}>
      <div>
        <LinkEstilizado style={styles.link} url={link1}>
          {titulo1}
        </LinkEstilizado>
        <LinkEstilizado style={styles.link} url={link2}>
          {titulo2}
        </LinkEstilizado>
        {tituloArea === "Painel do Administrador" && (
          <>
            <LinkEstilizado style={styles.link} url={link3}>
              {titulo3}
            </LinkEstilizado>
            <LinkEstilizado style={styles.link} url={link4}>
              {titulo4}
            </LinkEstilizado>
          </>
        )}
      </div>
      <div>
        <p>{tituloArea}</p>
      </div>
    </nav>
  );
}
