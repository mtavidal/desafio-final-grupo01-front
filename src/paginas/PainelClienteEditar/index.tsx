import styles from "./PainelClienteEditar.module.css";
import Botao from "componentes/Botao";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import CampoInput from "componentes/CampoInput";
import { api } from "lib/axios";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { useAppSelector } from "hooks";
import CarregandoPagina from "componentes/CarregandoPagina";
import PasswordChecklist from "react-password-checklist";

export default function PainelClienteEditar() {
  const selector = useAppSelector((store) => store.authReducer);

  const [nome, setNome] = useState(`${selector.usuario?.name}`);
  const [email, setEmail] = useState(`${selector.usuario?.email}`);
  const [senha, setSenha] = useState(``);
  const [confirmarSenha, setConfirmarSenha] = useState(``);
  const [editando, setEditando] = useState(false);

  const [hiddenBotao, setHiddenBotao] = useState(true);

  const navigate = useNavigate();
  const notifyCadastroEditado = (id: number) =>
    toast.success(`Dados do cliente de id:${id} atualizado com sucesso`);
  const editarCadastroCliente = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const atualizarCliente = async () => {
      try {
        setEditando(true);
        const response = await api.put(`/users/${selector.usuario?.id}`, {
          name: nome,
          email: email,
          password: senha,
          type: "Cliente",
        });
        const data = await response.data;
        notifyCadastroEditado(data.id);
      } catch (error) {
        console.log(error);
      } finally {
        setEditando(false);
      }
    };
    atualizarCliente();
  };
  return (
    <>
      <CabecalhoListaProdutos
        titulo="Editar dados do usuário"
        subtitulo="Digite para atualizar seus dados"
      />
      {editando ? (
        <>
          <div className={styles.containerPainel}></div>
          <CarregandoPagina visibilidade={editando} />
        </>
      ) : (
        <div className={styles.containerPainel}>
          <div className={styles.containerFormCliente}>
            <form onSubmit={editarCadastroCliente}>
              <h3>Edite o seu cadastro</h3>
              <CampoInput
                obrigatorio={true}
                label="Nome"
                placeholder="Nome do Cliente"
                valor={nome}
                aoAlterado={(valor) => setNome(valor)}
              />
              <CampoInput
                obrigatorio={true}
                label="Email"
                placeholder="Email do Cliente"
                valor={email}
                aoAlterado={(valor) => setEmail(valor)}
                tipo="email"
              />

              <CampoInput
                obrigatorio={true}
                label="Senha"
                placeholder="Senha atual ou digite nova senha"
                valor={senha}
                aoAlterado={(valor) => setSenha(valor)}
                tipo="password"
              />

              <CampoInput
                obrigatorio={true}
                label="Confirme sua senha"
                placeholder="Confirmar senha atual ou nova senha"
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

              <br />
              <div className={styles.botoes}>
                <Botao primario={false} disabled={editando || hiddenBotao}>
                  Atualizar seus dados
                </Botao>
                <Botao primario={false} onClick={() => navigate("/produtos")}>
                  Continuar comprando
                </Botao>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
