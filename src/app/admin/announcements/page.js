"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

import { useState, useMemo } from "react";

const dummyAnnouncements = [
  {
    id_pengumuman: 1,
    judul: "Perubahan Jadwal Pendakian",
    displayStatus: "Sedang Berlangsung",
    target: "Semua Pengguna",
    penulis: "Admin Gunung",
    berlaku_mulai: "2025-07-10",
    berlaku_sampai: "2025-08-01",
  },
  {
    id_pengumuman: 2,
    judul: "Penutupan Jalur Selo",
    displayStatus: "Kadaluarsa",
    target: "Pendaki",
    penulis: "Admin Jalur",
    berlaku_mulai: "2025-06-01",
    berlaku_sampai: "2025-07-01",
  },
];

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const filteredAnnouncements = useMemo(() => {
    let filtered = dummyAnnouncements;
    if (statusFilter !== "Semua") {
      filtered = filtered.filter((p) => p.displayStatus === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.penulis &&
            p.penulis.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return filtered;
  }, [searchTerm, statusFilter]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (!status) return "";
    if (status === "Sedang Berlangsung")
      return "bg-green-100 text-green-700 border-green-300";
    if (status === "Kadaluarsa")
      return "bg-red-100 text-red-700 border-red-300";
    if (status === "Draft") return "bg-gray-100 text-gray-600 border-gray-300";
    if (status === "Dijadwalkan")
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-gray-100 text-gray-600 border-gray-300";
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow">
              Manajemen Pengumuman
            </h1>
            <Link
              href="/admin/announcements/tambah"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              <i className="bi bi-plus-lg"></i> Buat Pengumuman Baru
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <i className="bi bi-search text-lg text-gray-400"></i>
              <input
                type="text"
                placeholder="Cari judul atau penulis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="w-full md:w-1/4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              >
                <option value="Semua">Semua Status</option>
                <option value="Draft">Draft</option>
                <option value="Dijadwalkan">Dijadwalkan</option>
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Kadaluarsa">Kadaluarsa</option>
              </select>
            </div>
          </div>
          <div className="rounded-2xl shadow-xl border border-gray-100 bg-white">
            <table className="min-w-[1100px] w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-base">
                  <th className="px-6 py-3 w-1/4">Judul Pengumuman</th>
                  <th className="px-6 py-3 w-1/6">Status</th>
                  <th className="px-6 py-3 w-1/6">Penulis</th>
                  <th className="px-6 py-3 w-1/5">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((item) => (
                    <tr
                      key={item.id_pengumuman}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="font-semibold text-blue-700">
                        {item.judul}
                      </td>
                      <td>
                        <span
                          className={`font-semibold rounded-lg border px-3 py-1 ${getStatusClass(
                            item.displayStatus
                          )}`}
                        >
                          {item.displayStatus}
                        </span>
                      </td>
                      <td>{item.penulis || "N/A"}</td>
                      <td className="flex gap-2 py-2">
                        <Link
                          href={`/admin/announcements/${item.id_pengumuman}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-500 text-white text-sm font-semibold hover:bg-gray-600 transition"
                        >
                          <i className="bi bi-eye-fill mr-1"></i>Lihat
                        </Link>
                        <Link
                          href={`/admin/announcements/edit/${item.id_pengumuman}`}
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
                      colSpan={4}
                      className="text-center py-10 text-gray-400 text-lg"
                    >
                      Belum ada pengumuman.
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
