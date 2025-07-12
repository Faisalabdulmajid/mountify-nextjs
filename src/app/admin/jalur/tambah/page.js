"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

const TRAIL_STATUS_OPTIONS = [
  "Belum Diketahui",
  "Buka",
  "Buka (Wajib menggunakan pemandu/operator tur)",
  "Tutup Sementara",
  "Tutup",
];

const fuzzyDropdownOptions = {
  ketersediaan_sumber_air_skala: [
    "Belum Diketahui",
    "Melimpah (7-10): >3 sumber air atau 1 sumber sangat melimpah setiap pos",
    "Terbatas (3-6): 1-3 titik sumber air, mungkin musiman",
    "Langka/Tidak Ada (0-2): Harus bawa seluruh pasokan air dari basecamp",
  ],
  variasi_lanskap_skala: [
    "Belum Diketahui",
    "Sangat Bervariasi (7-10): >3 ekosistem berbeda",
    "Cukup Bervariasi (4-6): 2-3 transisi ekosistem",
    "Monoton (0-3): Satu jenis ekosistem dari awal hingga akhir",
  ],
  perlindungan_angin_kemah_skala: [
    "Belum Diketahui",
    "Terlindungi (7-10): Dalam hutan lebat atau lembah dalam",
    "Cukup Terlindungi (4-6): Lembah kecil atau di antara pepohonan",
    "Sangat Terekspos (0-3): Punggungan terbuka, puncak, sabana tanpa penghalang",
  ],
  jaringan_komunikasi_skala: [
    "Belum Diketahui",
    "Baik (7-10): Sinyal tersedia di sebagian besar jalur",
    "Terbatas (3-6): Sinyal hanya di titik tertentu",
    "Tidak Ada (0-2): Tidak ada sinyal setelah meninggalkan basecamp",
  ],
  tingkat_insiden_skala: [
    "Belum Diketahui",
    "Rendah/Jarang (8-10): <5 insiden SAR per tahun",
    "Sedang (4-7): 5-10 insiden per tahun",
    "Tinggi/Sering (0-3): >10 insiden SAR per tahun",
  ],
};

const scoreMappings = {
  medan: {
    "Belum Diketahui": null,
    "Sangat Mudah (0-2): Jalur landai, setapak jelas": 1,
    "Mudah (3-4): Tanjakan sedang, bebatuan kecil": 3,
    "Sedang (5-6): Tanjakan panjang, butuh bantuan tangan": 5,
    "Sulit (7-8): Sangat curam >45°, scrambling": 7,
    "Sangat Sulit (9-10): Mendekati vertikal, butuh keahlian panjat": 9,
  },
  navigasi: {
    "Belum Diketahui": null,
    "Aman (7-10): Jalur jelas, terawat, jauh dari risiko": 9,
    "Cukup Aman (4-6): Beberapa titik waspada, jalur aman": 6,
    "Berbahaya (0-3): Riwayat longsor, kawah aktif, jurang tanpa pengaman": 2,
  },
  risiko_tambahan: {
    "Belum Diketahui": null,
    "Rendah/Jarang (8-10): <5 insiden SAR per tahun": 9,
    "Sedang (4-7): 5-10 insiden per tahun": 6,
    "Tinggi/Sering (0-3): >10 insiden SAR per tahun": 2,
  },
  basecamp: {
    "Belum Diketahui": null,
    "Sangat Lengkap (9-10): Fasilitas modern, penginapan, persewaan alat": 9,
    "Lengkap (6-8): Basecamp terorganisir, pusat info, mushola, warung": 7,
    "Cukup (3-5): Basecamp sederhana, toilet umum, warung kecil": 5,
    "Sangat Minim (0-2): Tidak ada basecamp resmi, pendaftaran di rumah warga": 1,
  },
  sumber_air: {
    "Belum Diketahui": null,
    "Melimpah (7-10): >3 sumber air atau 1 sumber sangat melimpah setiap pos": 9,
    "Terbatas (3-6): 1-3 titik sumber air, mungkin musiman": 5,
    "Langka/Tidak Ada (0-2): Harus bawa seluruh pasokan air dari basecamp": 1,
  },
  lahan_kemah: {
    "Belum Diketahui": null,
    "Baik (7-10): Lahan luas, datar, bersih, sumber air dekat <5 menit": 9,
    "Cukup (4-6): Lahan untuk 5-10 tenda, sumber air <30 menit": 6,
    "Buruk (0-3): Lahan miring, berbatu, sempit, sumber air >1 jam": 2,
  },
  perlindungan_kemah: {
    "Belum Diketahui": null,
    "Terlindungi (7-10): Dalam hutan lebat atau lembah dalam": 9,
    "Cukup Terlindungi (4-6): Lembah kecil atau di antara pepohonan": 6,
    "Sangat Terekspos (0-3): Punggungan terbuka, puncak, sabana tanpa penghalang": 2,
  },
  lanskap: {
    "Belum Diketahui": null,
    "Sangat Bervariasi (7-10): >3 ekosistem berbeda": 9,
    "Cukup Bervariasi (4-6): 2-3 transisi ekosistem": 6,
    "Monoton (0-3): Satu jenis ekosistem dari awal hingga akhir": 2,
  },
  viewpoint: {
    "Belum Diketahui": null,
    "Istimewa/Ikonik (9-10): Panoramik 360°, fitur ikonik terkenal": 9,
    "Sangat Indah/Panoramik (7-8): Sebagian besar jalur terbuka": 7,
    "Indah/Terbuka Sebagian (4-6): Beberapa titik dengan pemandangan bagus": 5,
    "Biasa/Terbatas (0-3): Hutan rapat, pemandangan hanya di puncak": 2,
  },
  jaringan_komunikasi: {
    "Belum Diketahui": null,
    "Baik (7-10): Sinyal tersedia di sebagian besar jalur": 9,
    "Terbatas (3-6): Sinyal hanya di titik tertentu": 5,
    "Tidak Ada (0-2): Tidak ada sinyal setelah meninggalkan basecamp": 1,
  },
};

