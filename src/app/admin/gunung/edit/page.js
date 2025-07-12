"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../../../components/admin/AdminSidebar";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const VALIDATION_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  MIN_NAME_LENGTH: 3,
  MAX_HEIGHT: 9000,
};

export default function EditGunungPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params || {};
  const [formData, setFormData] = useState({
    nama_gunung: "",
    ketinggian_puncak_mdpl: "",
    lokasi_administratif: [],
    deskripsi_singkat: "",
  });
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [availableKabupaten, setAvailableKabupaten] = useState([]);
  const [availableKecamatan, setAvailableKecamatan] = useState([]);
  const [provinsiList, setProvinsiList] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setProvinsiList([
      { id: "32", name: "Jawa Barat" },
      { id: "33", name: "Jawa Tengah" },
      { id: "35", name: "Jawa Timur" },
      { id: "52", name: "Nusa Tenggara Barat" },
      { id: "51", name: "Bali" },
      { id: "34", name: "DI Yogyakarta" },
      { id: "31", name: "DKI Jakarta" },
    ]);
  }, []);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    fetch(`${API_BASE_URL}/api/admin/gunung/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          nama_gunung: data.nama_gunung || "",
          ketinggian_puncak_mdpl: data.ketinggian_puncak_mdpl || "",
          lokasi_administratif: data.lokasi_administratif
            ? data.lokasi_administratif.split("; ")
            : [],
          deskripsi_singkat: data.deskripsi_singkat || "",
        });
        if (data.url_thumbnail) setFotoPreview(data.url_thumbnail);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data gunung.");
        setIsLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProvinsiChange = (e) => {
    setSelectedProvinsi(e.target.value);
    setSelectedKabupaten("");
    setSelectedKecamatan("");
    setAvailableKabupaten([]);
    setAvailableKecamatan([]);
    setAvailableKabupaten([
      { id: "3201", name: "Kabupaten Bogor" },
      { id: "3202", name: "Kabupaten Sukabumi" },
    ]);
  };

  const handleKabupatenChange = (e) => {
    setSelectedKabupaten(e.target.value);
    setSelectedKecamatan("");
    setAvailableKecamatan([]);
    setAvailableKecamatan([
      { id: "320101", name: "Cisarua" },
      { id: "320102", name: "Cibinong" },
    ]);
  };

  const handleKecamatanChange = (e) => {
    setSelectedKecamatan(e.target.value);
  };

  const handleAddLokasiAdministratif = () => {
    if (!selectedProvinsi || !selectedKabupaten) return;
    const provinsiName =
      provinsiList.find((p) => p.id === selectedProvinsi)?.name || "";
    const kabupatenName =
      availableKabupaten.find((k) => String(k.id) === String(selectedKabupaten))
        ?.name || "";
    const kecamatanName = selectedKecamatan
      ? availableKecamatan.find((kec) => kec.id === selectedKecamatan)?.name ||
        ""
      : "";
    let lokasiString = kecamatanName
      ? `Kec. ${kecamatanName}, ${kabupatenName}, ${provinsiName}`
      : `${kabupatenName}, ${provinsiName}`;
    if (formData.lokasi_administratif.includes(lokasiString)) return;
    setFormData((prev) => ({
      ...prev,
      lokasi_administratif: [...prev.lokasi_administratif, lokasiString],
    }));
    setSelectedProvinsi("");
    setSelectedKabupaten("");
    setSelectedKecamatan("");
    setAvailableKabupaten([]);
    setAvailableKecamatan([]);
  };

  const handleRemoveLokasiAdministratif = (idx) => {
    setFormData((prev) => ({
      ...prev,
      lokasi_administratif: prev.lokasi_administratif.filter(
        (_, i) => i !== idx
      ),
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!VALIDATION_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) return;
      if (file.size > VALIDATION_CONFIG.MAX_FILE_SIZE) return;
      setThumbnailFile(file);
      setFotoPreview(URL.createObjectURL(file));
    } else {
      setThumbnailFile(null);
      setFotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const dataToSend = new FormData();
      dataToSend.append("nama_gunung", formData.nama_gunung);
      dataToSend.append(
        "lokasi_administratif",
        formData.lokasi_administratif.join("; ")
      );
      dataToSend.append(
        "ketinggian_puncak_mdpl",
        formData.ketinggian_puncak_mdpl
      );
      dataToSend.append("deskripsi_singkat", formData.deskripsi_singkat);
      if (thumbnailFile) dataToSend.append("url_thumbnail", thumbnailFile);
      const res = await fetch(`${API_BASE_URL}/api/admin/gunung/${id}`, {
        method: "PUT",
        body: dataToSend,
      });
      if (!res.ok) throw new Error("Gagal update data");
      router.push("/admin/gunung");
    } catch (err) {
      setError("Gagal menyimpan perubahan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 px-8 py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-3xl font-extrabold mb-8 text-green-700 tracking-tight drop-shadow">
            Edit Data Gunung
          </h1>
          {error && (
            <div className="mb-4 text-red-600 font-semibold">{error}</div>
          )}
          {isLoading ? (
            <div className="text-center py-10 text-gray-400">
              Memuat data...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Foto Utama / Thumbnail
                </label>
                <div className="mb-3">
                  {fotoPreview ? (
                    <img
                      src={fotoPreview}
                      alt="Preview"
                      className="w-full h-52 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-full h-52 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 border border-dashed border-2 border-gray-200">
                      <i className="bi bi-image-alt text-5xl"></i>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Nama Gunung
                </label>
                <input
                  type="text"
                  name="nama_gunung"
                  value={formData.nama_gunung}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                  required
                  minLength={VALIDATION_CONFIG.MIN_NAME_LENGTH}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Ketinggian Puncak (MDPL)
                </label>
                <input
                  type="number"
                  name="ketinggian_puncak_mdpl"
                  value={formData.ketinggian_puncak_mdpl}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                  required
                  min={0}
                  max={VALIDATION_CONFIG.MAX_HEIGHT}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Deskripsi Singkat
                </label>
                <textarea
                  name="deskripsi_singkat"
                  value={formData.deskripsi_singkat}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                  rows={3}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Lokasi Administratif
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  <select
                    value={selectedProvinsi}
                    onChange={handleProvinsiChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                  >
                    <option value="">Pilih Provinsi</option>
                    {provinsiList.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedKabupaten}
                    onChange={handleKabupatenChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                  >
                    <option value="">Pilih Kabupaten</option>
                    {availableKabupaten.map((kab) => (
                      <option key={kab.id} value={kab.id}>
                        {kab.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedKecamatan}
                    onChange={handleKecamatanChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                  >
                    <option value="">Pilih Kecamatan (opsional)</option>
                    {availableKecamatan.map((kec) => (
                      <option key={kec.id} value={kec.id}>
                        {kec.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddLokasiAdministratif}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Tambah
                  </button>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {formData.lokasi_administratif.map((lokasi, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-2 bg-gray-50 rounded px-3 py-1"
                    >
                      <span className="text-gray-700 text-sm">{lokasi}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLokasiAdministratif(idx)}
                        className="text-red-500 hover:underline text-xs font-semibold"
                      >
                        Hapus
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <Link
                  href="/admin/gunung"
                  className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                  disabled={isLoading}
                >
                  Simpan
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
