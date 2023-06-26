import styles from "./PainelAdminUsuario.module.css";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { toast } from "react-hot-toast";
import { useState } from "react";
import CampoInput from "componentes/CampoInput";
import Botao from "componentes/Botao";
import { api } from "lib/axios";
import ListarUsuarios from "componentes/ListarUsuarios";
import CarregandoPagina from "componentes/CarregandoPagina";

export default function PainelAdminUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [adicionandoUsuario, setAdicionandoUsuario] = useState(false);

  const notifyAdicionarUsuario = () =>
    toast.success(`Usuario adicionado com sucesso`);

  const cadastrarUsuario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const adicionarUsuario = async () => {
      setAdicionandoUsuario(true);
      try {
        const response = await api.post(`/users`, {
          email: email,
          password: senha,
          name: nome,
          type: tipoUsuario,
        });
        const data = await response.data;
        console.log(data);
        setAtualizaLista(data.id);
        notifyAdicionarUsuario();
      } catch (error) {
        console.log(error);
      } finally {
        setAdicionandoUsuario(false);
      }
    };
    adicionarUsuario();
    setNome("");
    setEmail("");
    setSenha("");
    setTipoUsuario("");
  };

  return (
    <>
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Usuários"
        subtitulo="Adicione, edite e delete os usuários"
      />
      {adicionandoUsuario ? (
        <>
          <div className={styles.containerPainel}></div>
          <CarregandoPagina visibilidade={adicionandoUsuario} />
        </>
      ) : (
        <div className={styles.containerPainel}>
          <div className={styles.containerFormUsuarios}>
            <form onSubmit={cadastrarUsuario}>
              <h3>Adicionar Usuário</h3>
              <CampoInput
                obrigatorio={true}
                label="Nome"
                placeholder="Nome do usuário"
                valor={nome}
                aoAlterado={(valor) => setNome(valor)}
              />
              <CampoInput
                obrigatorio={true}
                label="Email"
                placeholder="Email do usuário"
                valor={email}
                aoAlterado={(valor) => setEmail(valor)}
                tipo="email"
              />

              <CampoInput
                obrigatorio={true}
                label="Senha"
                placeholder="Senha para o usuário"
                valor={senha}
                aoAlterado={(valor) => setSenha(valor)}
                tipo="password"
              />
              <label className={styles.ajusteLabel}>Tipo do usuário</label>
              <select
                className={styles.ajusteSelect}
                name="selectTipoUsuario"
                id="selectTipoUsuario"
                required
                value={tipoUsuario}
                onChange={(evento: React.ChangeEvent<HTMLSelectElement>) =>
                  setTipoUsuario(evento.target.value)
                }
              >
                <option value="">Selecione o tipo do usuário</option>
                <option value="Administrador">Administrador</option>
                <option value="Cliente">Cliente</option>
              </select>
              <br />
              <Botao primario={false}>Adicionar Usuário</Botao>
            </form>
            <ListarUsuarios atualizaLista={atualizaLista} />
          </div>
        </div>
      )}
    </>
  );
}
