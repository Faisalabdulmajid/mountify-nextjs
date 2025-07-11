"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import mountifyLogo from "@/assets/icon/mountify.png";

const MenuIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CloseIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HeaderWithNavbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 z-[1010] flex items-center justify-between px-6 bg-[#142640] text-white shadow-md transition-all duration-400 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <Link href="/" className="flex items-center no-underline text-white">
        <Image
          src={mountifyLogo}
          alt="Mountify Logo"
          width={38}
          height={38}
          className="mr-3"
        />
        <h2 className="text-xl font-bold m-0">Mountify</h2>
      </Link>
      <button
        className="md:hidden flex items-center bg-transparent border-none text-white cursor-pointer z-[1011] p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      {/* Navbar Desktop: hanya tampil di md ke atas */}
      <nav
        className="md:flex hidden items-center ml-8"
        aria-label="Desktop Navigation"
      >
        <ul className="flex items-center gap-4 m-0 p-0 list-none">
          <li>
            <Link
              href="/"
              className="px-4 py-2 rounded-md font-medium hover:bg-white/10 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className="px-4 py-2 rounded-md font-medium hover:bg-white/10 transition"
            >
              Rekomendasi
            </Link>
          </li>
          <li>
            <Link
              href="/tentang"
              className="px-4 py-2 rounded-md font-medium hover:bg-white/10 transition"
            >
              Tentang
            </Link>
          </li>
          {/* Tombol Login & Daftar jika belum login */}
          {!user && (
            <>
              <li>
                <button
                  className="px-4 py-2 rounded-md font-medium bg-white/10 hover:bg-white/20 text-white transition"
                  onClick={() => alert("Login dialog")}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="px-4 py-2 rounded-md font-medium bg-[#f58554] hover:bg-[#e07041] text-[#142640] transition"
                  onClick={() => alert("Register dialog")}
                >
                  Daftar
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      {/* Navbar Mobile: hanya tampil di bawah md dan hanya saat menuOpen */}
      {menuOpen && (
        <nav
          className="flex md:hidden fixed top-0 right-0 h-full w-[290px] bg-[#0d1a2b] flex-col items-start pt-20 pb-5 px-0 shadow-lg z-[1005]"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col w-full gap-0 m-0 p-0 list-none">
            <li>
              <Link
                href="/"
                className="w-full px-8 py-4 text-left font-medium hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="w-full px-8 py-4 text-left font-medium hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
              >
                Rekomendasi
              </Link>
            </li>
            <li>
              <Link
                href="/tentang"
                className="w-full px-8 py-4 text-left font-medium hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
              >
                Tentang
              </Link>
            </li>
            {/* Tombol Login & Daftar jika belum login di mobile */}
            {!user && (
              <>
                <li>
                  <button
                    className="w-full px-8 py-4 text-left font-medium bg-white/10 hover:bg-white/20 text-white transition"
                    onClick={() => {
                      setMenuOpen(false);
                      alert("Login dialog");
                    }}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    className="w-full px-8 py-4 text-left font-medium bg-[#f58554] hover:bg-[#e07041] text-[#142640] transition"
                    onClick={() => {
                      setMenuOpen(false);
                      alert("Register dialog");
                    }}
                  >
                    Daftar
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[1000] md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}
