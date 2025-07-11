"use client";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const stats = [
  // Breakdown per peran pengguna
  {
    label: "Total Pendaki",
    value: 0,
    icon: "bi-person-fill",
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Total Kontributor Ahli",
    value: 0,
    icon: "bi-person-badge-fill",
    color: "text-purple-600 bg-purple-100",
  },
  {
    label: "Total Administrator",
    value: 0,
    icon: "bi-person-gear",
    color: "text-orange-600 bg-orange-100",
  },
  // Statistik umum
  {
    label: "Pengguna Aktif (30 hari)",
    value: 0,
    icon: "bi-person-check-fill",
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    label: "Pengguna Baru (bulan ini)",
    value: 0,
    icon: "bi-person-plus-fill",
    color: "text-cyan-600 bg-cyan-100",
  },
  {
    label: "Pengguna Login Hari Ini",
    value: 0,
    icon: "bi-person-lines-fill",
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    label: "Total Gunung",
    value: 0,
    icon: "bi-image-fill",
    color: "text-green-600 bg-green-100",
  },
  {
    label: "Gunung Trending",
    value: 0,
    icon: "bi-graph-up-arrow",
    color: "text-orange-600 bg-orange-100",
  },
  {
    label: "Total Jalur",
    value: 0,
    icon: "bi-signpost-split",
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    label: "Total POI",
    value: 0,
    icon: "bi-geo-alt-fill",
    color: "text-fuchsia-600 bg-fuchsia-100",
  },
  {
    label: "Request Rekomendasi",
    value: 0,
    icon: "bi-lightbulb-fill",
    color: "text-teal-600 bg-teal-100",
  },
  {
    label: "Pengumuman Aktif",
    value: 0,
    icon: "bi-megaphone-fill",
    color: "text-sky-600 bg-sky-100",
  },
  {
    label: "Laporan Error Belum Ditangani",
    value: 0,
    icon: "bi-bug-fill",
    color: "text-pink-600 bg-pink-100",
  },
  {
    label: "Laporan Masuk",
    value: 0,
    icon: "bi-exclamation-triangle-fill",
    color: "text-red-600 bg-red-100",
  },
  // Statistik kontribusi per peran
  {
    label: "Kontribusi Data oleh Kontributor Ahli",
    value: 0,
    icon: "bi-database-fill-add",
    color: "text-purple-700 bg-purple-100",
  },
  {
    label: "Artikel/Guide oleh Kontributor Ahli",
    value: 0,
    icon: "bi-journal-richtext",
    color: "text-cyan-700 bg-cyan-100",
  },
  {
    label: "Pengajuan Data Menunggu Review",
    value: 0,
    icon: "bi-hourglass-split",
    color: "text-yellow-700 bg-yellow-100",
  },
  {
    label: "Aksi Review/Approval Admin",
    value: 0,
    icon: "bi-check2-square",
    color: "text-orange-700 bg-orange-100",
  },
];

const menu = [
  {
    title: "Kelola Gunung",
    icon: "bi bi-image-fill",
    desc: "Tambah, edit, atau hapus data gunung.",
    link: "/admin/gunung",
  },
  {
    title: "Kelola Jalur",
    icon: "bi bi-signpost-split",
    desc: "Kelola semua jalur pendakian.",
    link: "/admin/jalur",
  },
  {
    title: "Kelola POI",
    icon: "bi bi-geo-alt-fill",
    desc: "Kelola titik penting seperti pos, air, dsb.",
    link: "/admin/poi",
  },
  {
    title: "Kelola Pengguna",
    icon: "bi bi-people-fill",
    desc: "Kelola data dan status pengguna.",
    link: "/admin/users",
  },
  {
    title: "Pengumuman",
    icon: "bi bi-megaphone-fill",
    desc: "Kelola pengumuman penting.",
    link: "/admin/announcements",
  },
  {
    title: "Laporan Error",
    icon: "bi bi-exclamation-triangle-fill",
    desc: "Lihat dan tindak lanjuti laporan error.",
    link: "/admin/laporan-error",
  },
];

export default function AdminDashboardPage() {
  // Dummy logout handler
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-green-700 tracking-tight drop-shadow">Dashboard Admin</h1>
          <div className="flex gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 font-semibold shadow hover:bg-gray-100 transition"
            >
              <i className="bi bi-box-arrow-up-right"></i> Preview Website
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                <div className="text-3xl font-extrabold text-gray-800">{s.value}</div>
                <div className="text-gray-500 text-base font-medium mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-700 tracking-tight">Menu Manajemen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menu.map((m) => (
              <a
                key={m.title}
                href={m.link}
                className="bg-white rounded-2xl shadow-lg p-7 flex items-start gap-5 border border-gray-100 hover:shadow-xl transition group"
              >
                <div className="rounded-lg w-14 h-14 flex items-center justify-center text-3xl bg-gray-100 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 shadow">
                  <i className={m.icon}></i>
                </div>
                <div>
                  <div className="text-xl font-bold mb-2 text-gray-800">{m.title}</div>
                  <div className="text-gray-500 text-base">{m.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
