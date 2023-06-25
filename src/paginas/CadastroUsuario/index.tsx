import CampoInput from "componentes/CampoInput";
import styles from "./CadastroUsuario.module.css";
import Botao from "componentes/Botao";
import { useState } from "react";
import { api } from "lib/axios";
import { Link } from "react-router-dom";
import { useAppDispatch } from "hooks";
import CarregandoPagina from "componentes/CarregandoPagina";
import { AxiosError } from "axios";

const CadastroUsuario = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fazendoCadastro, setFazendoCadastro] = useState(false);
  const [senhaEmailErrado, setSenhaEmailErrado] = useState(false);

  const cadastrarUsuario = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setSenhaEmailErrado(false);

    if (senha !== confirmarSenha) {
      alert("A senha e a confirmação de senha devem ser iguais.");
      return;
    }

    const autenticarUsuario = async () => {
      setFazendoCadastro(true);

      try {
        const response = await api.post(`/auth/cadastro`, {
          nome: nomeCompleto,
          email: email,
          password: senha,
        });

        const data = await response.data;
        // Lógica adicional de tratamento de sucesso, se necessário
      } catch (error: any) {
        if (
          (error as AxiosError).response &&
          (error as AxiosError).response?.status === 401
        ) {
          setSenhaEmailErrado(true);
        } else {
          alert("Erro na requisição");
        }

        console.log((error as AxiosError).response?.data);
        console.log(error);
      } finally {
        setFazendoCadastro(false);
      }
    };

    autenticarUsuario();
    setNomeCompleto("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
  };

  return (
    <>
      {fazendoCadastro ? (
        <>
          <div className={styles.containerPainel}></div>
          <CarregandoPagina visibilidade={fazendoCadastro} />
        </>
      ) : (
        <div className={styles.containerPainel}>
          <div className={styles.containerFormUsuarios}>
            <form onSubmit={cadastrarUsuario}>
              <h3>Criar uma conta</h3>
              <p>Compre rápido e acompanhe seus pedidos em um só lugar!</p>
              <input
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                placeholder="Nome completo"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
              />
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirmar Senha"
              />
              <Botao primario={false}>Cadastrar</Botao>
              <Link className={styles.estiloLink} to="/login">
                Faça seu login
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CadastroUsuario;