export default function TambahJalurPage() {
  const [allGunungList, setAllGunungList] = useState([]);
  const [generalData, setGeneralData] = useState({
    id_gunung: "",
    nama_jalur: "",
    lokasi_pintu_masuk: "",
    estimasi_waktu_jam: "",
    deskripsi_jalur: "",
    status_jalur: "Belum Diketahui",
    ketersediaan_sumber_air_skala: "",
    variasi_lanskap_skala: "",
    perlindungan_angin_kemah_skala: "",
    jaringan_komunikasi_skala: "",
    tingkat_insiden_skala: "",
  });
  const [descriptiveScores, setDescriptiveScores] = useState({
    medan: "Belum Diketahui",
    navigasi: "Belum Diketahui",
    risiko_tambahan: "Belum Diketahui",
    basecamp: "Belum Diketahui",
    sumber_air: "Belum Diketahui",
    lahan_kemah: "Belum Diketahui",
    perlindungan_kemah: "Belum Diketahui",
    lanskap: "Belum Diketahui",
    viewpoint: "Belum Diketahui",
    jaringan_komunikasi: "Belum Diketahui",
  });

  // Dummy data gunung
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setAllGunungList([
        { id_gunung: 1, nama_gunung: "Gunung Merbabu" },
        { id_gunung: 2, nama_gunung: "Gunung Sindoro" },
        { id_gunung: 3, nama_gunung: "Gunung Slamet" },
      ]);
      setGeneralData((prev) => ({ ...prev, id_gunung: 1 }));
      setIsLoading(false);
    }, 500);
  }, []);

  const handleGeneralChange = (e) => {
    setGeneralData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDescriptiveChange = (e) => {
    setDescriptiveScores((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [isLoading, setIsLoading] = useState(false);

  // Simulasi submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const dataToSend = {
      ...generalData,
      ...descriptiveScores,
      // mapping deskripsi ke integer
      medan: scoreMappings.medan[descriptiveScores.medan],
      navigasi: scoreMappings.navigasi[descriptiveScores.navigasi],
      risiko_tambahan:
        scoreMappings.risiko_tambahan[descriptiveScores.risiko_tambahan],
      basecamp: scoreMappings.basecamp[descriptiveScores.basecamp],
      sumber_air: scoreMappings.sumber_air[descriptiveScores.sumber_air],
      lahan_kemah: scoreMappings.lahan_kemah[descriptiveScores.lahan_kemah],
      perlindungan_kemah:
        scoreMappings.perlindungan_kemah[descriptiveScores.perlindungan_kemah],
      lanskap: scoreMappings.lanskap[descriptiveScores.lanskap],
      viewpoint: scoreMappings.viewpoint[descriptiveScores.viewpoint],
      jaringan_komunikasi:
        scoreMappings.jaringan_komunikasi[
          descriptiveScores.jaringan_komunikasi
        ],
    };
    setTimeout(() => {
      alert("Data yang dikirim: " + JSON.stringify(dataToSend, null, 2));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-2xl font-bold text-green-700 mb-8">
            Tambah Data Jalur Pendakian
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Identitas Jalur */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">Pilih Gunung</label>
                <select
                  name="id_gunung"
                  value={generalData.id_gunung}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  <option value="" disabled>
                    -- Pilih Gunung --
                  </option>
                  {allGunungList?.map((g) => (
                    <option key={g.id_gunung} value={g.id_gunung}>
                      {g.nama_gunung}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Nama Jalur</label>
                <input
                  type="text"
                  name="nama_jalur"
                  value={generalData.nama_jalur}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                  placeholder="Contoh: Jalur Cibodas"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">
                  Lokasi Pintu Masuk/Gerbang
                </label>
                <input
                  type="text"
                  name="lokasi_pintu_masuk"
                  value={generalData.lokasi_pintu_masuk}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Contoh: Desa Kertawangi, Pos Jaga Cibodas"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Status Jalur</label>
                <select
                  name="status_jalur"
                  value={generalData.status_jalur}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {TRAIL_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Estimasi Waktu (Jam)
                </label>
                <input
                  type="number"
                  name="estimasi_waktu_jam"
                  value={generalData.estimasi_waktu_jam}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                  placeholder="Contoh: 8"
                />
              </div>
            </div>
            {/* Parameter Fuzzy Engine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">
                  Ketersediaan Sumber Air
                </label>
                <select
                  name="ketersediaan_sumber_air_skala"
                  value={generalData.ketersediaan_sumber_air_skala}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  {fuzzyDropdownOptions.ketersediaan_sumber_air_skala.map(
                    (opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Variasi Lanskap
                </label>
                <select
                  name="variasi_lanskap_skala"
                  value={generalData.variasi_lanskap_skala}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  {fuzzyDropdownOptions.variasi_lanskap_skala.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Perlindungan Angin Kemah
                </label>
                <select
                  name="perlindungan_angin_kemah_skala"
                  value={generalData.perlindungan_angin_kemah_skala}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  {fuzzyDropdownOptions.perlindungan_angin_kemah_skala.map(
                    (opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Jaringan Komunikasi
                </label>
                <select
                  name="jaringan_komunikasi_skala"
                  value={generalData.jaringan_komunikasi_skala}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  {fuzzyDropdownOptions.jaringan_komunikasi_skala.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Tingkat Insiden
                </label>
                <select
                  name="tingkat_insiden_skala"
                  value={generalData.tingkat_insiden_skala}
                  onChange={handleGeneralChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  {fuzzyDropdownOptions.tingkat_insiden_skala.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Parameter Penilaian Fuzzy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">
                  Medan & Tanjakan
                </label>
                <select
                  name="medan"
                  value={descriptiveScores.medan}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.medan).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Navigasi & Petunjuk Arah
                </label>
                <select
                  name="navigasi"
                  value={descriptiveScores.navigasi}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.navigasi).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Risiko Tambahan
                </label>
                <select
                  name="risiko_tambahan"
                  value={descriptiveScores.risiko_tambahan}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.risiko_tambahan).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Fasilitas Basecamp
                </label>
                <select
                  name="basecamp"
                  value={descriptiveScores.basecamp}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.basecamp).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Sumber Air</label>
                <select
                  name="sumber_air"
                  value={descriptiveScores.sumber_air}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.sumber_air).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Lahan & Kapasitas Kemah
                </label>
                <select
                  name="lahan_kemah"
                  value={descriptiveScores.lahan_kemah}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.lahan_kemah).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Perlindungan Kemah
                </label>
                <select
                  name="perlindungan_kemah"
                  value={descriptiveScores.perlindungan_kemah}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.perlindungan_kemah).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Variasi Lanskap
                </label>
                <select
                  name="lanskap"
                  value={descriptiveScores.lanskap}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.lanskap).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Spot Pemandangan (Viewpoint)
                </label>
                <select
                  name="viewpoint"
                  value={descriptiveScores.viewpoint}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.viewpoint).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Jaringan Komunikasi
                </label>
                <select
                  name="jaringan_komunikasi"
                  value={descriptiveScores.jaringan_komunikasi}
                  onChange={handleDescriptiveChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {Object.keys(scoreMappings.jaringan_komunikasi).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Deskripsi Jalur */}
            <div>
              <label className="block font-semibold mb-2">
                Deskripsi Singkat Jalur
              </label>
              <textarea
                name="deskripsi_jalur"
                value={generalData.deskripsi_jalur}
                onChange={handleGeneralChange}
                className="w-full border rounded-lg px-4 py-2"
                rows={4}
                placeholder="Jelaskan karakteristik unik, sumber air, atau hal penting lainnya mengenai jalur ini..."
              />
            </div>
            {/* Tombol Aksi */}
            <div className="flex gap-4 mt-8">
              <Link
                href="/admin/jalur"
                className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                disabled={isLoading}
              >
                Simpan Data Jalur
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
