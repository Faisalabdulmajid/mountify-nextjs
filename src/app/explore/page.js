"use client";
// Fungsi deskripsi parameter sesuai dokumentasi
function getParameterDescription(key) {
  switch (key) {
    case "Tingkat Kesulitan":
      return "Penilaian tingkat kesulitan pendakian mengacu pada standar nasional dan internasional. Tingkat kesulitan mempengaruhi kebutuhan fisik, teknis, dan pengalaman pendaki.";
    case "Tingkat Keamanan":
      return "Keamanan pendakian meliputi perlindungan teknis dan risiko alam. Risiko alam: aktivitas vulkanik, cuaca ekstrem, satwa liar, kebakaran hutan, dan geomorfologi jalur.";
    case "Durasi Pendakian":
      return "Alokasi waktu pendakian mempengaruhi kebutuhan logistik dan stamina.";
    case "Ketinggian Maksimal":
      return "Ketinggian gunung (mdpl) mempengaruhi risiko AMS (Acute Mountain Sickness). Semakin tinggi, semakin berat tantangan fisik dan risiko kesehatan.";
    case "Kualitas Fasilitas":
      return "Fasilitas pendukung meliputi basecamp, shelter, warung, toilet, dan sumber air. Fasilitas mempengaruhi kenyamanan dan keamanan logistik.";
    case "Kualitas Area Kemah":
      return "Area kemah dinilai dari kelayakan, perlindungan, dan akses air. Area kemah yang baik meningkatkan kenyamanan dan keselamatan.";
    case "Keindahan Pemandangan":
      return "Penilaian keindahan pemandangan mempengaruhi pengalaman visual pendaki.";
    case "Variasi Lanskap":
      return "Variasi lanskap dinilai dari jumlah dan jenis ekosistem yang dilewati. Semakin bervariasi, semakin kaya pengalaman pendakian.";
    case "Ketersediaan Air":
      return "Ketersediaan air penting untuk logistik. Pastikan selalu cek info sumber air sebelum pendakian.";
    case "Perlindungan Angin":
      return "Perlindungan dari angin dinilai dari lokasi area kemah/jalur. Area terlindung meningkatkan kenyamanan dan keamanan.";
    case "Sinyal Komunikasi":
      return "Ketersediaan sinyal komunikasi (seluler/radio) di jalur dan area kemah penting untuk keamanan dan koordinasi.";
    case "Keamanan Insiden":
      return "Tingkat keamanan insiden mencakup risiko kecelakaan, bencana alam, dan kriminalitas.";
    default:
      return key;
  }
}

// Fungsi untuk mengambil daftar value dan penjelasan sesuai label
function getParameterValues(key) {
  switch (key) {
    case "Tingkat Kesulitan":
      return generateUniqueScaleOptions(1, 10, getDifficultyDescription);
    case "Tingkat Keamanan":
      return generateUniqueScaleOptions(1, 10, getSafetyDescription);
    case "Kualitas Fasilitas":
      return generateUniqueScaleOptions(1, 10, getFacilityDescription);
    case "Kualitas Area Kemah":
      return generateUniqueScaleOptions(1, 10, getCampQualityDescription);
    case "Keindahan Pemandangan":
      return generateUniqueScaleOptions(1, 10, getSceneryDescription);
    case "Ketersediaan Air":
      return generateUniqueScaleOptions(1, 10, getWaterAvailabilityDescription);
    case "Variasi Lanskap":
      return generateUniqueScaleOptions(
        1,
        10,
        getLandscapeVariationDescription
      );
    case "Perlindungan Angin":
      return generateUniqueScaleOptions(1, 10, getWindProtectionDescription);
    case "Sinyal Komunikasi":
      return generateUniqueScaleOptions(1, 10, getCommunicationDescription);
    case "Keamanan Insiden":
      return generateUniqueScaleOptions(1, 10, getIncidentSafetyDescription);
    case "Ketinggian Maksimal":
      return [
        { value: 1500, label: "<1.500 mdpl: Risiko AMS minimal" },
        {
          value: 3500,
          label:
            "1.500-3.500 mdpl: Risiko sedang, aklimatisasi mulai diperlukan",
        },
        {
          value: 5500,
          label: "3.500-5.500 mdpl: Risiko tinggi, aklimatisasi wajib",
        },
        { value: 6000, label: ">5.500 mdpl: Ekspedisi ekstrem" },
      ];
    case "Durasi Pendakian":
      return [
        { value: 1, label: "1 Hari (Tektok): Pulang-pergi tanpa menginap" },
        {
          value: 48,
          label: "2 Hari 1 Malam (2D1N): Standar umum di Indonesia",
        },
        {
          value: 72,
          label: "3 Hari 2 Malam (3D2N): Untuk jalur lebih panjang",
        },
        { value: 96, label: ">3 Hari: Ekspedisi gunung terpencil/kompleks" },
      ];
    default:
      return [];
  }
}

