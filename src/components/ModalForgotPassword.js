"use client";
import { useState } from "react";
import "./AuthForms.css";

export default function ModalForgotPassword({ open, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Gagal mengirim link reset. Coba lagi.");
      } else {
        setMessage("Jika email terdaftar, link reset telah dikirim.");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(44,62,80,0.18)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        className="auth-form-container"
        style={{
          width: 420,
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 2px 16px rgba(44,62,80,0.18)",
          padding: 36,
          margin: 24,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 24,
            color: "#bdbdbd",
            cursor: "pointer",
            zIndex: 2,
          }}
          aria-label="Tutup"
        >
          ×
        </button>
        <h2
          style={{
            textAlign: "center",
            color: "#2c3e50",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: 12,
          }}
        >
          Lupa Password
        </h2>
        <p
          className="auth-subtext"
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          Masukkan email Anda, kami akan mengirimkan link untuk mereset
          password.
        </p>
        <form onSubmit={handleSubmit} autoComplete="off">
          {error && (
            <div
              style={{
                color: "#e74c3c",
                background: "#fbeeea",
                borderRadius: 6,
                padding: "8px 0",
                marginBottom: 12,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}
          {message && (
            <div
              style={{
                color: "#16a34a",
                background: "#eafbee",
                borderRadius: 6,
                padding: "8px 0",
                marginBottom: 12,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {message}
            </div>
          )}
          <div className="auth-form-group">
            <label htmlFor="email_forgot">Alamat Email</label>
            <input
              type="email"
              id="email_forgot"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email terdaftar Anda"
              required
            />
          </div>
          <button
            type="submit"
            className="auth-button"
            style={{ background: "#16a34a" }}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </form>
        <div
          className="auth-navigation-prompt"
          style={{ textAlign: "center", marginTop: 24 }}
        >
          Ingat password?{" "}
          <button
            type="button"
            onClick={onLogin}
            className="auth-link"
            style={{
              color: "#16a34a",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Login di sini
          </button>
        </div>
      </div>
    </div>
  );
}
