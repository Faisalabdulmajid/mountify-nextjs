"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#142640] text-white pt-12 pb-6 px-4 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 footer-container">
        {/* Branding & Info Kontak */}
        <div>
          <h4 className="text-xl font-bold mb-2">Mountify</h4>
          <p className="mb-3 text-sm opacity-80">
            Temukan jalur pendakian terbaikmu.
          </p>
          <ul className="text-sm opacity-80">
            <li>Email: faisalabdulmajid.dev@gmail.com</li>
            <li>Telepon: +62 812 3456 7890</li>
          </ul>
        </div>
        {/* Navigasi Cepat */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Navigasi</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore" className="hover:underline">
                Rekomendasi
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:underline">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Masuk / Daftar
              </Link>
            </li>
          </ul>
        </div>
        {/* Bantuan & Kebijakan */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Bantuan & Kebijakan</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link href="/ketentuan-layanan" className="hover:underline">
                Ketentuan Layanan
              </Link>
            </li>
            <li>
              <Link href="/lapor-error" className="hover:underline">
                Laporkan Error
              </Link>
            </li>
          </ul>
        </div>
        {/* Ikuti Kami */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Ikuti Kami</h4>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#f58554]"
            >
              <i className="bi bi-facebook text-2xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#f58554]"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>
            <a
              href="https://youtube.com/YOURCHANNEL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#f58554]"
            >
              <i className="bi bi-youtube text-2xl"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-[#f58554]"
            >
              <i className="bi bi-github text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Mountify. Dibuat dengan semangat
        petualangan.
      </div>
    </footer>
  );
}