// Halaman Explore Next.js - Porting Lengkap dari Frontend
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
// import "./explore.css"; // Sudah tidak digunakan, semua style pakai Tailwind

import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import Footer from "@/components/layout/Footer";

// --- Komponen Modal ---
function InfoModal({ open, onClose, title, description, values }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl border-2 max-w-sm w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Tutup"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-2 text-amber-900">{title}</h2>
        <div className="text-sm text-gray-700 mb-3 whitespace-pre-line">
          {description}
        </div>
        {values && values.length > 0 && (
          <div className="mt-2">
            <div className="font-semibold text-xs text-gray-600 mb-1">
              Pilihan dan Penjelasan:
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              {values.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="font-bold text-amber-900">
                    {item.value}:
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Komponen Icon Tanda Tanya ---
function QuestionIcon({ onClick }) {
  return (
    <button
      type="button"
      className="ml-1 text-amber-700 hover:text-amber-900 focus:outline-none"
      onClick={onClick}
      aria-label="Info"
      tabIndex={0}
    >
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
        <path d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0ZM9 14a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm2-2V9a2 2 0 1 0-4 0h2a1 1 0 1 1 2 0c0 1.104-.896 2-2 2a1 1 0 0 0 0 2h2Z" />
      </svg>
    </button>
  );
}

// --- Konstanta Preferensi Awal ---
const INITIAL_PREFERENCES = {
  max_kesulitan_skala: 5,
  min_keamanan_skala: 5,
  max_estimasi_waktu_jam: 24,
  max_ketinggian_mdpl: 3000,
  min_kualitas_fasilitas_skala: 5,
  min_kualitas_kemah_skala: 5,
  min_keindahan_pemandangan_skala: 5,
  min_ketersediaan_air: 5,
  min_variasi_lanskap: 5,
  min_perlindungan_angin: 5,
  min_jaringan_komunikasi: 5,
  min_tingkat_keamanan_insiden: 5,
  inputType: "dropdown",
};
// --- BEGIN NEW ExplorePage ---

// --- Utility Functions ---
function getDifficultyDescription(v) {
  switch (v) {
    case 1:
      return "Sangat Mudah (1)";
    case 2:
      return "Mudah (2)";
    case 3:
      return "Cukup Mudah (3)";
    case 4:
      return "Sedikit Sulit (4)";
    case 5:
      return "Sedang (5)";
    case 6:
      return "Agak Sulit (6)";
    case 7:
      return "Sulit (7)";
    case 8:
      return "Cukup Sulit (8)";
    case 9:
      return "Sangat Sulit (9)";
    case 10:
      return "Ekstrem (10)";
    default:
      return `Level ${v}`;
  }
}
function getSafetyDescription(v) {
  switch (v) {
    case 1:
      return "Sangat Tidak Aman (1)";
    case 2:
      return "Tidak Aman (2)";
    case 3:
      return "Cukup Tidak Aman (3)";
    case 4:
      return "Sedikit Aman (4)";
    case 5:
      return "Sedang (5)";
    case 6:
      return "Agak Aman (6)";
    case 7:
      return "Aman (7)";
    case 8:
      return "Cukup Aman (8)";
    case 9:
      return "Sangat Aman (9)";
    case 10:
      return "Maksimal Aman (10)";
    default:
      return `Level ${v}`;
  }
}
function getFacilityDescription(v) {
  switch (v) {
    case 1:
      return "Sangat Buruk (1)";
    case 2:
      return "Buruk (2)";
    case 3:
      return "Cukup Buruk (3)";
    case 4:
      return "Sedikit Baik (4)";
    case 5:
      return "Sedang (5)";
    case 6:
      return "Agak Baik (6)";
    case 7:
      return "Baik (7)";
    case 8:
      return "Cukup Baik (8)";
    case 9:
      return "Sangat Baik (9)";
    case 10:
      return "Fasilitas Lengkap (10)";
    default:
      return `Level ${v}`;
  }
}
function getCampQualityDescription(v) {
  switch (v) {
    case 1:
      return "Sangat Buruk (1)";
    case 2:
      return "Buruk (2)";
    case 3:
      return "Cukup Buruk (3)";
    case 4:
      return "Sedikit Baik (4)";
    case 5:
      return "Sedang (5)";
    case 6:
      return "Agak Baik (6)";
    case 7:
      return "Baik (7)";
    case 8:
      return "Cukup Baik (8)";
    case 9:
      return "Sangat Baik (9)";
    case 10:
      return "Area Kemah Terbaik (10)";
    default:
      return `Level ${v}`;
  }
}
function getSceneryDescription(v) {
  switch (v) {
    case 1:
      return "Sangat Buruk (1)";
    case 2:
      return "Buruk (2)";
    case 3:
      return "Cukup Buruk (3)";
    case 4:
      return "Sedikit Indah (4)";
    case 5:
      return "Sedang (5)";
    case 6:
      return "Agak Indah (6)";
    case 7:
      return "Indah (7)";
    case 8:
      return "Cukup Indah (8)";
    case 9:
      return "Sangat Indah (9)";
    case 10:
      return "Pemandangan Spektakuler (10)";
    default:
      return `Level ${v}`;
  }
}
function getWaterAvailabilityDescription(v) {
  switch (v) {
    case 1:
      return "Sangat Sulit Air (1)";
    case 2:
      return "Sulit Air (2)";
    case 3:
      return "Cukup Sulit Air (3)";
    case 4:
      return "Sedikit Mudah Air (4)";
    case 5:
      return "Sedang (5)";
    case 6:
      return "Agak Mudah Air (6)";
    case 7:
      return "Mudah Air (7)";
    case 8:
      return "Cukup Mudah Air (8)";
    case 9:
      return "Sangat Mudah Air (9)";
    case 10:
      return "Air Melimpah (10)";
    default:
      return `Level ${v}`;
  }
}
function getLandscapeVariationDescription(v) {
  switch (v) {
    case 1:
      return "Sangat Monoton (1)";
    case 2:
      return "Monoton (2)";
    case 3:
      return "Kurang Bervariasi (3)";
    case 4:
      return "Cukup Bervariasi (4)";
    case 5:
      return "Bervariasi (5)";
    case 6:
      return "Sangat Bervariasi (6)";
    case 7:
      return "Beragam (7)";
    case 8:
      return "Sangat Beragam (8)";
    case 9:
      return "Spektakuler (9)";
    case 10:
      return "Luar Biasa Beragam (10)";
    default:
      return `Level ${v}`;
  }
}
function getWindProtectionDescription(v) {
  switch (v) {
    case 1:
      return "Sangat Terekspos (1)";
    case 2:
      return "Terekspos (2)";
    case 3:
      return "Kurang Terlindungi (3)";
    case 4:
      return "Cukup Terlindungi (4)";
    case 5:
      return "Terlindungi (5)";
    case 6:
      return "Baik Terlindungi (6)";
    case 7:
      return "Sangat Terlindungi (7)";
    case 8:
      return "Maksimal Terlindungi (8)";
    case 9:
      return "Sempurna Terlindungi (9)";
    case 10:
      return "Ideal Terlindungi (10)";
    default:
      return `Level ${v}`;
  }
}
function getCommunicationDescription(v) {
  switch (v) {
    case 1:
      return "Tidak Ada Sinyal (1)";
    case 2:
      return "Sinyal Sangat Lemah (2)";
    case 3:
      return "Sinyal Lemah (3)";
    case 4:
      return "Sinyal Terbatas (4)";
    case 5:
      return "Sinyal Cukup (5)";
    case 6:
      return "Sinyal Baik (6)";
    case 7:
      return "Sinyal Sangat Baik (7)";
    case 8:
      return "Sinyal Kuat (8)";
    case 9:
      return "Sinyal Sangat Kuat (9)";
    case 10:
      return "Sinyal Optimal (10)";
    default:
      return `Level ${v}`;
  }
}
function getIncidentSafetyDescription(v) {
  switch (v) {
    case 1:
      return "Insiden Sangat Sering (1)";
    case 2:
      return "Insiden Sering (2)";
    case 3:
      return "Insiden Cukup Sering (3)";
    case 4:
      return "Insiden Kadang (4)";
    case 5:
      return "Insiden Sedang (5)";
    case 6:
      return "Insiden Jarang (6)";
    case 7:
      return "Insiden Sangat Jarang (7)";
    case 8:
      return "Sangat Aman (8)";
    case 9:
      return "Amat Sangat Aman (9)";
    case 10:
      return "Maksimal Aman (10)";
    default:
      return `Level ${v}`;
  }
}
function getAltitudeDescription(v) {
  if (v <= 1500) return "Bukit/Pegunungan Rendah";
  if (v <= 2500) return "Gunung Sedang";
  if (v <= 3500) return "Gunung Tinggi";
  if (v <= 4500) return "Gunung Sangat Tinggi";
  return "Puncak Ekstrem";
}
function generateUniqueScaleOptions(min = 1, max = 10, getDescription) {
  const uniqueOptions = new Map();
  for (let i = min; i <= max; i++) {
    const description = getDescription(i);
    const key = `${description}_${i}`;
    if (!uniqueOptions.has(key)) {
      uniqueOptions.set(key, {
        value: i,
        label: description,
        originalValue: i,
      });
    }
  }
  return Array.from(uniqueOptions.values())
    .sort((a, b) => a.originalValue - b.originalValue)
    .map((item) => ({ value: item.value, label: item.label }));
}
function ScaleInput({
  id,
  name,
  value,
  onChange,
  min = 1,
  max = 10,
  inputType,
  getDescription,
  rangeLabels = { min: "Rendah", max: "Tinggi" },
}) {
  if (inputType === "dropdown") {
    const options = generateUniqueScaleOptions(min, max, getDescription);
    return (
      <select
        id={id}
        name={name}
        className="block w-full rounded border border-gray-300 p-2 text-sm"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <input
        type="range"
        id={id}
        name={name}
        className="w-full accent-amber-900 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step="1"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{rangeLabels.min}</span>
        <span>{rangeLabels.max}</span>
      </div>
    </div>
  );
}
function CardImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={400}
      className="card-image"
      onError={() => DEFAULT_FALLBACK_IMAGE}
    />
  );
}

// --- Main ExplorePage Component ---
function ExplorePage() {
  // Fungsi untuk menutup modal info
  const closeInfoModal = () => {
    setModalInfo({ open: false, title: "", description: "" });
  };
  // Fungsi untuk menangani perubahan input preferensi
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // --- State Hooks ---
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
  const [inputType, setInputType] = useState(INITIAL_PREFERENCES.inputType);
  const [modalInfo, setModalInfo] = useState({
    open: false,
    title: "",
    description: "",
    values: [],
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultsRef = useRef(null);

  // Fungsi untuk membuka modal info dengan isi sesuai dokumentasi dan daftar value
  const openInfoModal = (title, key) => {
    setModalInfo({
      open: true,
      title,
      description: getParameterDescription(key),
      values: getParameterValues(key),
    });
  };

  // Stub: Fungsi untuk tombol "Lihat Semua Gunung"
  const handleShowAllMountains = () => {
    // Implementasi bisa ditambahkan sesuai kebutuhan
    // Untuk saat ini, tidak melakukan apa-apa
  };

  const handleReset = () => {
    setPreferences({
      ...INITIAL_PREFERENCES,
      inputType: preferences.inputType,
    });
    setResults([]);
    setError(null);
  };

  const handleRecommendationSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);
    setResults([]);
    try {
      const backendPreferences = { ...preferences };
      const response = await fetch(`${API_BASE_URL}/rekomendasi/gunung`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(backendPreferences),
      });
      if (!response.ok) throw new Error("Gagal mengambil rekomendasi gunung");
      const data = await response.json();
      let recommendations = [];
      if (data.rekomendasi_gunung) recommendations = data.rekomendasi_gunung;
      else if (Array.isArray(data)) recommendations = data;
      setResults(recommendations);
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <>
      <HeaderWithNavbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2 pt-24">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold mb-4 text-amber-900 text-center">
            Rekomendasi Gunung
          </h1>
          <p className="mb-6 text-gray-600 text-center">
            Temukan gunung terbaik sesuai preferensi Anda
          </p>
          {/* Pilihan Mode Input Preferensi */}
          <div className="mb-4 text-center text-sm text-gray-600">
            Pilih tampilan input preferensi sesuai kenyamanan Anda:
          </div>
          <div className="flex flex-col md:flex-row justify-center mb-6 gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded font-semibold border bg-blue-700 text-white border-blue-700 hover:bg-blue-800 transition"
              onClick={handleShowAllMountains}
            >
              Lihat Semua Gunung
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded font-semibold border transition ${
                  preferences.inputType === "dropdown"
                    ? "bg-amber-900 text-white border-amber-900"
                    : "bg-white text-amber-900 border-amber-900"
                }`}
                onClick={() => {
                  setPreferences((prev) => ({
                    ...prev,
                    inputType: "dropdown",
                  }));
                }}
              >
                Tampilan Pilihan
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded font-semibold border transition ${
                  preferences.inputType === "range"
                    ? "bg-amber-900 text-white border-amber-900"
                    : "bg-white text-amber-900 border-amber-900"
                }`}
                onClick={() => {
                  setPreferences((prev) => ({ ...prev, inputType: "range" }));
                }}
              >
                Tampilan Geser
              </button>
            </div>
          </div>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5"
            onSubmit={handleRecommendationSubmit}
          >
            <div>
              <label
                htmlFor="max_kesulitan_skala"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Tingkat Kesulitan Maksimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Tingkat Kesulitan", "Tingkat Kesulitan")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  ({getDifficultyDescription(preferences.max_kesulitan_skala)})
                </span>
              </label>
              <ScaleInput
                id="max_kesulitan_skala"
                name="max_kesulitan_skala"
                value={preferences.max_kesulitan_skala}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getDifficultyDescription}
              />
            </div>
            <div>
              <label
                htmlFor="min_keamanan_skala"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Tingkat Keamanan Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Tingkat Keamanan", "Tingkat Keamanan")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  ({getSafetyDescription(preferences.min_keamanan_skala)})
                </span>
              </label>
              <ScaleInput
                id="min_keamanan_skala"
                name="min_keamanan_skala"
                value={preferences.min_keamanan_skala}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getSafetyDescription}
              />
            </div>
            <div>
              <label
                htmlFor="max_estimasi_waktu_jam"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Durasi Maksimal Pendakian (jam)
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Durasi Pendakian", "Durasi Pendakian")
                  }
                />
              </label>
              <input
                type="number"
                id="max_estimasi_waktu_jam"
                name="max_estimasi_waktu_jam"
                className="w-full border rounded p-2"
                value={preferences.max_estimasi_waktu_jam}
                onChange={handleChange}
                min="1"
                max="168"
              />
            </div>
            <div>
              <label
                htmlFor="max_ketinggian_mdpl"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Ketinggian Maksimal (mdpl)
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Ketinggian Maksimal", "Ketinggian Maksimal")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  ({getAltitudeDescription(preferences.max_ketinggian_mdpl)})
                </span>
              </label>
              <input
                type="number"
                id="max_ketinggian_mdpl"
                name="max_ketinggian_mdpl"
                className="w-full border rounded p-2"
                value={preferences.max_ketinggian_mdpl}
                onChange={handleChange}
                min="0"
                max="6000"
              />
            </div>
            <div>
              <label
                htmlFor="min_kualitas_fasilitas_skala"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Kualitas Fasilitas Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Kualitas Fasilitas", "Kualitas Fasilitas")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {getFacilityDescription(
                    preferences.min_kualitas_fasilitas_skala
                  )}
                  )
                </span>
              </label>
              <ScaleInput
                id="min_kualitas_fasilitas_skala"
                name="min_kualitas_fasilitas_skala"
                value={preferences.min_kualitas_fasilitas_skala}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getFacilityDescription}
              />
            </div>
            <div>
              <label
                htmlFor="min_kualitas_kemah_skala"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Kualitas Area Kemah Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Kualitas Area Kemah", "Kualitas Area Kemah")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {getCampQualityDescription(
                    preferences.min_kualitas_kemah_skala
                  )}
                  )
                </span>
              </label>
              <ScaleInput
                id="min_kualitas_kemah_skala"
                name="min_kualitas_kemah_skala"
                value={preferences.min_kualitas_kemah_skala}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getCampQualityDescription}
              />
            </div>
            <div>
              <label
                htmlFor="min_keindahan_pemandangan_skala"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Keindahan Pemandangan Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal(
                      "Keindahan Pemandangan",
                      "Keindahan Pemandangan"
                    )
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {getSceneryDescription(
                    preferences.min_keindahan_pemandangan_skala
                  )}
                  )
                </span>
              </label>
              <ScaleInput
                id="min_keindahan_pemandangan_skala"
                name="min_keindahan_pemandangan_skala"
                value={preferences.min_keindahan_pemandangan_skala}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getSceneryDescription}
              />
            </div>
            <div>
              <label
                htmlFor="min_ketersediaan_air"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Ketersediaan Air Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Ketersediaan Air", "Ketersediaan Air")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {getWaterAvailabilityDescription(
                    preferences.min_ketersediaan_air
                  )}
                  )
                </span>
              </label>
              <ScaleInput
                id="min_ketersediaan_air"
                name="min_ketersediaan_air"
                value={preferences.min_ketersediaan_air}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getWaterAvailabilityDescription}
              />
            </div>
            <div>
              <label
                htmlFor="min_variasi_lanskap"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Variasi Lanskap Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Variasi Lanskap", "Variasi Lanskap")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {getLandscapeVariationDescription(
                    preferences.min_variasi_lanskap
                  )}
                  )
                </span>
              </label>
              <ScaleInput
                id="min_variasi_lanskap"
                name="min_variasi_lanskap"
                value={preferences.min_variasi_lanskap}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getLandscapeVariationDescription}
              />
            </div>
            <div>
              <label
                htmlFor="min_perlindungan_angin"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Perlindungan Angin Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Perlindungan Angin", "Perlindungan Angin")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {getWindProtectionDescription(
                    preferences.min_perlindungan_angin
                  )}
                  )
                </span>
              </label>
              <ScaleInput
                id="min_perlindungan_angin"
                name="min_perlindungan_angin"
                value={preferences.min_perlindungan_angin}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getWindProtectionDescription}
              />
            </div>
            <div>
              <label
                htmlFor="min_jaringan_komunikasi"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Sinyal Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Sinyal Komunikasi", "Sinyal Komunikasi")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {getCommunicationDescription(
                    preferences.min_jaringan_komunikasi
                  )}
                  )
                </span>
              </label>
              <ScaleInput
                id="min_jaringan_komunikasi"
                name="min_jaringan_komunikasi"
                value={preferences.min_jaringan_komunikasi}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getCommunicationDescription}
              />
            </div>
            <div>
              <label
                htmlFor="min_tingkat_keamanan_insiden"
                className="font-medium text-gray-700 mb-1 flex items-center"
              >
                Insiden Minimal
                <QuestionIcon
                  onClick={() =>
                    openInfoModal("Keamanan Insiden", "Keamanan Insiden")
                  }
                />
                <span className="text-xs text-gray-500 ml-2">
                  (
                  {getIncidentSafetyDescription(
                    preferences.min_tingkat_keamanan_insiden
                  )}
                  )
                </span>
              </label>
              <ScaleInput
                id="min_tingkat_keamanan_insiden"
                name="min_tingkat_keamanan_insiden"
                value={preferences.min_tingkat_keamanan_insiden}
                onChange={handleChange}
                inputType={preferences.inputType}
                getDescription={getIncidentSafetyDescription}
              />
            </div>
            <div className="md:col-span-2 flex gap-2 pt-2">
              <button
                type="button"
                className="flex-1 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                onClick={handleReset}
                disabled={isCalculating}
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded bg-amber-900 text-white font-semibold hover:bg-amber-800 transition"
                disabled={isCalculating}
              >
                {isCalculating ? "Menganalisis..." : "Dapatkan Rekomendasi"}
              </button>
            </div>
          </form>
          <div ref={resultsRef} className="mt-8">
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            {!isCalculating && results.length === 0 && !error && (
              <div className="text-gray-400 text-center text-sm">
                Hasil akan muncul di sini setelah Anda mengisi preferensi dan
                klik &quot;Dapatkan Rekomendasi&quot;.
              </div>
            )}
            {!isCalculating && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((mountain, idx) => (
                  <div
                    key={mountain.id_gunung || idx}
                    className="border rounded-xl p-5 flex flex-col gap-4 bg-gradient-to-br from-white to-amber-50 shadow-md hover:shadow-lg transition group h-full"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-full h-40 bg-gray-100 rounded-lg overflow-hidden mb-2">
                      <Image
                        src={
                          mountain.url_thumbnail
                            ? `${API_BASE_URL.replace("/api", "")}${
                                mountain.url_thumbnail
                              }`
                            : DEFAULT_FALLBACK_IMAGE
                        }
                        alt={mountain.nama_gunung}
                        width={220}
                        height={160}
                        className="object-cover w-full h-full group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition">
                            {mountain.nama_gunung}
                          </h3>
                          <span className="inline-block px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800 font-semibold ml-2">
                            {mountain.ketinggian_puncak_mdpl} mdpl
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {mountain.lokasi_administratif}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-700 mb-2">
                          <span className="bg-gray-200 rounded px-2 py-1">
                            Skor:{" "}
                            <span className="font-bold text-amber-900">
                              {mountain.skor_tertinggi
                                ? mountain.skor_tertinggi.toFixed(1)
                                : "-"}
                            </span>
                          </span>
                          <span className="bg-gray-200 rounded px-2 py-1">
                            Jalur Terbaik:{" "}
                            <span className="font-semibold">
                              {mountain.jalur_terbaik}
                            </span>
                          </span>
                          <span className="bg-gray-200 rounded px-2 py-1">
                            Jumlah Jalur:{" "}
                            <span className="font-semibold">
                              {mountain.jumlah_jalur}
                            </span>
                          </span>
                        </div>
                        {mountain.deskripsi_singkat && (
                          <div className="text-xs text-gray-500 italic mb-2 line-clamp-2">
                            {mountain.deskripsi_singkat}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            mountain.kategori_rekomendasi ===
                            "Sangat Direkomendasikan"
                              ? "bg-green-100 text-green-700"
                              : mountain.kategori_rekomendasi ===
                                "Direkomendasikan"
                              ? "bg-blue-100 text-blue-700"
                              : mountain.kategori_rekomendasi ===
                                "Cukup Direkomendasikan"
                              ? "bg-yellow-100 text-yellow-700"
                              : mountain.kategori_rekomendasi ===
                                "Kurang Direkomendasikan"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {mountain.kategori_rekomendasi}
                        </span>
                        <Link
                          href={`/gunung/${mountain.id_gunung}`}
                          className="ml-auto text-amber-900 hover:underline text-xs font-semibold"
                        >
                          Detail &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Modal Info */}
        <InfoModal
          open={modalInfo.open}
          onClose={closeInfoModal}
          title={modalInfo.title}
          description={modalInfo.description}
          values={modalInfo.values}
        />
      </main>
      <Footer />
    </>
  );
}

// Tambahan kurung kurawal penutup jika ada fungsi yang belum ditutup

export default ExplorePage;
