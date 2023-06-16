import styles from "./CampoInput.module.css";

interface CampoInputProps {
  aoAlterado: (valor: string) => void;
  placeholder: string;
  label: string;
  valor: string;
  obrigatorio?: boolean;
  tipo?: "text" | "date" | "password" | "email" | "number" | "textarea";
  step?: string;
  min?: string;
  comBorda?: boolean;
}

export default function CampoInput({
  aoAlterado,
  label,
  placeholder,
  valor,
  obrigatorio = false,
  tipo = "text",
  step = "0.01",
  min = "0",
  comBorda = false,
}: CampoInputProps) {
  const aoDigitado = (evento: React.ChangeEvent<HTMLInputElement>) => {
    aoAlterado(evento.target.value);
  };

  return (
    <div className={styles.campo}>
      <label>{label}</label>
      <input
        className={comBorda ? styles.comBorda : styles.inputPadrao}
        value={valor}
        onChange={aoDigitado}
        required={obrigatorio}
        placeholder={placeholder}
        type={tipo}
        step={step}
        min={min}
      />
    </div>
  );
}
