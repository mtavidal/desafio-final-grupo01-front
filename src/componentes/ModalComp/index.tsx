import { ReactNode, useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./ModalComp.module.css";

// Código necessário para os recursos de acessibilidade
Modal.setAppElement("#root");

interface ModalCompProps {
  contentLabel: string;
  children: ReactNode;
  mostrarModal: boolean;
  handleFecharModal?: () => void;
  handleConfirmarModal?: () => {};
}

export default function ModalComp({
  contentLabel,
  children,
  mostrarModal,
  handleConfirmarModal,
  handleFecharModal,
}: ModalCompProps) {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function abrirModal() {
      setIsOpen(mostrarModal);
    }
    abrirModal();
  }, [mostrarModal]);

  // function fecharModal() {
  //   setIsOpen(false);
  //   handleFecharModal();
  // }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleFecharModal}
        contentLabel={contentLabel}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalContainer}>
          <h2 className={styles.tituloModal}>{children}</h2>
          <div className={styles.modalBotoes}>
            {handleConfirmarModal ? (
              <button
                className={styles.botaoModal2}
                onClick={handleConfirmarModal}
              >
                Confirmar
              </button>
            ) : (
              <></>
            )}
            <button className={styles.botaoModal} onClick={handleFecharModal}>
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
