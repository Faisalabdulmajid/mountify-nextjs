"use client";
import { useState } from "react";
import "./AuthForms.css";

export default function ModalRegister({ open, onClose, onLogin }) {
  const [form, setForm] = useState({
    nama_lengkap: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...userDataToSubmit } = form;
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDataToSubmit),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registrasi gagal.");
      setSuccess("Registrasi berhasil! Silakan login.");
      setTimeout(() => onClose(), 2000);
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
          Daftar Akun Baru
        </h2>
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
          {success && (
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
              {success}
            </div>
          )}
          <div className="auth-form-group">
            <label htmlFor="nama_lengkap">Nama Lengkap</label>
            <input
              type="text"
              name="nama_lengkap"
              id="nama_lengkap"
              className="auth-input"
              value={form.nama_lengkap}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="auth-input"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Masukkan username"
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="email_reg">Email</label>
            <input
              type="email"
              name="email"
              id="email_reg"
              className="auth-input"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Masukkan email Anda"
            />
          </div>
          <div className="auth-form-group" style={{ position: "relative" }}>
            <label htmlFor="password_reg">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password_reg"
              className="auth-input"
              value={form.password}
              onChange={handleChange}
              required
              style={{ paddingRight: 44 }}
              placeholder="Masukkan password"
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
          <div className="auth-form-group" style={{ position: "relative" }}>
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className="auth-input"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              style={{ paddingRight: 44 }}
              placeholder="Ulangi password"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
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
              title={
                showConfirmPassword ? "Sembunyikan Password" : "Lihat Password"
              }
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
          <button
            type="submit"
            className="auth-button"
            style={{ background: "#16a34a" }}
            disabled={loading}
          >
            {loading ? "Mendaftar..." : "Buat Akun"}
          </button>
        </form>
        <div
          className="auth-navigation-prompt"
          style={{ textAlign: "center", marginTop: 24 }}
        >
          Sudah punya akun?{" "}
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
