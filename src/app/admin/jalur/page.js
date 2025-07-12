"use client";
import { useState, useEffect, useMemo } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function KelolaJalurPage() {
  const [jalurList, setJalurList] = useState([]);
  const [allGunungList, setAllGunungList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [gunungFilter, setGunungFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [difficultyFilter, setDifficultyFilter] = useState("Semua");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Dummy data gunung dan jalur
    setIsLoading(true);
    setTimeout(() => {
      setAllGunungList([
        { id_gunung: 1, nama_gunung: "Gunung Merbabu" },
        { id_gunung: 2, nama_gunung: "Gunung Sindoro" },
        { id_gunung: 3, nama_gunung: "Gunung Slamet" },
      ]);
      setJalurList([
        {
          id_jalur: 1,
          nama_jalur: "Jalur Selo",
          id_gunung: 1,
          status_jalur: "Aktif",
          kesulitan_skala: 5,
        },
        {
          id_jalur: 2,
          nama_jalur: "Jalur Wekas",
          id_gunung: 1,
          status_jalur: "Tidak Aktif",
          kesulitan_skala: 3,
        },
        {
          id_jalur: 3,
          nama_jalur: "Jalur Bambangan",
          id_gunung: 3,
          status_jalur: "Aktif",
          kesulitan_skala: 8,
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  // Fungsi hapus data jalur dari state
  const handleDeleteJalur = (id_jalur) => {
    if (window.confirm("Yakin ingin menghapus data jalur ini?")) {
      setJalurList((prev) => prev.filter((j) => j.id_jalur !== id_jalur));
    }
  };

  const getKesulitanText = (skala) => {
    if (skala === null || skala === undefined) return "N/A";
    if (skala <= 3) return "Mudah";
    if (skala <= 7) return "Menengah";
    if (skala <= 10) return "Sulit";
    return "N/A";
  };

  const getStatusColor = (status) => {
    if (status === "Aktif")
      return "bg-green-100 text-green-700 border-green-300";
    if (status === "Tidak Aktif")
      return "bg-red-100 text-red-700 border-red-300";
    return "bg-gray-100 text-gray-600 border-gray-300";
  };

  const getKesulitanColor = (kesulitan) => {
    if (kesulitan === "Mudah")
      return "bg-blue-100 text-blue-700 border-blue-300";
    if (kesulitan === "Menengah")
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    if (kesulitan === "Sulit") return "bg-red-100 text-red-700 border-red-300";
    return "bg-gray-100 text-gray-600 border-gray-300";
  };

  const filteredJalur = useMemo(() => {
    return jalurList.filter((jalur) => {
      const matchesSearchTerm = jalur.nama_jalur
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGunungFilter =
        gunungFilter === "Semua" || jalur.id_gunung === gunungFilter;
      const matchesStatusFilter =
        statusFilter === "Semua" || jalur.status_jalur === statusFilter;
      const matchesDifficultyFilter =
        difficultyFilter === "Semua" ||
        getKesulitanText(jalur.kesulitan_skala) === difficultyFilter;
      return (
        matchesSearchTerm &&
        matchesGunungFilter &&
        matchesStatusFilter &&
        matchesDifficultyFilter
      );
    });
  }, [jalurList, searchTerm, gunungFilter, statusFilter, difficultyFilter]);

  const sortedJalur = useMemo(() => {
    let sortableItems = [...filteredJalur];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredJalur, sortConfig]);

  const totalPages = Math.ceil(sortedJalur.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedJalur.slice(
    indexOfFirstItem,
    indexOfFirstItem + itemsPerPage
  );

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-400">Memuat data...</div>
    );
  if (error)
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
            <PageHeader
              title="Manajemen Data Jalur Pendakian"
              buttonText="Tambah Jalur"
              buttonHref="/admin/jalur/tambah"
              buttonColor="green"
            />
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Cari jalur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
              <select
                value={gunungFilter}
                onChange={(e) => setGunungFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              >
                <option value="Semua">Semua Gunung</option>
                {allGunungList.map((g) => (
                  <option key={g.id_gunung} value={g.id_gunung}>
                    {g.nama_gunung}
                  </option>
                ))}
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
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              >
                <option value="Semua">Semua Tingkat Kesulitan</option>
                <option value="Mudah">Mudah</option>
                <option value="Menengah">Menengah</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-white">
              <DataTable
                columns={[
                  {
                    key: "no",
                    title: "No",
                    render: (row, idx) => indexOfFirstItem + idx + 1,
                    thClass: "px-5 py-3",
                    tdClass: "px-5 py-3 font-semibold text-gray-700",
                  },
                  {
                    key: "nama_jalur",
                    title: "Nama Jalur",
                    render: (row) => (
                      <span className="font-semibold text-green-700">
                        {row.nama_jalur}
                      </span>
                    ),
                    thClass:
                      "px-5 py-3 cursor-pointer select-none hover:text-green-700",
                    tdClass: "px-5 py-3 font-semibold text-green-700",
                  },
                  {
                    key: "gunung",
                    title: "Gunung",
                    render: (row) => (
                      <span className="text-gray-500">
                        {allGunungList.find(
                          (g) => g.id_gunung === row.id_gunung
                        )?.nama_gunung || "-"}
                      </span>
                    ),
                  },
                  {
                    key: "status_jalur",
                    title: "Status",
                    render: (row) => (
                      <span
                        className={`font-semibold rounded-lg border ${getStatusColor(
                          row.status_jalur
                        )}`}
                      >
                        {row.status_jalur}
                      </span>
                    ),
                  },
                  {
                    key: "kesulitan_skala",
                    title: "Kesulitan",
                    render: (row) => (
                      <span
                        className={`font-semibold rounded-lg border ${getKesulitanColor(
                          getKesulitanText(row.kesulitan_skala)
                        )}`}
                      >
                        {getKesulitanText(row.kesulitan_skala)}
                      </span>
                    ),
                  },
                ]}
                data={currentItems}
                actions={[
                  (row) => (
                    <Link
                      href={`/admin/jalur/detail/${row.id_jalur}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-500 text-white text-sm font-semibold hover:bg-gray-600 transition"
                    >
                      <i className="bi bi-eye-fill mr-1"></i>Lihat
                    </Link>
                  ),
                  (row) => (
                    <Link
                      href={`/admin/jalur/edit/${row.id_jalur}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition"
                    >
                      <i className="bi bi-pencil-fill mr-1"></i>Edit
                    </Link>
                  ),
                  (row) => (
                    <button
                      onClick={() => handleDeleteJalur(row.id_jalur)}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                    >
                      <i className="bi bi-trash-fill mr-1"></i>Hapus
                    </button>
                  ),
                ]}
                emptyText="Tidak ada data jalur yang cocok dengan filter."
                rowKey="id_jalur"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
              <div className="text-sm text-gray-500">
                Menampilkan {indexOfFirstItem + 1} -{" "}
                {indexOfFirstItem + currentItems.length} dari{" "}
                {filteredJalur.length} data
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
    </>
  );
}
