"use client";
const menu = [
  {
    title: "Dashboard",
    icon: "bi bi-speedometer2",
    link: "/admin/dashboard",
  },
  {
    title: "Kelola Statistik",
    icon: "bi bi-bar-chart-fill",
    link: "/admin/statistik",
  },
  {
    title: "Kelola Gunung",
    icon: "bi bi-image-fill",
    link: "/admin/gunung",
  },
  {
    title: "Kelola Jalur",
    icon: "bi bi-signpost-split",
    link: "/admin/jalur",
  },
  {
    title: "Kelola POI",
    icon: "bi bi-geo-alt-fill",
    link: "/admin/poi",
  },
  {
    title: "Kelola Pengguna",
    icon: "bi bi-people-fill",
    link: "/admin/pengguna",
  },
  {
    title: "Pengumuman",
    icon: "bi bi-megaphone-fill",
    link: "/admin/announcements",
  },
  {
    title: "Laporan Error",
    icon: "bi bi-exclamation-triangle-fill",
    link: "/admin/laporan-error",
  },
];

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({
  user = { nama: "faisal abdul majid", role: "superadmin" },
}) {
  const pathname = usePathname();
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#142640] text-white flex flex-col z-50 shadow-lg">
      <div className="flex items-center gap-3 h-16 px-6 border-b border-white/10">
        <span className="text-2xl text-blue-400">
          <i className="bi bi-shield-fill"></i>
        </span>
        <span className="font-bold text-lg tracking-wide">Admin Mountify</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="flex flex-col gap-1">
          {menu.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition text-base font-medium ${
                  pathname === item.link
                    ? "bg-blue-700/80 text-white"
                    : "hover:bg-white/10 text-white"
                }`}
              >
                <i className={`${item.icon} text-lg min-w-[22px]`}></i>
                <span className="whitespace-nowrap">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-[#1b2b3c] px-6 py-5 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
            {user.nama?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold leading-tight">{user.nama}</div>
            <div className="text-xs text-gray-300">{user.role}</div>
          </div>
        </div>
        <Link
          href="/profil"
          className="block w-full mb-2 py-2 px-3 rounded bg-white/10 text-white text-sm font-medium text-center hover:bg-white/20 transition"
        >
          Profil Saya
        </Link>
        <button className="flex w-full py-2 px-3 rounded bg-white/10 text-white text-sm font-medium text-center hover:bg-red-600/80 transition items-center justify-center gap-2">
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </aside>
  );
}
