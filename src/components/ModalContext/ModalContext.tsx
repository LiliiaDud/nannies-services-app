import { createContext } from "react";

interface ModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

export const ModalContext = createContext<ModalContextType | null>(null);