import { ReactNode } from "react";

export interface BasicModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}
