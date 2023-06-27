import { useEffect, useState } from "react";
import styles from "./ListarUsuarios.module.css";
import { api } from "lib/axios";
import { Usuario, UsuarioResponse } from "shared/interfaces/IUsuarios";
import Botao from "componentes/Botao";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CarregandoPagina from "componentes/CarregandoPagina";

interface ListarUsuariosProps {
  atualizaLista?: number;
}

export default function ListarUsuarios({
  atualizaLista = 0,
}: ListarUsuariosProps) {
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [usuarioDeletado, setUsuarioDeletado] = useState(0);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await api.get("/pessoas", {
          // params: {
          //   sort: "desc",
          // },
        });
        const responseUsuarios = response.data.map((usuario: Usuario) => {
          return {
            id: usuario.idpessoa,
            email: usuario.email,
            password: usuario.senha,
            name: usuario.nome,
            type: usuario.tipoUsuario,
          };
        });

        setUsuarios(responseUsuarios);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setCarregandoUsuario(false);
      }
    };
    getUsuarios();
  }, [atualizaLista, usuarioDeletado]);

  const notifyDeleteUsuario = (id: any) =>
    toast.success(`Usuário com id: ${id} deletado com sucesso!`);

  const deletarUsuario = async (id: number) => {
    const confirmaDeletar = window.confirm(
      `Tem certeza que deseja deletar o usuário de id: ${id}?`
    );
    if (confirmaDeletar) {
      setCarregandoUsuario(true);
      try {
        await api.delete(`/pessoas/${id}`);
        setUsuarioDeletado(id);
        notifyDeleteUsuario(id);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setCarregandoUsuario(false);
      }
    }
  };

  const navigate = useNavigate();
  function editarUsuario(usuario: UsuarioResponse) {
    navigate("/paineladmin/usuarios/editar", {
      state: usuario,
    });
  }

  return (
    <div className={styles.containerUsuarios}>
      {carregandoUsuario ? (
        <CarregandoPagina visibilidade={carregandoUsuario} />
      ) : (
        <div className={styles.listarUsuarios}>
          <h3 className={styles.listarUsuariosCabecalhoMobile}>
            Lista de Usuários
          </h3>
          <div className={styles.cardUsuarioCabecalho}>
            <div className={styles.cardUsuarioTextos}>
              <h3 className={styles.cardUsuarioTexto}>Nome</h3>
              <h3 className={styles.cardUsuarioTexto}>Email</h3>
              <h3 className={styles.cardUsuarioTexto}>Tipo</h3>
            </div>
            <div className={styles.cardUsuarioBotoes}>
              <h3>Ações</h3>
            </div>
          </div>
          {usuarios.map((usuario) => {
            return (
              <div key={usuario.id} className={styles.cardUsuario}>
                <div className={styles.cardUsuarioTextos}>
                  <h4 className={styles.cardUsuarioTexto}>{usuario.name}</h4>
                  <h4 className={styles.cardUsuarioTexto}>{usuario.email}</h4>
                  <h4 className={styles.cardUsuarioTexto}>{usuario.type}</h4>
                </div>
                <div className={styles.cardUsuarioBotoes}>
                  <Botao
                    onClick={() =>
                      editarUsuario({
                        id: usuario.id,
                        name: usuario.name,
                        email: usuario.email,
                        type: usuario.type,
                        password: usuario.password,
                      })
                    }
                  >
                    Editar
                  </Botao>
                  <Botao
                    primario={false}
                    onClick={() => deletarUsuario(usuario.id)}
                  >
                    Deletar
                  </Botao>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
