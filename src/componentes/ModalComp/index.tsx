import { ReactNode, useState, useEffect } from "react";
import Modal from "react-modal";

// Código necessário para os recursos de acessibilidade
Modal.setAppElement("#root");

interface ModalCompProps {
  contentLabel: string;
  children: ReactNode;
  mostrarModal: boolean;
}

export default function ModalComp({
  contentLabel,
  children,
  mostrarModal,
}: ModalCompProps) {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function abrirModal() {
      setIsOpen(mostrarModal);
    }
    abrirModal();
  }, [mostrarModal]);

  function fecharModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel={contentLabel}
      >
        <h2>{children}</h2>
        <button onClick={fecharModal}>Fechar</button>
      </Modal>
    </div>
  );
}
