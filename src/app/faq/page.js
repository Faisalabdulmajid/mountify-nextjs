"use client";
import React, { useState } from "react";
import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import Footer from "@/components/layout/Footer";

const faqData = [
  {
    question: "Apa itu Mountify?",
    answer:
      "Mountify adalah sebuah platform digital berbasis web yang dirancang sebagai Sistem Pendukung Keputusan (SPK) untuk para pendaki gunung. Tujuan utama kami adalah memberikan rekomendasi jalur pendakian yang paling sesuai dengan preferensi dan kemampuan Anda, menggunakan teknologi Logika Fuzzy.",
  },
  {
    question: "Apakah layanan Mountify gratis?",
    answer:
      "Ya, semua fitur inti di Mountify, termasuk sistem rekomendasi, informasi gunung, dan artikel, sepenuhnya gratis untuk digunakan. Proyek ini dibuat untuk tujuan akademis dan untuk membantu komunitas pendaki.",
  },
  {
    question: "Bagaimana cara kerja sistem rekomendasinya?",
    answer:
      "Sistem kami menggunakan metode Logika Fuzzy. Anda memasukkan preferensi Anda (seperti tingkat kesulitan, durasi, keamanan, dll.), dan sistem akan menghitung 'skor kelayakan' untuk setiap jalur pendakian di database kami. Jalur dengan skor tertinggi akan ditampilkan sebagai rekomendasi teratas untuk Anda.",
  },
  {
    question: "Apakah data jalur pendakian di sini akurat?",
    answer:
      "Kami berusaha semaksimal mungkin untuk menyediakan data yang akurat dan terbaru. Namun, kondisi alam selalu bisa berubah. Kami sangat menyarankan Anda untuk selalu melakukan verifikasi silang dengan sumber resmi (seperti balai taman nasional terkait) sebelum melakukan pendakian.",
  },
  {
    question: "Bagaimana cara saya berkontribusi?",
    answer:
      "Kontribusi terbaik dari Anda adalah dengan memberikan ulasan setelah melakukan pendakian dan melaporkan jika ada data yang tidak akurat melalui fitur 'Lapor Error'. Partisipasi aktif Anda akan sangat membantu meningkatkan kualitas platform ini untuk semua pengguna.",
  },
  {
    question: "Siapa yang berada di balik proyek ini?",
    answer:
      "Mountify dikembangkan oleh Faisal Abdul Majid sebagai bagian dari proyek penelitian skripsi di Program Studi Teknik Informatika, Universitas Perjuangan Tasikmalaya. Anda bisa mengetahui lebih lanjut di halaman 'Tentang'.",
  },
];

const FaqItem = ({ faq, index, isOpen, onToggle }) => (
  <div className="border-b py-4">
    <button
      className="w-full text-left flex justify-between items-center font-semibold text-amber-900 focus:outline-none"
      onClick={() => onToggle(index)}
    >
      <span>{faq.question}</span>
      <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
        ▼
      </span>
    </button>
    {isOpen && <div className="mt-2 text-gray-700 text-sm">{faq.answer}</div>}
  </div>
);

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <HeaderWithNavbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2 pt-24">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
          <header className="text-center mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">
              Frequently Asked Questions (FAQ)
            </h1>
            <p className="text-gray-500">
              Punya pertanyaan? Temukan jawabannya di sini.
            </p>
          </header>
          <div className="divide-y">
            {faqData.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
