import { createContext } from "react";
import type { ReactNode } from "react";

interface ModalContextType {
  openModal: (content?: ReactNode) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalContent: ReactNode | null;
}

export const ModalContext = createContext<ModalContextType | null>(null);