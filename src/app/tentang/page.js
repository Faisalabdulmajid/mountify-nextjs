// Halaman Tentang Mountify Next.js
import Image from "next/image";
import Link from "next/link";
import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import Footer from "@/components/layout/Footer";

export default function TentangPage() {
  const developerImage =
    "https://placehold.co/400x400/27ae60/FFFFFF?text=Faisal+A.M";
  return (
    <>
      <HeaderWithNavbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2 pt-24">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8 text-gray-800">
          <header className="text-center mb-12 pb-8 border-b border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2">
              Tentang Mountify
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Menemukan Petualangan Terbaik Anda dengan Teknologi Cerdas
            </p>
          </header>
          {/* ...existing content... */}
          <section className="mb-10">
            <div className="flex justify-center mb-4">
              <span className="text-3xl md:text-4xl text-green-600">🏁</span>
            </div>
            <h2 className="text-2xl font-semibold text-center text-amber-900 mb-4">
              Misi Kami
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-justify">
              Misi utama Mountify adalah untuk merevolusi cara para pendaki
              merencanakan petualangan mereka. Kami percaya bahwa setiap
              pendaki, dari pemula hingga ahli, berhak mendapatkan rekomendasi
              jalur yang paling sesuai dengan preferensi, kemampuan, dan gaya
              mereka. Dengan memanfaatkan kekuatan kecerdasan buatan, kami
              bertujuan untuk menghilangkan keraguan dalam memilih destinasi dan
              memastikan setiap pendakian menjadi pengalaman yang aman dan tak
              terlupakan.
            </p>
          </section>
          <section className="mb-10">
            <div className="flex justify-center mb-4">
              <span className="text-3xl md:text-4xl text-green-600">✨</span>
            </div>
            <h2 className="text-2xl font-semibold text-center text-amber-900 mb-4">
              Kisah di Balik Proyek
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-justify">
              Mountify lahir dari sebuah proyek penelitian akademis untuk
              skripsi di bidang Teknik Informatika. Proyek ini didasari oleh
              kecintaan pada alam dan teknologi, serta keinginan untuk
              menerapkan teori akademis ke dalam solusi dunia nyata. Fokus
              penelitian ini adalah pengembangan{" "}
              <span className="font-bold">
                Sistem Pendukung Keputusan (SPK)
              </span>{" "}
              yang menggunakan metode{" "}
              <span className="font-bold">Logika Fuzzy</span> untuk mengolah
              berbagai variabel pendakian yang seringkali bersifat
              subjektif—seperti &quot;kesulitan&quot; atau
              &quot;keindahan&quot;—menjadi data kuantitatif yang bisa
              menghasilkan rekomendasi akurat.
            </p>
          </section>
          <section className="mb-10">
            <div className="flex justify-center mb-4">
              <span className="text-3xl md:text-4xl text-green-600">💻</span>
            </div>
            <h2 className="text-2xl font-semibold text-center text-amber-900 mb-4">
              Teknologi yang Digunakan
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-justify">
              Aplikasi ini dibangun dengan tumpukan teknologi modern untuk
              memastikan performa yang cepat, antarmuka yang responsif, dan
              skalabilitas di masa depan.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                React.js
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                Node.js
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                Express.js
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                PostgreSQL
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                Logika Fuzzy
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                Dialogflow
              </span>
            </div>
          </section>
          <section className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-center mb-4">
              <span className="text-3xl md:text-4xl text-green-600">👤</span>
            </div>
            <h2 className="text-2xl font-semibold text-center text-amber-900 mb-4">
              Sang Kreator
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-xl shadow">
              <div className="flex-shrink-0">
                <Image
                  src={developerImage}
                  alt="Faisal Abdul Majid"
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-white shadow"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-amber-900 mb-1">
                  Faisal Abdul Majid
                </h3>
                <h4 className="text-sm text-gray-500 mb-3">
                  Mahasiswa Teknik Informatika, Universitas Perjuangan
                  Tasikmalaya
                </h4>
                <p className="text-base mb-4">
                  Seorang pengembang perangkat lunak yang antusias dengan fokus
                  pada pengembangan web dan kecerdasan buatan. Proyek Mountify
                  adalah perwujudan dari semangatnya untuk menggabungkan
                  tantangan teknis dengan hasrat untuk petualangan di alam
                  bebas.
                </p>
                <div className="flex gap-4 mt-2">
                  <Link
                    href="https://github.com/FaisalAbdulMajid"
                    target="_blank"
                    title="GitHub"
                    className="text-gray-700 hover:text-green-600 text-2xl transition"
                  >
                    <span>🐙</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/faisal-abdul-majid/"
                    target="_blank"
                    title="LinkedIn"
                    className="text-gray-700 hover:text-green-600 text-2xl transition"
                  >
                    <span>💼</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
