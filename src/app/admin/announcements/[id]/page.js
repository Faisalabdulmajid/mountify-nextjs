"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

// Dummy fetch function (replace with real API call)
const fetchAnnouncement = async (id) => {
  // Simulasi data
  return {
    id,
    judul: "Penutupan Jalur Cemoro Sewu",
    isi_pengumuman:
      "<p>Jalur Cemoro Sewu ditutup sementara karena perbaikan jalur.</p>",
    status: "Published",
    berlaku_mulai: "2025-07-10",
    berlaku_sampai: "2025-08-01",
    penulis: "Admin Gunung",
    tanggal_dibuat: "2025-07-09",
  };
};

export default function DetailPengumumanPage({ params }) {
  const { id } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncement(id).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="ml-64 p-10">Memuat...</div>;
  if (!data)
    return <div className="ml-64 p-10">Pengumuman tidak ditemukan.</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-screen-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-green-700 tracking-tight drop-shadow">
              Detail Pengumuman
            </h1>
            <Link
              href="/admin/announcements"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-200 font-semibold shadow hover:bg-gray-200 transition"
            >
              <i className="bi bi-arrow-left"></i> Kembali
            </Link>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-gray-500 text-sm mb-1">Judul</div>
              <div className="text-xl font-bold text-gray-800">
                {data.judul}
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Isi Pengumuman</div>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.isi_pengumuman }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">Status</div>
                <div className="font-semibold text-green-700">
                  {data.status}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Penulis</div>
                <div className="font-semibold">{data.penulis}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Berlaku Mulai</div>
                <div>{data.berlaku_mulai}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Berlaku Sampai</div>
                <div>{data.berlaku_sampai}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Tanggal Dibuat</div>
                <div>{data.tanggal_dibuat}</div>
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-8">
              <Link
                href={`/admin/announcements/${id}/edit`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600 transition text-lg"
              >
                <i className="bi bi-pencil"></i> Edit Pengumuman
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
