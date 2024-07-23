// components/LoginModal.tsx
"use client";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import Modal from "./Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { isLoginModalOpen, closeLoginModal } = useUser();
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isSignUp ? (
        <SignUp onToggleAuthMode={toggleAuthMode} onClose={onClose} />
      ) : (
        <SignIn onToggleAuthMode={toggleAuthMode} />
      )}
    </Modal>
  );
};

export default LoginModal;
