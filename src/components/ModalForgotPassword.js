"use client";
import { useState } from "react";

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2c3e50]/20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 relative mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 font-bold focus:outline-none"
          aria-label="Tutup"
        >
          ×
        </button>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-amber-900 mb-3">
          Lupa Password
        </h2>
        <p className="text-center mb-6 text-gray-600 text-sm">
          Masukkan email Anda, kami akan mengirimkan link untuk mereset
          password.
        </p>
        <form onSubmit={handleSubmit} autoComplete="off">
          {error && (
            <div className="text-red-600 bg-red-50 rounded px-3 py-2 mb-3 text-center font-semibold">
              {error}
            </div>
          )}
          {message && (
            <div className="text-green-700 bg-green-50 rounded px-3 py-2 mb-3 text-center font-semibold">
              {message}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email_forgot"
              className="block font-semibold mb-2 text-gray-700"
            >
              Alamat Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email_forgot"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-black focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition pr-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email terdaftar Anda"
                required
              />
              {/*
              <span
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34495e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
              </span>
              */}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold text-base hover:bg-green-700 transition mt-2"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </form>
        <div className="text-center mt-6 text-sm">
          <button
            type="button"
            onClick={onLogin}
            className="w-full mt-2 py-2 rounded-lg bg-white text-green-700 font-bold border border-green-600 hover:bg-green-50 transition focus:outline-none"
          >
            Login di sini
          </button>
          <div className="text-gray-500 text-xs mt-2">Ingat password?</div>
        </div>
      </div>
    </div>
  );
}
