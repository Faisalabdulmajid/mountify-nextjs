import HeaderWithNavbar from "../../components/layout/HeaderWithNavbar";
import Footer from "../../components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <HeaderWithNavbar />
      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-green-700">
          Kebijakan Privasi
        </h1>
        <section className="space-y-4">
          <p>
            Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini
            menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi
            informasi pribadi Anda saat menggunakan layanan Mountify.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Informasi yang Kami Kumpulkan
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Informasi akun seperti nama, email, dan data profil.</li>
            <li>Data aktivitas penggunaan aplikasi.</li>
            <li>Informasi teknis seperti perangkat dan browser.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Penggunaan Informasi
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Meningkatkan layanan dan pengalaman pengguna.</li>
            <li>Memberikan rekomendasi yang relevan.</li>
            <li>Menjaga keamanan dan mencegah penyalahgunaan.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2">Perlindungan Data</h2>
          <p>
            Kami berkomitmen menjaga keamanan data Anda dan tidak membagikan
            informasi pribadi kepada pihak ketiga tanpa izin Anda, kecuali
            diwajibkan oleh hukum.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Perubahan Kebijakan
          </h2>
          <p>
            Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan akan
            diinformasikan melalui aplikasi atau email.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
