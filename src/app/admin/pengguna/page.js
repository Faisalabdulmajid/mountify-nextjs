"use client";
import { useState, useEffect, useMemo } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

export default function KelolaPenggunaPage() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Dummy data pengguna
    setIsLoading(true);
    setTimeout(() => {
      setUserList([
        {
          id: 1,
          nama: "Faisal Abdul Majid",
          email: "faisal@example.com",
          role: "Admin",
          status: "Aktif",
        },
        {
          id: 2,
          nama: "Budi Santoso",
          email: "budi@example.com",
          role: "User",
          status: "Aktif",
        },
        {
          id: 3,
          nama: "Siti Aminah",
          email: "siti@example.com",
          role: "User",
          status: "Tidak Aktif",
        },
        {
          id: 4,
          nama: "Admin Gunung",
          email: "admin@example.com",
          role: "Admin",
          status: "Aktif",
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredUser = useMemo(() => {
    let filtered = [...userList];
    if (roleFilter !== "Semua")
      filtered = filtered.filter((u) => u.role === roleFilter);
    if (statusFilter !== "Semua")
      filtered = filtered.filter((u) => u.status === statusFilter);
    if (searchTerm)
      filtered = filtered.filter(
        (u) =>
          u.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return filtered;
  }, [userList, roleFilter, statusFilter, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUser.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-400">Memuat data...</div>
    );

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow">
              Manajemen Pengguna
            </h1>
            <Link
              href="/admin/pengguna/tambah"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              <i className="bi bi-plus-lg"></i> Tambah Pengguna
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            >
              <option value="Semua">Semua Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-white">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-base">
                  <th className="px-5 py-3">No</th>
                  <th className="px-5 py-3">Nama</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((user, idx) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-3 font-semibold text-gray-700">
                        {indexOfFirstItem + idx + 1}
                      </td>
                      <td className="px-5 py-3 font-semibold text-blue-700">
                        {user.nama}
                      </td>
                      <td className="px-5 py-3 text-gray-500">{user.email}</td>
                      <td
                        className={`px-5 py-3 font-semibold rounded-lg border ${
                          user.role === "Admin"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                        }`}
                      >
                        {user.role}
                      </td>
                      <td
                        className={`px-5 py-3 font-semibold rounded-lg border ${
                          user.status === "Aktif"
                            ? "bg-blue-100 text-blue-700 border-blue-300"
                            : "bg-red-100 text-red-700 border-red-300"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="px-5 py-3 flex gap-2">
                        <Link
                          href={`/admin/pengguna/detail/${user.id}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-500 text-white text-sm font-semibold hover:bg-gray-600 transition"
                        >
                          <i className="bi bi-eye-fill mr-1"></i>Lihat
                        </Link>
                        <Link
                          href={`/admin/pengguna/edit/${user.id}`}
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
                      Tidak ada data pengguna yang cocok dengan filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
            <div className="text-sm text-gray-500">
              Menampilkan {indexOfFirstItem + 1} -{" "}
              {indexOfFirstItem + currentItems.length} dari{" "}
              {filteredUser.length} data
            </div>
            <div className="flex gap-2 items-center">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <span className="px-3 py-2 font-semibold text-gray-700">
                Halaman {currentPage} / {totalPages}
              </span>
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next
              </button>
            </div>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n} / halaman
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>
    </div>
  );
}
