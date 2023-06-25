import CampoInput from "componentes/CampoInput";
import styles from "./Login.module.css";
import Botao from "componentes/Botao";
import { useState } from "react";
import { api } from "lib/axios";
import { Link } from "react-router-dom";
import { useAppDispatch } from "hooks";
import { login } from "store/modules/usuario";
import CarregandoPagina from "componentes/CarregandoPagina";

export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fazendoLogin, setFazendoLogin] = useState(false);
  const [senhaEmailerrado, setSenhaEmailerrado] = useState(false);

  const fazerLogin = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setSenhaEmailerrado(false);
    const autenticarUsuario = async () => {
      setFazendoLogin(true);
      try {
        // const response = await api.post(`/auth/login`, {
        //   email: email,
        //   password: senha,
        // });
        // const data = await response.data;
        const data = {
          usuario: {
            id: 4,
            email: "manu@gama.com",
            password: "123456",
            name: "Manuela Vidal",
            type: "Administrador",
          },
          token: "dsadasdasd",
        };
        dispatch(login(data));
      } catch (error: any) {
        if (error.response.status === 401) {
          setSenhaEmailerrado(true);
        } else {
          alert("Erro na requisição");
        }

        console.log(error.response.data);
        console.log(error);
      } finally {
        setFazendoLogin(false);
      }
    };
    autenticarUsuario();
    setEmail("");
    setSenha("");
  };
  return (
    <>
      {fazendoLogin ? (
        <>
          <div className={styles.containerPainel}></div>
          <CarregandoPagina visibilidade={fazendoLogin} />
        </>
      ) : (
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
              {senhaEmailerrado ? (
                <h4>Usuário ou Senha inválidos</h4>
              ) : (
                <h4> </h4>
              )}
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
      )}
    </>
  );
}
