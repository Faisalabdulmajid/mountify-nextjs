"use client";
import { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import ModalForgotPassword from "./ModalForgotPassword";
export default function AuthModal({
  open,
  onClose,
  active = "login",
  setActive,
}) {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  // Reset ke login saat modal dibuka ulang
  if (!open) return null;

  const handleClose = () => {
    setActive && setActive("login");
    onClose();
  };

  return (
    <>
      {internalActive === "login" && (
        <ModalLogin
          open={open}
          onClose={handleClose}
          onRegister={() => setActive && setActive("register")}
          onForgot={() => setActive && setActive("forgot")}
        />
      )}
      {internalActive === "register" && (
        <ModalRegister
          open={open}
          onClose={handleClose}
          onLogin={() => setActive && setActive("login")}
        />
      )}
      {internalActive === "forgot" && (
        <ModalForgotPassword
          open={open}
          onClose={handleClose}
          onLogin={() => setActive && setActive("login")}
        />
      )}
    </>
  );
}
