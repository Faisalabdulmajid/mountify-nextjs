"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

const ROLE_OPTIONS = ["Pendaki", "Kontributor Ahli", "Administrator"];
const STATUS_OPTIONS = ["Aktif", "Tidak Aktif"];

export default function TambahPenggunaPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    role: "Pendaki", // Default sesuai role register
    status: "Aktif",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Gagal menambah pengguna");
      alert("Pengguna berhasil ditambahkan!");
      setFormData({
        nama: "",
        email: "",
        role: "User",
        status: "Aktif",
        password: "",
      });
    } catch (err) {
      alert(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-2xl font-bold text-blue-700 mb-8">
            Tambah Pengguna Baru
          </h1>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block font-semibold mb-2">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
                placeholder="Nama pengguna"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
                placeholder="Email pengguna"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
                placeholder="Password pengguna"
              />
            </div>
            <div className="flex justify-end gap-3 pt-6">
              <Link
                href="/admin/pengguna"
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                disabled={isLoading}
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
