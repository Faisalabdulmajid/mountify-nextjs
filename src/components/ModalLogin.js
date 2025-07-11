"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import "./AuthForms.css";

export default function ModalLogin({ open, onClose, onRegister, onForgot }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Ganti URL di bawah dengan endpoint backend Anda jika ingin login manual aktif
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");
      onClose();
    } catch (err) {
      setError(err.message);
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
          width: 480,
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
            marginBottom: 32,
          }}
        >
          Login Akun
        </h2>
        <form autoComplete="off" onSubmit={handleManualLogin}>
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
          <div className="auth-form-group">
            <label htmlFor="email_login">Email</label>
            <input
              type="email"
              id="email_login"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
              autoFocus
            />
          </div>
          <div className="auth-form-group" style={{ position: "relative" }}>
            <label htmlFor="password_login">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password_login"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              required
              style={{ paddingRight: 44 }} // Tambah ruang untuk icon mata
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 18,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                background: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                height: 22,
              }}
              title={showPassword ? "Sembunyikan Password" : "Lihat Password"}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34495e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: "block" }}
              >
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>
          <div className="auth-form-options">
            <button
              type="button"
              className="auth-link"
              style={{
                color: "#16a34a",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              onClick={onForgot}
            >
              Lupa Password?
            </button>
          </div>
          <button
            type="submit"
            className="auth-button"
            style={{ background: "#16a34a" }}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
        <div className="auth-divider" style={{ margin: "28px 0 18px 0" }}>
          ATAU
        </div>
        <button
          className="auth-google-button"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: "#fff",
            color: "#222",
            fontWeight: 600,
            fontSize: 18,
            borderRadius: 8,
            padding: "14px 0",
            border: "1.5px solid #e0e0e0",
            marginBottom: 8,
            boxShadow: "none",
            position: "relative",
          }}
          onClick={() => {
            setLoading(true);
            signIn("google");
          }}
          disabled={loading}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google logo"
            width={24}
            height={24}
            style={{ width: 24, height: 24 }}
            priority
          />
          Login dengan Google
        </button>
        <div
          className="auth-navigation-prompt"
          style={{ textAlign: "center", marginTop: 24 }}
        >
          Belum punya akun?{" "}
          <button
            type="button"
            className="auth-link"
            style={{
              color: "#16a34a",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            onClick={onRegister}
          >
            Daftar sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
