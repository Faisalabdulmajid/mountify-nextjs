// Halaman Explore Next.js - Porting Lengkap dari Frontend
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import "./explore.css";
import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import Footer from "@/components/layout/Footer";

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
  inputType: "dropdown"
};
// --- BEGIN NEW ExplorePage ---

// --- Utility Functions ---
function getDifficultyDescription(v) {
  switch (v) {
    case 1: return "Sangat Mudah (1)";
    case 2: return "Mudah (2)";
    case 3: return "Cukup Mudah (3)";
    case 4: return "Sedikit Sulit (4)";
    case 5: return "Sedang (5)";
    case 6: return "Agak Sulit (6)";
    case 7: return "Sulit (7)";
    case 8: return "Cukup Sulit (8)";
    case 9: return "Sangat Sulit (9)";
    case 10: return "Ekstrem (10)";
    default: return `Level ${v}`;
  }
}
function getSafetyDescription(v) {
  switch (v) {
    case 1: return "Sangat Tidak Aman (1)";
    case 2: return "Tidak Aman (2)";
    case 3: return "Cukup Tidak Aman (3)";
    case 4: return "Sedikit Aman (4)";
    case 5: return "Sedang (5)";
    case 6: return "Agak Aman (6)";
    case 7: return "Aman (7)";
    case 8: return "Cukup Aman (8)";
    case 9: return "Sangat Aman (9)";
    case 10: return "Maksimal Aman (10)";
    default: return `Level ${v}`;
  }
}
function getFacilityDescription(v) {
  switch (v) {
    case 1: return "Sangat Buruk (1)";
    case 2: return "Buruk (2)";
    case 3: return "Cukup Buruk (3)";
    case 4: return "Sedikit Baik (4)";
    case 5: return "Sedang (5)";
    case 6: return "Agak Baik (6)";
    case 7: return "Baik (7)";
    case 8: return "Cukup Baik (8)";
    case 9: return "Sangat Baik (9)";
    case 10: return "Fasilitas Lengkap (10)";
    default: return `Level ${v}`;
  }
}
function getCampQualityDescription(v) {
  switch (v) {
    case 1: return "Sangat Buruk (1)";
    case 2: return "Buruk (2)";
    case 3: return "Cukup Buruk (3)";
    case 4: return "Sedikit Baik (4)";
    case 5: return "Sedang (5)";
    case 6: return "Agak Baik (6)";
    case 7: return "Baik (7)";
    case 8: return "Cukup Baik (8)";
    case 9: return "Sangat Baik (9)";
    case 10: return "Area Kemah Terbaik (10)";
    default: return `Level ${v}`;
  }
}
function getSceneryDescription(v) {
  switch (v) {
    case 1: return "Sangat Buruk (1)";
    case 2: return "Buruk (2)";
    case 3: return "Cukup Buruk (3)";
    case 4: return "Sedikit Indah (4)";
    case 5: return "Sedang (5)";
    case 6: return "Agak Indah (6)";
    case 7: return "Indah (7)";
    case 8: return "Cukup Indah (8)";
    case 9: return "Sangat Indah (9)";
    case 10: return "Pemandangan Spektakuler (10)";
    default: return `Level ${v}`;
  }
}
function getWaterAvailabilityDescription(v) {
  switch (v) {
    case 1: return "Sangat Sulit Air (1)";
    case 2: return "Sulit Air (2)";
    case 3: return "Cukup Sulit Air (3)";
    case 4: return "Sedikit Mudah Air (4)";
    case 5: return "Sedang (5)";
    case 6: return "Agak Mudah Air (6)";
    case 7: return "Mudah Air (7)";
    case 8: return "Cukup Mudah Air (8)";
    case 9: return "Sangat Mudah Air (9)";
    case 10: return "Air Melimpah (10)";
    default: return `Level ${v}`;
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
  // Fungsi untuk mengambil semua data gunung
  const handleShowAllMountains = async () => {
    setIsCalculating(true);
    setError(null);
    setResults([]);
    try {
      const response = await fetch(`${API_BASE_URL}/gunung`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Gagal mengambil data gunung");
      const data = await response.json();
      setResults(data.gunung || data);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCalculating(false);
    }
  };
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
  const [inputType, setInputType] = useState(INITIAL_PREFERENCES.inputType);
  const [results, setResults] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: Number(value), inputType }));
  };

  const handleReset = () => {
    setPreferences({ ...INITIAL_PREFERENCES, inputType });
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
                className={`px-4 py-2 rounded font-semibold border transition ${inputType === 'dropdown' ? 'bg-amber-900 text-white border-amber-900' : 'bg-white text-amber-900 border-amber-900'}`}
                onClick={() => { setInputType('dropdown'); setPreferences((prev) => ({ ...prev, inputType: 'dropdown' })); }}
              >
                Tampilan Pilihan
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded font-semibold border transition ${inputType === 'range' ? 'bg-amber-900 text-white border-amber-900' : 'bg-white text-amber-900 border-amber-900'}`}
                onClick={() => { setInputType('range'); setPreferences((prev) => ({ ...prev, inputType: 'range' })); }}
              >
                Tampilan Geser
              </button>
            </div>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5" onSubmit={handleRecommendationSubmit}>
            <div>
              <label
                htmlFor="max_kesulitan_skala"
                className="block font-medium text-gray-700 mb-1"
              >
                Tingkat Kesulitan Maksimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Tingkat Keamanan Minimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Durasi Maksimal Pendakian (jam)
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
                className="block font-medium text-gray-700 mb-1"
              >
                Ketinggian Maksimal (mdpl){" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Kualitas Fasilitas Minimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Kualitas Area Kemah Minimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Keindahan Pemandangan Minimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Ketersediaan Air Minimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Variasi Lanskap Minimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Perlindungan Angin Minimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Sinyal Minimal{" "}
                <span className="text-xs text-gray-500">
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
                className="block font-medium text-gray-700 mb-1"
              >
                Insiden Minimal{" "}
                <span className="text-xs text-gray-500">
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
                        src={mountain.url_thumbnail ? `${API_BASE_URL.replace('/api', '')}${mountain.url_thumbnail}` : DEFAULT_FALLBACK_IMAGE}
                        alt={mountain.nama_gunung}
                        width={220}
                        height={160}
                        className="object-cover w-full h-full group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition">{mountain.nama_gunung}</h3>
                          <span className="inline-block px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800 font-semibold ml-2">{mountain.ketinggian_puncak_mdpl} mdpl</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{mountain.lokasi_administratif}</div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-700 mb-2">
                          <span className="bg-gray-200 rounded px-2 py-1">Skor: <span className="font-bold text-amber-900">{mountain.skor_tertinggi ? mountain.skor_tertinggi.toFixed(1) : '-'}</span></span>
                          <span className="bg-gray-200 rounded px-2 py-1">Jalur Terbaik: <span className="font-semibold">{mountain.jalur_terbaik}</span></span>
                          <span className="bg-gray-200 rounded px-2 py-1">Jumlah Jalur: <span className="font-semibold">{mountain.jumlah_jalur}</span></span>
                        </div>
                        {mountain.deskripsi_singkat && (
                          <div className="text-xs text-gray-500 italic mb-2 line-clamp-2">{mountain.deskripsi_singkat}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${mountain.kategori_rekomendasi === 'Sangat Direkomendasikan' ? 'bg-green-100 text-green-700' : mountain.kategori_rekomendasi === 'Direkomendasikan' ? 'bg-blue-100 text-blue-700' : mountain.kategori_rekomendasi === 'Cukup Direkomendasikan' ? 'bg-yellow-100 text-yellow-700' : mountain.kategori_rekomendasi === 'Kurang Direkomendasikan' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>{mountain.kategori_rekomendasi}</span>
                        <Link href={`/gunung/${mountain.id_gunung}`} className="ml-auto text-amber-900 hover:underline text-xs font-semibold">Detail &rarr;</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Tambahan kurung kurawal penutup jika ada fungsi yang belum ditutup

export default ExplorePage;
