"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

// Dummy fetch function (replace with real API call)
const fetchReport = async (id) => {
  return {
    id,
    judul: "Gagal Upload Foto Jalur",
    pelapor: "user1",
    tanggal: "2025-07-10",
    status: "Belum Diproses",
    deskripsi: "Saat upload foto jalur, muncul error 500.",
    detail:
      "Stacktrace: Error 500 at /api/upload. Browser: Chrome 125.0.0.1. OS: Windows 11.",
  };
};

export default function DetailLaporanErrorPage({ params }) {
  const { id } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchReport(id).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="ml-64 p-10">Memuat...</div>;
  if (!data) return <div className="ml-64 p-10">Laporan tidak ditemukan.</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-screen-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-red-700 tracking-tight drop-shadow">
              Detail Laporan Error
            </h1>
            <Link
              href="/admin/laporan-error"
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">Pelapor</div>
                <div className="font-semibold">{data.pelapor}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Tanggal</div>
                <div>{data.tanggal}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Status</div>
                <div className="font-semibold text-red-700">{data.status}</div>
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Deskripsi</div>
              <div className="prose max-w-none">{data.deskripsi}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Detail Teknis</div>
              <div className="prose max-w-none text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-wrap">
                {data.detail}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
