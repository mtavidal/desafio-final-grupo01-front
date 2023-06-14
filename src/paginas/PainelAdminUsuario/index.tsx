import CabecalhoAreaRestrita from "componentes/CabecalhoAreaRestrita";
import styles from "./PainelAdminUsuario.module.css";
import CabecalhoListaProdutos from "componentes/CabecalhoListaProdutos";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import CampoInput from "componentes/CampoInput";
import Botao from "componentes/Botao";

export default function PainelAdminUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  // const notifyAdicionarUsuario = () =>
  toast.success(`Usuario adicionado com sucesso`);

  const cadastrarUsuario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    // const adicionarUsuario = async () => {
    // try {
    //   const response = await api.post(`/products`, {
    //     title: nome,
    //     price: preco,
    //     description: descricao,
    //     image: imagem,
    //     category: categoria,
    //   });
    //   const data = await response.data;
    //   setAtualizaLista(data.id);
    //   notifyAdicionarProduto();
    // } catch (error) {
    //   alert("Erro na requisição");
    //   console.log(error);
    // }
    // };
    // adicionarUsuario();
    // setNome("");
    // setEmail("");
    // setSenha("");
    // setTipoUsuario("");
  };

  return (
    <>
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
            <CampoInput
              obrigatorio={true}
              label="Tipo do usuário"
              placeholder="Administrador ou Cliente"
              valor={tipoUsuario}
              aoAlterado={(valor) => setTipoUsuario(valor)}
            />
            <br />
            <Botao primario={false}>Adicionar Usuário</Botao>
            <Toaster toastOptions={{ duration: 2000 }} />
          </form>
        </div>
      </div>
    </>
  );
}
