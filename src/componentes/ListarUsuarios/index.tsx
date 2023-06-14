import { useEffect, useState } from "react";
import styles from "./ListarUsuarios.module.css";
import { api } from "lib/axios";
import { Usuario } from "shared/interfaces/IUsuarios";
import Botao from "componentes/Botao";
import { Toaster, toast } from "react-hot-toast";

interface ListarUsuariosProps {
  atualizaLista?: number;
}

export default function ListarUsuarios({
  atualizaLista = 0,
}: ListarUsuariosProps) {
  const [carregandoUsuario, setCarregandoUsuario] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioDeletado, setUsuarioDeletado] = useState(0);
  useEffect(() => {
    const getUsuarios = async () => {
      try {
        setCarregandoUsuario(true);
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

  const notifyDeleteUsuario = (id: any) =>
    toast.success(`Produto com id: ${id} deletado com sucesso!`);

  const deletarUsuario = async (id: number) => {
    try {
      const response = await api.delete(`/users/${id}`);
      setUsuarioDeletado(id);
      notifyDeleteUsuario(response.data);
    } catch (error) {
      alert("Erro na requisição");
    }
  };

  return (
    <div className={styles.containerUsuarios}>
      {carregandoUsuario ? (
        <p>Carregando usuários</p>
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
                  <Botao>Editar</Botao>
                  <Botao
                    primario={false}
                    onClick={() => deletarUsuario(usuario.id)}
                  >
                    Deletar
                  </Botao>
                  <Toaster toastOptions={{ duration: 2000 }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
