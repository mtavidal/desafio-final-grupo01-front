import { useEffect, useState } from "react";
import styles from "./ListarUsuarios.module.css";
import { api } from "lib/axios";
import { Usuario } from "shared/interfaces/IUsuarios";
import Botao from "componentes/Botao";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CarregandoPagina from "componentes/CarregandoPagina";
import ModalComp from "componentes/ModalComp";

interface ListarUsuariosProps {
  atualizaLista?: number;
}

export default function ListarUsuarios({
  atualizaLista = 0,
}: ListarUsuariosProps) {
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioDeletado, setUsuarioDeletado] = useState(0);

  const [abrirModal, setAbrirModal] = useState(false);
  const [idDelete, setIdDelete] = useState<number | null>(null);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await api.get("/users", {
          params: {
            sort: "desc",
          },
        });
        setUsuarios(response.data);
      } catch (error) {
        alert("Erro na requisição");
      } finally {
        setCarregandoUsuario(false);
      }
    };
    getUsuarios();
  }, [atualizaLista, usuarioDeletado]);

  useEffect(() => {
    if (idDelete) {
      setAbrirModal(true);
    }
  }, [idDelete]);

  const notifyDeleteUsuario = (id: any) =>
    toast.success(`Usuário com id: ${id} deletado com sucesso!`);

  const deletarUsuario = async (id: number | null) => {
    if (!id) {
      return;
    }
    setCarregandoUsuario(true);
    try {
      const response = await api.delete(`/users/${id}`);
      setUsuarioDeletado(id);
      notifyDeleteUsuario(response.data);
    } catch (error) {
      alert("Erro na requisição");
    } finally {
      setCarregandoUsuario(false);
      setAbrirModal(false);
      setIdDelete(null);
    }
  };

  const navigate = useNavigate();
  function editarUsuario(usuario: Usuario) {
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
                    onClick={() => setIdDelete(usuario.id)}
                  >
                    Deletar
                  </Botao>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ModalComp
        contentLabel="Modal confirma deletar"
        mostrarModal={abrirModal}
        handleConfirmarModal={() => deletarUsuario(idDelete)}
        handleFecharModal={() => {
          setAbrirModal(false);
          setTimeout(() => setIdDelete(null), 500);
        }}
      >
        {`Deseja realmente deletar o usuário de id: ${idDelete}?`}
      </ModalComp>
    </div>
  );
}
