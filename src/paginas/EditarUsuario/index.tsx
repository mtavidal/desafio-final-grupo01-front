import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditarUsuario.module.css";
import CampoInput from "componentes/CampoInput";
import { toast } from "react-hot-toast";
import Botao from "componentes/Botao";
import { useState } from "react";
import { api } from "lib/axios";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";
import { Usuario } from "shared/interfaces/IUsuarios";

export default function EditarUsuario() {
  const location = useLocation();
  const dadosUsuario = location.state as Usuario;
  const [nome, setNome] = useState(`${dadosUsuario.name}`);
  const [email, setEmail] = useState(`${dadosUsuario.email}`);
  const [senha, setSenha] = useState(`${dadosUsuario.password}`);
  const [tipoUsuario, setTipoUsuario] = useState(`${dadosUsuario.type}`);
  const [editando, setEditando] = useState(false);

  const navigate = useNavigate();
  const notifyEditarUsuario = (id: number) =>
    toast.success(`Usuário de id:${id} atualizado com sucesso`);

  const editarUsuario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const atualizarUsuario = async () => {
      try {
        setEditando(true);
        const response = await api.put(`/users/${dadosUsuario.id}`, {
          name: nome,
          email: email,
          password: senha,
          type: tipoUsuario,
        });
        const data = await response.data;
        notifyEditarUsuario(data.id);
      } catch (error) {
        alert("Erro na requisição");
        console.log(error);
      } finally {
        setEditando(false);
      }
    };
    atualizarUsuario();
  };
  return (
    <div>
      <CabecalhoAreaRestrita
        tituloArea="Painel do Administrador"
        link1="/paineladmin/pedidos"
        titulo1="Pedidos"
        link2="/paineladmin/produtos"
        titulo2="Produtos"
        link3="/paineladmin/usuarios"
        titulo3="Usuários"
        link4="/paineladmin/categorias"
        titulo4="Categorias"
      />
      <CabecalhoListaProdutos
        titulo="Gerenciamento de Usuários"
        subtitulo="Adicione, edite e delete os usuários"
      />
      <div className={styles.containerPainel}>
        <div className={styles.containerFormUsuarios}>
          <form onSubmit={editarUsuario}>
            <h3>Atualizar Usuário</h3>
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
            <div className={styles.botoes}>
              <Botao primario={false} disabled={editando}>
                Atualizar Usuário
              </Botao>
              <Botao
                primario={false}
                onClick={() => navigate("/paineladmin/usuarios")}
              >
                Voltar
              </Botao>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
