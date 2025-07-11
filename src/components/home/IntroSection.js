"use client";
import Button from "@/components/ui/Button";

export default function IntroSection() {
  return (
    <section
      className="relative flex flex-col justify-center items-center text-center min-h-[90vh] py-24 px-5 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(1,12,31,0.6),rgba(1,12,31,0.6)),url(/mount-merapi.jpg)",
      }}
    >
      <h2 className="text-white text-4xl sm:text-5xl font-bold mb-4 max-w-xl drop-shadow-lg">
        Temukan Gunung Terbaik untuk Petualangan Anda
      </h2>
      <p className="text-white text-lg max-w-lg mb-8 drop-shadow-md">
        Jelajahi berbagai rekomendasi gunung terbaik untuk mendaki, menikmati
        pemandangan, dan merasakan pengalaman petualangan yang tak terlupakan.
      </p>
      <Button to="/explore" variant="accent">
        Mulai Eksplorasi
      </Button>
    </section>
  );
}
