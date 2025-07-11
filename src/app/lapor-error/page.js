"use client";
import React, { useState, useEffect } from "react";
import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import Footer from "@/components/layout/Footer";

export default function LaporErrorPage() {
  const [formData, setFormData] = useState({
    judul_laporan: "",
    deskripsi_laporan: "",
    halaman_error: "",
  });
  const [screenshot, setScreenshot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, halaman_error: window.location.href }));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.judul_laporan || !formData.deskripsi_laporan) {
      alert("Judul dan Deskripsi laporan wajib diisi.");
      return;
    }
    setIsLoading(true);
    // Simulasi submit, bisa dihubungkan ke backend
    setTimeout(() => {
      alert("Laporan berhasil dikirim. Terima kasih atas masukan Anda!");
      setIsLoading(false);
      setFormData({
        judul_laporan: "",
        deskripsi_laporan: "",
        halaman_error: window.location.href,
      });
      setScreenshot(null);
    }, 1500);
  };

  return (
    <>
      <HeaderWithNavbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2 pt-24">
        <div className="w-full max-w-xl bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-2 text-center">
            Laporkan Masalah atau Error
          </h2>
          <p className="mb-6 text-gray-600 text-center">
            Menemukan sesuatu yang tidak beres? Beri tahu kami agar dapat segera
            kami perbaiki.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="judul_laporan" className="block font-medium mb-1">
                Judul Laporan
              </label>
              <input
                type="text"
                id="judul_laporan"
                name="judul_laporan"
                value={formData.judul_laporan}
                onChange={handleChange}
                placeholder="cth: Tombol Simpan Tidak Berfungsi"
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label
                htmlFor="deskripsi_laporan"
                className="block font-medium mb-1"
              >
                Deskripsi Masalah
              </label>
              <textarea
                id="deskripsi_laporan"
                name="deskripsi_laporan"
                value={formData.deskripsi_laporan}
                onChange={handleChange}
                rows={6}
                placeholder="Jelaskan masalah yang Anda temui, termasuk langkah-langkah untuk mereproduksinya."
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="halaman_error" className="block font-medium mb-1">
                URL Halaman Error
              </label>
              <input
                type="text"
                id="halaman_error"
                name="halaman_error"
                value={formData.halaman_error}
                onChange={handleChange}
                readOnly
                className="w-full border rounded p-2 bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="screenshot" className="block font-medium mb-1">
                Screenshot (Opsional)
              </label>
              <input
                type="file"
                id="screenshot"
                name="screenshot"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded bg-amber-900 text-white font-semibold hover:bg-amber-800 transition"
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Kirim Laporan"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
