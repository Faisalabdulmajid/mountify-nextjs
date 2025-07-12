"use client";

import AdminSidebar from "../../../components/admin/AdminSidebar";
import Link from "next/link";

import { useState, useEffect, useMemo } from "react";

export default function KelolaGunungPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jalurFilter, setJalurFilter] = useState("Semua");
  const [filterKetinggian, setFilterKetinggian] = useState({
    min: "",
    max: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "nama_gunung",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [gunungList, setGunungList] = useState([]);
  useEffect(() => {
    // Dummy data, replace with fetch if needed
    setGunungList([]);
  }, []);
  const sortedAndFilteredGunung = useMemo(() => {
    let sortableItems = [...gunungList];
    if (jalurFilter === "Punya Jalur")
      sortableItems = sortableItems.filter((g) => g.jumlah_jalur > 0);
    else if (jalurFilter === "Belum Ada Jalur")
      sortableItems = sortableItems.filter((g) => g.jumlah_jalur === 0);
    if (filterKetinggian.min || filterKetinggian.max) {
      const min = filterKetinggian.min ? parseInt(filterKetinggian.min, 10) : 0;
      const max = filterKetinggian.max
        ? parseInt(filterKetinggian.max, 10)
        : Infinity;
      sortableItems = sortableItems.filter(
        (g) =>
          g.ketinggian_puncak_mdpl >= min && g.ketinggian_puncak_mdpl <= max
      );
    }
    if (searchTerm) {
      sortableItems = sortableItems.filter(
        (g) =>
          g.nama_gunung?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (g.lokasi_administratif &&
            g.lokasi_administratif
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "ascending" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [gunungList, searchTerm, sortConfig, jalurFilter, filterKetinggian]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredGunung.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedAndFilteredGunung.length / itemsPerPage);
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-green-700 tracking-tight drop-shadow">
              Manajemen Data Gunung
            </h1>
            <Link
              href="/admin/gunung/tambah"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
            >
              <i className="bi bi-plus-lg"></i> Tambah Gunung
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Cari gunung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
            <select
              value={jalurFilter}
              onChange={(e) => setJalurFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            >
              <option value="Semua">Semua Jalur</option>
              <option value="Punya Jalur">Punya Jalur</option>
              <option value="Belum Ada Jalur">Belum Ada Jalur</option>
            </select>
            <div className="flex gap-2 w-full md:w-1/3">
              <input
                type="number"
                placeholder="Min Ketinggian"
                value={filterKetinggian.min}
                onChange={(e) =>
                  setFilterKetinggian((prev) => ({
                    ...prev,
                    min: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
              <input
                type="number"
                placeholder="Max Ketinggian"
                value={filterKetinggian.max}
                onChange={(e) =>
                  setFilterKetinggian((prev) => ({
                    ...prev,
                    max: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-white">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-base">
                  <th className="px-5 py-3">No</th>
                  <th
                    className="px-5 py-3 cursor-pointer select-none hover:text-green-700"
                    onClick={() =>
                      setSortConfig({
                        key: "nama_gunung",
                        direction:
                          sortConfig.direction === "ascending"
                            ? "descending"
                            : "ascending",
                      })
                    }
                  >
                    Nama Gunung
                  </th>
                  <th
                    className="px-5 py-3 cursor-pointer select-none hover:text-green-700"
                    onClick={() =>
                      setSortConfig({
                        key: "lokasi_administratif",
                        direction:
                          sortConfig.direction === "ascending"
                            ? "descending"
                            : "ascending",
                      })
                    }
                  >
                    Lokasi
                  </th>
                  <th
                    className="px-5 py-3 cursor-pointer select-none hover:text-green-700"
                    onClick={() =>
                      setSortConfig({
                        key: "ketinggian_puncak_mdpl",
                        direction:
                          sortConfig.direction === "ascending"
                            ? "descending"
                            : "ascending",
                      })
                    }
                  >
                    Ketinggian
                  </th>
                  <th
                    className="px-5 py-3 cursor-pointer select-none hover:text-green-700"
                    onClick={() =>
                      setSortConfig({
                        key: "jumlah_jalur",
                        direction:
                          sortConfig.direction === "ascending"
                            ? "descending"
                            : "ascending",
                      })
                    }
                  >
                    Jalur
                  </th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((gunung, idx) => (
                    <tr
                      key={gunung.id_gunung}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-3 font-semibold text-gray-700">
                        {indexOfFirstItem + idx + 1}
                      </td>
                      <td className="px-5 py-3 font-semibold text-green-700">
                        {gunung.nama_gunung}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {gunung.lokasi_administratif || "-"}
                      </td>
                      <td className="px-5 py-3">
                        {gunung.ketinggian_puncak_mdpl} MDPL
                      </td>
                      <td className="px-5 py-3">
                        {gunung.jumlah_jalur ?? "-"}
                      </td>
                      <td className="px-5 py-3 flex gap-2">
                        <Link
                          href={`/admin/gunung/edit/${gunung.id_gunung}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition"
                        >
                          <i className="bi bi-pencil-fill mr-1"></i>Edit
                        </Link>
                        <Link
                          href={`/admin/jalur?gunungId=${gunung.id_gunung}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition"
                        >
                          <i className="bi bi-signpost-split-fill mr-1"></i>
                          Jalur
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-gray-400 text-lg"
                    >
                      Tidak ada data gunung yang cocok dengan filter.
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
              {sortedAndFilteredGunung.length} data
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
