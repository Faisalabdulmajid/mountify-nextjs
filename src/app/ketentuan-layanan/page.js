"use client";
import HeaderWithNavbar from "@/components/layout/HeaderWithNavbar";
import Footer from "@/components/layout/Footer";

export default function KetentuanLayananPage() {
  return (
    <>
      <HeaderWithNavbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2 pt-24">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
          <header className="text-center mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">
              Ketentuan Layanan
            </h1>
            <p className="text-gray-500">Terakhir diperbarui: 24 Juni 2025</p>
          </header>
          <section className="mb-6">
            <p className="mb-2">
              Selamat datang di Mountify! Ketentuan Layanan
              (&quot;Ketentuan&quot;) ini mengatur akses Anda ke dan penggunaan
              platform kami. Dengan mengakses atau menggunakan layanan kami,
              Anda setuju untuk terikat oleh Ketentuan ini.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Penerimaan Ketentuan
            </h2>
            <p>
              Dengan membuat akun atau menggunakan Layanan Mountify, Anda
              mengonfirmasi bahwa Anda telah membaca, memahami, dan setuju untuk
              terikat oleh semua Ketentuan ini. Jika Anda tidak setuju dengan
              Ketentuan ini, maka Anda dilarang menggunakan layanan kami dan
              harus menghentikan penggunaan dengan segera.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Penggunaan Layanan
            </h2>
            <ul className="list-disc pl-6 mb-2 text-gray-700">
              <li>
                <strong>Kelayakan:</strong> Anda harus berusia minimal 13 tahun
                untuk menggunakan Layanan kami.
              </li>
              <li>
                <strong>Pendaftaran Akun:</strong> Anda setuju untuk memberikan
                informasi yang akurat, terkini, dan lengkap selama proses
                pendaftaran dan memperbarui informasi tersebut agar tetap
                akurat.
              </li>
              <li>
                <strong>Penggunaan yang Diizinkan:</strong> Anda setuju untuk
                menggunakan Layanan kami hanya untuk tujuan yang sah dan sesuai
                dengan Ketentuan ini. Anda tidak akan menggunakan layanan untuk
                aktivitas ilegal atau yang melanggar hak orang lain.
              </li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Konten Pengguna
            </h2>
            <p>
              Anda bertanggung jawab penuh atas konten (seperti ulasan, foto,
              dan komentar) yang Anda unggah ke platform. Dengan mengunggah
              konten, Anda memberikan kami lisensi non-eksklusif, bebas royalti,
              di seluruh dunia untuk menggunakan, menampilkan, dan
              mendistribusikan konten Anda sehubungan dengan pengoperasian
              Layanan.
            </p>
            <p>
              Anda setuju untuk tidak mengunggah konten yang melanggar hukum,
              memfitnah, cabul, atau melanggar hak kekayaan intelektual pihak
              ketiga.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Batasan Tanggung Jawab (Disclaimer)
            </h2>
            <p>
              Informasi pendakian (termasuk tingkat kesulitan, keamanan, dan
              estimasi waktu) yang disediakan di Mountify adalah untuk tujuan
              informasi umum dan rekomendasi. Informasi ini tidak dimaksudkan
              sebagai pengganti penilaian profesional, pengalaman pribadi, atau
              panduan dari pemandu lokal.
            </p>
            <p>
              Aktivitas mendaki gunung memiliki risiko yang melekat. Anda
              bertanggung jawab penuh atas keselamatan Anda sendiri. Mountify
              tidak bertanggung jawab atas cedera, kerugian, atau kerusakan apa
              pun yang mungkin Anda alami sebagai akibat dari penggunaan
              informasi di platform ini. Selalu lakukan riset tambahan dan
              persiapkan diri dengan baik sebelum melakukan pendakian.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="font-semibold text-amber-900 mb-2">
              Penghentian Akun
            </h2>
            <p>
              Kami berhak untuk menangguhkan atau menghentikan akun Anda kapan
              saja, tanpa pemberitahuan sebelumnya, jika Anda melanggar
              Ketentuan ini atau terlibat dalam perilaku yang kami anggap
              membahayakan platform atau pengguna lain.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-amber-900 mb-2">Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan atau komentar tentang Ketentuan
              Layanan ini, silakan hubungi kami melalui email di:{" "}
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
