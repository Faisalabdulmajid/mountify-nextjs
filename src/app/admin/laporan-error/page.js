"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

const dummyReports = [
  {
    id: 1,
    judul: "Gagal Upload Foto Jalur",
    pelapor: "user1",
    tanggal: "2025-07-10",
    status: "Belum Diproses",
    deskripsi: "Saat upload foto jalur, muncul error 500.",
  },
  {
    id: 2,
    judul: "Data Gunung Tidak Muncul",
    pelapor: "user2",
    tanggal: "2025-07-09",
    status: "Diproses",
    deskripsi: "Halaman detail gunung kosong setelah update.",
  },
];

const statusColor = {
  "Belum Diproses": "bg-red-100 text-red-700",
  Diproses: "bg-yellow-100 text-yellow-700",
  Selesai: "bg-green-100 text-green-700",
};

export default function KelolaLaporanErrorPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 px-8 py-10">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-red-700 tracking-tight drop-shadow">
              Kelola Laporan Error
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-x-auto">
            <table className="min-w-full text-left text-gray-700">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-bold">Judul</th>
                  <th className="px-6 py-4 font-bold">Pelapor</th>
                  <th className="px-6 py-4 font-bold">Tanggal</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dummyReports.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="px-6 py-4 font-semibold">{r.judul}</td>
                    <td className="px-6 py-4">{r.pelapor}</td>
                    <td className="px-6 py-4">{r.tanggal}</td>
                    <td className="px-6 py-4">
                      <select
                        className={`px-3 py-1 rounded-full text-xs font-bold border focus:ring-2 focus:ring-green-300 focus:border-green-400 transition bg-white 
                          ${
                            r.status === "Belum Diproses"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : ""
                          }
                          ${
                            r.status === "Diproses"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : ""
                          }
                          ${
                            r.status === "Selesai"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : ""
                          }`}
                        defaultValue={r.status}
                        style={{ minWidth: 140 }}
                      >
                        <option
                          value="Belum Diproses"
                          className="bg-red-100 text-red-700"
                        >
                          Belum Diproses
                        </option>
                        <option
                          value="Diproses"
                          className="bg-yellow-100 text-yellow-700"
                        >
                          Diproses
                        </option>
                        <option
                          value="Selesai"
                          className="bg-green-100 text-green-700"
                        >
                          Selesai
                        </option>
                      </select>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="inline-flex items-center gap-1 px-4 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition text-sm">
                        <i className="bi bi-eye"></i> Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
