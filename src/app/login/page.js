"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../components/AuthForms.css";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <div
      className="auth-form-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6f7f9",
      }}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 2px 16px rgba(44,62,80,0.08)",
          padding: 36,
          margin: 24,
          position: "relative",
        }}
      >
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
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
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
              disabled
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password_login">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password_login"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              required
              disabled
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                cursor: "pointer",
                marginLeft: "-30px",
                position: "relative",
                zIndex: 2,
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
              >
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>
          <div className="auth-form-options">
            <span
              className="auth-link"
              style={{
                color: "#16a34a",
                cursor: "not-allowed",
                opacity: 0.7,
              }}
            >
              Lupa Password?
            </span>
          </div>
          <button
            type="submit"
            className="auth-button"
            style={{ background: "#16a34a" }}
            disabled
          >
            Login
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
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google logo"
            style={{ width: 24, height: 24 }}
          />
          Login dengan Google
          <span
            style={{
              color: "#e67e22",
              fontSize: "0.95em",
              marginLeft: 8,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
            title="Fitur dalam pengembangan"
          >
            (Beta)
            <svg
              style={{ marginLeft: 2, verticalAlign: "middle" }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e67e22"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="8" />
            </svg>
          </span>
        </button>
        <div
          className="auth-navigation-prompt"
          style={{ textAlign: "center", marginTop: 24 }}
        >
          Belum punya akun?{" "}
          <a
            href="/register"
            className="auth-link"
            style={{
              color: "#16a34a",
              fontWeight: 600,
            }}
          >
            Daftar sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
