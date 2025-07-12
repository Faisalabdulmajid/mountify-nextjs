"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";

const stats = [
  {
    label: "Total Pendaki",
    value: 1200,
    icon: "bi-person-fill",
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Total Kontributor Ahli",
    value: 35,
    icon: "bi-person-badge-fill",
    color: "text-purple-600 bg-purple-100",
  },
  {
    label: "Total Administrator",
    value: 5,
    icon: "bi-person-gear",
    color: "text-orange-600 bg-orange-100",
  },
  {
    label: "Pengguna Aktif (30 hari)",
    value: 400,
    icon: "bi-person-check-fill",
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    label: "Pengguna Baru (bulan ini)",
    value: 50,
    icon: "bi-person-plus-fill",
    color: "text-cyan-600 bg-cyan-100",
  },
  {
    label: "Pengguna Login Hari Ini",
    value: 80,
    icon: "bi-person-lines-fill",
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    label: "Total Gunung",
    value: 45,
    icon: "bi-image-fill",
    color: "text-green-600 bg-green-100",
  },
  {
    label: "Gunung Trending",
    value: 3,
    icon: "bi-graph-up-arrow",
    color: "text-orange-600 bg-orange-100",
  },
  {
    label: "Total Jalur",
    value: 120,
    icon: "bi-signpost-split",
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    label: "Total POI",
    value: 300,
    icon: "bi-geo-alt-fill",
    color: "text-fuchsia-600 bg-fuchsia-100",
  },
  {
    label: "Request Rekomendasi",
    value: 200,
    icon: "bi-lightbulb-fill",
    color: "text-teal-600 bg-teal-100",
  },
  {
    label: "Pengumuman Aktif",
    value: 4,
    icon: "bi-megaphone-fill",
    color: "text-sky-600 bg-sky-100",
  },
  {
    label: "Laporan Error Belum Ditangani",
    value: 2,
    icon: "bi-bug-fill",
    color: "text-pink-600 bg-pink-100",
  },
  {
    label: "Laporan Masuk",
    value: 15,
    icon: "bi-exclamation-triangle-fill",
    color: "text-red-600 bg-red-100",
  },
  {
    label: "Kontribusi Data oleh Kontributor Ahli",
    value: 120,
    icon: "bi-database-fill-add",
    color: "text-purple-700 bg-purple-100",
  },
  {
    label: "Artikel/Guide oleh Kontributor Ahli",
    value: 40,
    icon: "bi-journal-richtext",
    color: "text-cyan-700 bg-cyan-100",
  },
  {
    label: "Pengajuan Data Menunggu Review",
    value: 7,
    icon: "bi-hourglass-split",
    color: "text-yellow-700 bg-yellow-100",
  },
  {
    label: "Aksi Review/Approval Admin",
    value: 25,
    icon: "bi-check2-square",
    color: "text-orange-700 bg-orange-100",
  },
];

export default function KelolaStatistikPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-green-700 tracking-tight drop-shadow mb-2">
            Kelola Statistik
          </h1>
          <p className="text-gray-500 mb-8">
            Lihat dan analisis statistik utama sistem rekomendasi gunung.
          </p>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl shadow-lg p-7 flex items-center gap-5 border border-gray-100 hover:shadow-xl transition"
              >
                <div
                  className={`rounded-full w-14 h-14 flex items-center justify-center text-3xl ${s.color} shadow-inner`}
                >
                  <i className={`bi ${s.icon}`}></i>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-800">
                    {s.value}
                  </div>
                  <div className="text-gray-500 text-base font-medium mt-1">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
