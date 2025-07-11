"use client";
import { useState } from "react";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import ModalForgotPassword from "./ModalForgotPassword";

export default function AuthModal({ open, onClose }) {
  const [active, setActive] = useState("login"); // "login" | "register" | "forgot"

  // Reset ke login saat modal dibuka ulang
  if (!open) return null;

  const handleClose = () => {
    setActive("login");
    onClose();
  };

  return (
    <>
      {active === "login" && (
        <ModalLogin
          open={open}
          onClose={handleClose}
          onRegister={() => setActive("register")}
          onForgot={() => setActive("forgot")}
        />
      )}
      {active === "register" && (
        <ModalRegister
          open={open}
          onClose={handleClose}
          onLogin={() => setActive("login")}
        />
      )}
      {active === "forgot" && (
        <ModalForgotPassword
          open={open}
          onClose={handleClose}
          onLogin={() => setActive("login")}
        />
      )}
    </>
  );
}
