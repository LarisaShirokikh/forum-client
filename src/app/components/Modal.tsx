// components/Modal.tsx
"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) {
      const div = document.createElement("div");
      div.id = "modal-root";
      document.body.appendChild(div);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4">
          <X />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
