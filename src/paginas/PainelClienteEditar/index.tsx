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

export default function PainelClienteEditar() {
  const selector = useAppSelector((store) => store.authReducer);

  const [nome, setNome] = useState(`${selector.usuario?.name}`);
  const [email, setEmail] = useState(`${selector.usuario?.email}`);
  const [senha, setSenha] = useState(`${selector.usuario?.password}`);

  const [editando, setEditando] = useState(false);

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
        alert("Erro na requisição");
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
                placeholder="Senha do Cliente"
                valor={senha}
                aoAlterado={(valor) => setSenha(valor)}
                tipo="password"
              />

              <br />
              <div className={styles.botoes}>
                <Botao primario={false} disabled={editando}>
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
