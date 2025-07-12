"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

const dummyPengumuman = [
  {
    id: 1,
    judul: "Perubahan Jadwal Pendakian",
    isi: "Mulai 1 Agustus, jadwal pendakian Gunung Merbabu berubah menjadi setiap hari Senin dan Kamis.",
    status: "Aktif",
    tanggal: "2025-07-10",
  },
  {
    id: 2,
    judul: "Penutupan Jalur Selo",
    isi: "Jalur Selo ditutup sementara karena perbaikan fasilitas pos. Info lebih lanjut menyusul.",
    status: "Tidak Aktif",
    tanggal: "2025-07-05",
  },
];

export default function KelolaPengumumanPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow">
              Kelola Pengumuman
            </h1>
            <Link
              href="/admin/pengumuman/tambah"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              <i className="bi bi-plus-lg"></i> Tambah Pengumuman
            </Link>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-white">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-base">
                  <th className="px-5 py-3">No</th>
                  <th className="px-5 py-3">Judul</th>
                  <th className="px-5 py-3">Isi</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Tanggal</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dummyPengumuman.length > 0 ? (
                  dummyPengumuman.map((p, idx) => (
                    <tr
                      key={p.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-3 font-semibold text-gray-700">
                        {idx + 1}
                      </td>
                      <td className="px-5 py-3 font-semibold text-blue-700">
                        {p.judul}
                      </td>
                      <td className="px-5 py-3 text-gray-500">{p.isi}</td>
                      <td
                        className={`px-5 py-3 font-semibold rounded-lg border ${
                          p.status === "Aktif"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-red-100 text-red-700 border-red-300"
                        }`}
                      >
                        {p.status}
                      </td>
                      <td className="px-5 py-3 text-gray-500">{p.tanggal}</td>
                      <td className="px-5 py-3 flex gap-2">
                        <Link
                          href={`/admin/pengumuman/edit/${p.id}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition"
                        >
                          <i className="bi bi-pencil-fill mr-1"></i>Edit
                        </Link>
                        <button className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">
                          <i className="bi bi-trash-fill mr-1"></i>Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-gray-400 text-lg"
                    >
                      Tidak ada pengumuman.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
