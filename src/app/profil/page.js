"use client";
import React, { useEffect, useState } from "react";
import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Gagal memuat data profil");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return (
    <>
      <HeaderWithNavbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-2 pt-24">
        <div className="w-full max-w-xl bg-white rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold mb-6 text-amber-900 text-center">
            Profil Saya
          </h1>
          {loading ? (
            <div className="text-center text-gray-400 py-10">
              Memuat data profil...
            </div>
          ) : error ? (
            <div className="text-center text-red-600 font-semibold py-10">
              {error}
            </div>
          ) : profile ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {profile.foto_url ? (
                  <Image
                    src={profile.foto_url}
                    alt="Foto Profil"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-5xl text-gray-400">👤</span>
                )}
              </div>
              <div className="text-lg font-bold text-amber-900">
                {profile.nama}
              </div>
              <div className="text-sm text-gray-600">{profile.email}</div>
              <div className="text-sm text-gray-600">
                {profile.role ? `Peran: ${profile.role}` : null}
              </div>
              <div className="mt-6 w-full">
                <h2 className="text-md font-semibold mb-2 text-gray-700">
                  Info Lainnya
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {profile.no_hp && <li>No HP: {profile.no_hp}</li>}
                  {profile.alamat && <li>Alamat: {profile.alamat}</li>}
                  {/* Tambahkan info lain sesuai kebutuhan */}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-10">
              Data profil tidak ditemukan.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
