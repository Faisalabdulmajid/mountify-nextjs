"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

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
          Login Akun
        </h2>
        <form autoComplete="off" onSubmit={handleManualLogin}>
          {error && (
            <div className="text-red-600 bg-red-50 rounded px-3 py-2 mb-3 text-center font-semibold">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email_login"
              className="block font-semibold mb-2 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email_login"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-black focus:ring-2 focus:ring-green-200 focus:border-green-500 transition font-medium placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
              autoFocus
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password_login"
              className="block font-semibold mb-2 text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password_login"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-black focus:ring-2 focus:ring-green-200 focus:border-green-500 transition font-medium placeholder-gray-400 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
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
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              className="text-green-700 font-semibold hover:underline focus:outline-none text-sm"
              onClick={onForgot}
            >
              Lupa Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-lg bg-green-600 text-white font-bold text-base hover:bg-green-700 transition shadow-none"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
        <div className="text-center my-7 text-gray-400 font-semibold">ATAU</div>
        <button
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold text-base rounded-lg py-3 border border-gray-300 mb-2 shadow-sm relative transition duration-150 hover:bg-green-50 hover:text-green-700 hover:border-green-500 hover:shadow-md focus:outline-none"
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
            className="w-6 h-6"
            priority
          />
          Login dengan Google
        </button>
        <div className="text-center mt-6 text-sm">
          <button
            type="button"
            className="w-full mt-2 py-2 rounded-lg bg-white text-green-700 font-bold border border-green-600 hover:bg-green-50 transition focus:outline-none"
            onClick={onRegister}
          >
            Daftar sekarang
          </button>
          <div className="text-gray-500 text-xs mt-2">Belum punya akun?</div>
        </div>
      </div>
    </div>
  );
}
