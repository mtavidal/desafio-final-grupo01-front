import CampoInput from "componentes/CampoInput";
import styles from "./CadastroUsuario.module.css";
import Botao from "componentes/Botao";
import { useState } from "react";
import { api } from "lib/axios";
import { useNavigate } from "react-router-dom";
import CarregandoPagina from "componentes/CarregandoPagina";
import { toast } from "react-hot-toast";
import PasswordChecklist from "react-password-checklist";
import { AxiosError } from "axios";
import ModalComp from "componentes/ModalComp";

const CadastroUsuario = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fazendoCadastro, setFazendoCadastro] = useState(false);
  const [hiddenBotao, setHiddenBotao] = useState(true);
  const navigate = useNavigate();

  const [abrirModal, setAbrirModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const notifyCadastroSucesso = (nome: string) =>
    toast.success(`${nome}, seu cadastro foi realizado com sucesso`);

  const cadastrarUsuario = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const autenticarUsuario = async () => {
      setFazendoCadastro(true);
      try {
        const response = await api.post(`/users`, {
          name: nomeCompleto,
          email: email,
          password: senha,
          type: "Cliente",
        });
        const data = await response.data;
        notifyCadastroSucesso(data.name);
        navigate("/login");
      } catch (error: any) {
        const err = error as AxiosError<any | string>;
        if (err.response?.status === 409) {
          setAbrirModal(true);
          setMensagemErro(err.response.data.mensagem);
        }
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
              <CampoInput
                obrigatorio={true}
                label="Nome Completo"
                placeholder="Nome completo"
                valor={nomeCompleto}
                aoAlterado={(valor) => setNomeCompleto(valor)}
                tipo="text"
                comBorda={true}
              />
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
                placeholder="Senha"
                valor={senha}
                aoAlterado={(valor) => setSenha(valor)}
                tipo="password"
                comBorda={true}
              />
              <CampoInput
                obrigatorio={true}
                label="Confirme sua senha"
                placeholder="Confirmar Senha"
                valor={confirmarSenha}
                aoAlterado={(valor) => setConfirmarSenha(valor)}
                tipo="password"
                comBorda={true}
              />
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={5}
                value={senha}
                valueAgain={confirmarSenha}
                messages={{
                  minLength: "A senha tem no mínimo 5 caracteres.",
                  specialChar: "A senha tem pelo menos 1 caractere especial.",
                  number: "A senha tem pelo menos 1 número.",
                  capital: "A senha tem pelo menos 1 letra maiúscula.",
                  match: "As senhas coincidem.",
                }}
                iconSize={12}
                className={styles.validacao}
                onChange={(isValid) => {
                  if (isValid) {
                    setHiddenBotao(false);
                  } else {
                    setHiddenBotao(true);
                  }
                }}
              />
              <Botao disabled={hiddenBotao} primario={false}>
                Cadastrar
              </Botao>
            </form>
          </div>
        </div>
      )}
      <ModalComp
        contentLabel="Modal erro email já existe"
        mostrarModal={abrirModal}
        handleFecharModal={() => setAbrirModal(false)}
      >
        {mensagemErro}
      </ModalComp>
    </>
  );
};

export default CadastroUsuario;
