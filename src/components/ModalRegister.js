"use client";
import { useState } from "react";
import Image from "next/image";

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
        <h2 className="text-center text-2xl md:text-3xl font-bold text-amber-900 mb-8">
          Daftar Akun Baru
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          {error && (
            <div className="text-red-600 bg-red-50 rounded px-3 py-2 mb-3 text-center font-semibold">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-700 bg-green-50 rounded px-3 py-2 mb-3 text-center font-semibold">
              {success}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="rolelevel"
              className="block font-semibold mb-2 text-gray-700"
            >
              Tingkat Peran Pengguna
            </label>
            <select
              name="rolelevel"
              id="rolelevel"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-black focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
              value={form.rolelevel || "pendaki"}
              onChange={handleChange}
              required
            >
              <option value="pendaki">Pendaki</option>
              <option value="kontributor">Kontributor Ahli</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="nama_lengkap"
              className="block font-semibold mb-2 text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama_lengkap"
              id="nama_lengkap"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-black focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
              value={form.nama_lengkap}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-semibold mb-2 text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-black focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Masukkan username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email_reg"
              className="block font-semibold mb-2 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email_reg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-black focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Masukkan email Anda"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password_reg"
              className="block font-semibold mb-2 text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password_reg"
                className="w-full border border-gray-300 rounded-lg px-4 py-4 leading-none text-base text-black focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition pr-12"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Masukkan password"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center cursor-pointer text-gray-500 transition-colors duration-200 p-0"
                title={showPassword ? "Sembunyikan Password" : "Lihat Password"}
              >
                {showPassword ? (
                  <Image
                    src="/show.svg"
                    alt="show"
                    width={20}
                    height={20}
                    className="block align-middle pointer-events-none h-5 w-5"
                    priority
                  />
                ) : (
                  <Image
                    src="/hide.svg"
                    alt="hide"
                    width={20}
                    height={20}
                    className="block align-middle pointer-events-none h-5 w-5"
                    priority
                  />
                )}
              </span>
            </div>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block font-semibold mb-2 text-gray-700"
            >
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className="w-full border border-gray-300 rounded-lg px-4 py-4 leading-none text-base text-black focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition pr-12"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Ulangi password"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center cursor-pointer text-gray-500 transition-colors duration-200 p-0"
                title={
                  showConfirmPassword
                    ? "Sembunyikan Password"
                    : "Lihat Password"
                }
              >
                {showConfirmPassword ? (
                  <Image
                    src="/show.svg"
                    alt="show"
                    width={20}
                    height={20}
                    className="block align-middle pointer-events-none h-5 w-5"
                    priority
                  />
                ) : (
                  <Image
                    src="/hide.svg"
                    alt="hide"
                    width={20}
                    height={20}
                    className="block align-middle pointer-events-none h-5 w-5"
                    priority
                  />
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold text-base hover:bg-green-700 transition mt-2"
            disabled={loading}
          >
            {loading ? "Mendaftar..." : "Buat Akun"}
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
          <div className="text-gray-500 text-xs mt-2">Sudah punya akun?</div>
        </div>
      </div>
    </div>
  );
}
