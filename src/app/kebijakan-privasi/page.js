"use client";
import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <HeaderWithNavbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2 pt-24">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
          <header className="text-center mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">
              Kebijakan Privasi
            </h1>
            <p className="text-gray-500">Terakhir diperbarui: 24 Juni 2025</p>
          </header>
          <section className="mb-6">
            <p className="mb-2">
              Selamat datang di Mountify. Kami menghargai privasi Anda dan
              berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi
              ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
              mengungkapkan, dan menjaga informasi Anda saat Anda menggunakan
              platform kami.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Informasi yang Kami Kumpulkan
            </h2>
            <ul className="list-disc pl-6 mb-2 text-gray-700">
              <li>
                <strong>Informasi Akun:</strong> Nama lengkap, username, email,
                dan password yang sudah di-hash.
              </li>
              <li>
                <strong>Informasi Profil:</strong> Domisili, instansi, foto
                profil (opsional).
              </li>
              <li>
                <strong>Konten Buatan Pengguna:</strong> Ulasan, foto galeri,
                laporan error, artikel.
              </li>
              <li>
                <strong>Data untuk Rekomendasi:</strong> Preferensi yang Anda
                masukkan ke SPK.
              </li>
              <li>
                <strong>Informasi Penggunaan:</strong> Interaksi Anda dengan
                layanan, halaman yang dikunjungi, fitur yang digunakan.
              </li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Bagaimana Kami Menggunakan Informasi Anda
            </h2>
            <ul className="list-disc pl-6 mb-2 text-gray-700">
              <li>Membuat dan mengelola akun Anda.</li>
              <li>
                Menyediakan rekomendasi gunung dan jalur pendakian yang
                dipersonalisasi.
              </li>
              <li>
                Mengirimkan email notifikasi terkait akun atau pembaruan
                layanan.
              </li>
              <li>Meningkatkan efisiensi dan pengoperasian platform.</li>
              <li>
                Menganalisis penggunaan dan tren untuk meningkatkan pengalaman
                Anda.
              </li>
              <li>
                Menanggapi laporan error dan memberikan dukungan pelanggan.
              </li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Keamanan Informasi Anda
            </h2>
            <p className="mb-2">
              Kami menggunakan langkah-langkah keamanan administratif, teknis,
              dan fisik untuk membantu melindungi informasi pribadi Anda. Kata
              sandi Anda disimpan menggunakan teknik hashing yang kuat, dan kami
              membatasi akses ke data pribadi hanya kepada personel yang
              berwenang. Tidak ada tindakan keamanan yang sempurna atau tidak
              dapat ditembus.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Perubahan pada Kebijakan Ini
            </h2>
            <p className="mb-2">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.
              Versi yang diperbarui akan ditandai dengan tanggal &quot;Terakhir
              diperbarui&quot; dan berlaku segera setelah dapat diakses. Tinjau
              kebijakan ini secara berkala untuk informasi terbaru.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-amber-900 mb-2">Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan
              Privasi ini, silakan hubungi kami melalui email di:{" "}
              <a
                href="mailto:fasalabdulmajid.dev@gmail.com"
                className="text-green-700 underline"
              >
                fasalabdulmajid.dev@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
