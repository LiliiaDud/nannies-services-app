import { useState } from "react";
import type { ReactNode } from "react";
import { ModalContext } from "./ModalContext";

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content?: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isModalOpen, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
}