"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { useParams } from "next/navigation";

const TRAIL_STATUS_OPTIONS = ["Belum Diketahui", "Aktif", "Tidak Aktif"];

export default function EditJalurPage() {
  const { id_jalur } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [jalurData, setJalurData] = useState({
    id_gunung: "",
    nama_jalur: "",
    lokasi_pintu_masuk: "",
    status_jalur: "Belum Diketahui",
    estimasi_waktu_jam: "",
    kesulitan_skala: "",
    deskripsi_jalur: "",
  });
  const [allGunungList, setAllGunungList] = useState([]);

  useEffect(() => {
    // Dummy data gunung dan jalur
    setIsLoading(true);
    setTimeout(() => {
      setAllGunungList([
        { id_gunung: 1, nama_gunung: "Gunung Merbabu" },
        { id_gunung: 2, nama_gunung: "Gunung Sindoro" },
        { id_gunung: 3, nama_gunung: "Gunung Slamet" },
      ]);
      // Dummy data jalur
      setJalurData({
        id_gunung: 1,
        nama_jalur: "Jalur Selo",
        lokasi_pintu_masuk: "Desa Selo",
        status_jalur: "Aktif",
        estimasi_waktu_jam: 8,
        kesulitan_skala: 5,
        deskripsi_jalur: "Jalur favorit pendaki Merbabu.",
      });
      setIsLoading(false);
    }, 500);
  }, [id_jalur]);

  const handleChange = (e) => {
    setJalurData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      alert(
        "Data jalur berhasil diupdate!\n" + JSON.stringify(jalurData, null, 2)
      );
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-400">Memuat data...</div>
    );

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-2xl font-bold text-green-700 mb-8">
            Edit Jalur Pendakian
          </h1>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block font-semibold mb-2">Pilih Gunung</label>
              <select
                name="id_gunung"
                value={jalurData.id_gunung}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                <option value="" disabled>
                  -- Pilih Gunung --
                </option>
                {allGunungList.map((g) => (
                  <option key={g.id_gunung} value={g.id_gunung}>
                    {g.nama_gunung}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Nama Jalur</label>
              <input
                type="text"
                name="nama_jalur"
                value={jalurData.nama_jalur}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
                placeholder="Contoh: Jalur Selo"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Lokasi Pintu Masuk/Gerbang
              </label>
              <input
                type="text"
                name="lokasi_pintu_masuk"
                value={jalurData.lokasi_pintu_masuk}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Contoh: Desa Selo"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Status Jalur</label>
              <select
                name="status_jalur"
                value={jalurData.status_jalur}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                {TRAIL_STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Estimasi Waktu (Jam)
              </label>
              <input
                type="number"
                name="estimasi_waktu_jam"
                value={jalurData.estimasi_waktu_jam}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
                placeholder="Contoh: 8"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Kesulitan Skala
              </label>
              <input
                type="number"
                name="kesulitan_skala"
                value={jalurData.kesulitan_skala}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
                min={1}
                max={10}
                placeholder="1-10"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Deskripsi Jalur
              </label>
              <textarea
                name="deskripsi_jalur"
                value={jalurData.deskripsi_jalur}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                rows={4}
                placeholder="Deskripsi jalur..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-6">
              <Link
                href="/admin/jalur"
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                disabled={isLoading}
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
