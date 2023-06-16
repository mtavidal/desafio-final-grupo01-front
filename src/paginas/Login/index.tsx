import CampoInput from "componentes/CampoInput";
import styles from "./Login.module.css";
import Botao from "componentes/Botao";
import { useState } from "react";
import { api } from "lib/axios";
import { Link } from "react-router-dom";
import { useAppDispatch } from "hooks";
import { login } from "store/modules/usuario";

export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const autenticarUsuario = async () => {
      try {
        const response = await api.post(`/auth/login`, {
          email: email,
          password: senha,
        });
        const data = await response.data;
        console.log(data);
        dispatch(login(data));
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      }
    };
    autenticarUsuario();
    setEmail("");
    setSenha("");
  };
  return (
    <div className={styles.containerPainel}>
      <div className={styles.containerFormUsuarios}>
        <form onSubmit={fazerLogin}>
          <h3>Faça seu login</h3>
          <CampoInput
            obrigatorio={true}
            label="Email"
            placeholder="Email do usuário"
            valor={email}
            aoAlterado={(valor) => setEmail(valor)}
            tipo="email"
            comBorda={true}
          />

          <CampoInput
            obrigatorio={true}
            label="Senha"
            placeholder="Senha para o usuário"
            valor={senha}
            aoAlterado={(valor) => setSenha(valor)}
            tipo="password"
            comBorda={true}
          />
          <br />
          <Botao primario={false}>Entrar</Botao>
          <h5 className={styles.rodape}>
            Não é cadastrado?{" "}
            <Link className={styles.estiloLink} to="/cadastrousuario">
              Crie sua conta
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
}
