"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { useState } from "react";
import TipTapEditor from "@/components/common/TipTapEditor";

export default function TambahPengumumanPage() {
  const [formData, setFormData] = useState({
    judul: "",
    isi_pengumuman: "",
    status: "Draft",
    berlaku_mulai: "",
    berlaku_sampai: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleKontenChange = (newContent) => {
    setFormData((prev) => ({ ...prev, isi_pengumuman: newContent }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Pengumuman berhasil disimpan (dummy)");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-screen-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-green-700 tracking-tight drop-shadow">
              Tambah Pengumuman
            </h1>
            <Link
              href="/admin/announcements"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-200 font-semibold shadow hover:bg-gray-200 transition"
            >
              <i className="bi bi-arrow-left"></i> Kembali
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label
                htmlFor="judul"
                className="block font-semibold text-gray-700"
              >
                Judul Pengumuman
              </label>
              <input
                type="text"
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 text-lg"
                placeholder="cth: Penutupan Jalur Cemoro Sewu"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="isi_pengumuman"
                className="block font-semibold text-gray-700"
              >
                Isi Pengumuman
              </label>
              <TipTapEditor
                content={formData.isi_pengumuman}
                onContentChange={handleKontenChange}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="status"
                className="block font-semibold text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 text-lg"
              >
                <option value="Draft">Draft (Simpan sebagai draf)</option>
                <option value="Published">Published (Publikasikan)</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="berlaku_mulai"
                  className="block font-semibold text-gray-700"
                >
                  Berlaku Mulai
                </label>
                <input
                  type="date"
                  id="berlaku_mulai"
                  name="berlaku_mulai"
                  value={formData.berlaku_mulai}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 text-lg"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="berlaku_sampai"
                  className="block font-semibold text-gray-700"
                >
                  Berlaku Sampai
                </label>
                <input
                  type="date"
                  id="berlaku_sampai"
                  name="berlaku_sampai"
                  value={formData.berlaku_sampai}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 text-lg"
                />
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-10">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-bold shadow hover:bg-green-700 transition text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Menyimpan..." : "Simpan Pengumuman"}
              </button>
              <Link
                href="/admin/announcements"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold shadow hover:bg-gray-300 transition text-lg"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
