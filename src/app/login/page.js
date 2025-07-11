import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    // Jika sudah login, redirect ke halaman utama
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => signIn("google")}
        >
          Login dengan Google
        </button>
      </div>
    </div>
  );
}
