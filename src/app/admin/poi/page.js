"use client";
import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";

// Dummy POI data
const dummyPoi = [
  {
    id_titik: 1,
    nama_titik: "Pos 1",
    tipe_titik: "Pos",
    ketersediaan_air: true,
    nama_gunung: "Merapi",
    nama_jalur: "Selo",
    koordinat: "-7.54321, 110.12345",
  },
  {
    id_titik: 2,
    nama_titik: "Mata Air A",
    tipe_titik: "Mata Air",
    ketersediaan_air: true,
    nama_gunung: "Sindoro",
    nama_jalur: "Kledung",
    koordinat: "-7.12345, 110.54321",
  },
  {
    id_titik: 3,
    nama_titik: "Shelter 2",
    tipe_titik: "Shelter",
    ketersediaan_air: false,
    nama_gunung: "Sumbing",
    nama_jalur: "Garung",
    koordinat: "-7.67890, 110.67890",
  },
];

const tipeOptions = ["Semua", "Pos", "Mata Air", "Shelter"];
const sumberAirOptions = ["Semua", "Tersedia", "Tidak Ada"];

export default function KelolaPoi() {
  const [search, setSearch] = useState("");
  const [tipe, setTipe] = useState("Semua");
  const [sumberAir, setSumberAir] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [poiData, setPoiData] = useState(dummyPoi);

  // Filtering logic
  const filteredPoi = poiData.filter((poi) => {
    const matchSearch = poi.nama_titik
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchTipe = tipe === "Semua" || poi.tipe_titik === tipe;
    const matchSumberAir =
      sumberAir === "Semua" ||
      (sumberAir === "Tersedia" && poi.ketersediaan_air) ||
      (sumberAir === "Tidak Ada" && !poi.ketersediaan_air);
    return matchSearch && matchTipe && matchSumberAir;
  });

  // Pagination logic
  const totalItems = filteredPoi.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPoi.slice(
    indexOfFirstItem,
    indexOfFirstItem + itemsPerPage
  );

  // Delete POI
  const handleDeletePoi = (id) => {
    setPoiData((prev) => prev.filter((poi) => poi.id_titik !== id));
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <PageHeader
            title="Manajemen Data POI"
            buttonText="Tambah POI"
            buttonHref="/admin/poi/tambah"
            buttonColor="green"
          />
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Cari POI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            >
              <option value="Semua">Semua Tipe</option>
              {tipeOptions.slice(1).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <select
              value={sumberAir}
              onChange={(e) => setSumberAir(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            >
              <option value="Semua">Semua Sumber Air</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Tidak Ada">Tidak Ada</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 font-semibold text-left">No</th>
                  <th className="py-3 px-4 font-semibold text-left">
                    Nama POI
                  </th>
                  <th className="py-3 px-4 font-semibold text-left">Tipe</th>
                  <th className="py-3 px-4 font-semibold text-left">
                    Sumber Air
                  </th>
                  <th className="py-3 px-4 font-semibold text-left">
                    Gunung & Jalur
                  </th>
                  <th className="py-3 px-4 font-semibold text-left">
                    Koordinat
                  </th>
                  <th className="py-3 px-4 font-semibold text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((poi, index) => (
                    <tr
                      key={poi.id_titik}
                      className="border-b last:border-none"
                    >
                      <td className="py-3 px-4">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="py-3 px-4 font-semibold text-green-700">
                        {poi.nama_titik}
                      </td>
                      <td className="py-3 px-4">{poi.tipe_titik}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold rounded-lg border ${
                            poi.ketersediaan_air
                              ? "bg-green-100 text-green-700 border-green-300"
                              : "bg-red-100 text-red-700 border-red-300"
                          }`}
                        >
                          {poi.ketersediaan_air ? "Tersedia" : "Tidak Ada"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className="font-medium">
                            {poi.nama_gunung || "N/A"}
                          </span>
                          <span className="ml-2 text-gray-500">
                            {poi.nama_jalur || "Tidak terikat"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{poi.koordinat || "-"}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition"
                            title="Edit POI"
                            onClick={() =>
                              (window.location.href = `/admin/poi/edit/${poi.id_titik}`)
                            }
                          >
                            <i className="bi bi-pencil-fill mr-1"></i>Edit
                          </button>
                          <button
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                            title="Hapus POI"
                            onClick={() => handleDeletePoi(poi.id_titik)}
                          >
                            <i className="bi bi-trash-fill mr-1"></i>Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      Tidak ada data POI yang cocok dengan filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
            <div className="text-sm text-gray-500">
              Menampilkan {indexOfFirstItem + 1} -{" "}
              {indexOfFirstItem + currentItems.length} dari {filteredPoi.length}{" "}
              data
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
