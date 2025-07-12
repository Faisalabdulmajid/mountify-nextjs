import React from "react";

export default function AnnouncementSection() {
  // Contoh data pengumuman, bisa diganti dengan fetch API jika backend tersedia
  const announcements = [
    {
      id: 1,
      title: "Perhatian! Musim Hujan di Beberapa Jalur Pendakian",
      content:
        "Beberapa jalur pendakian ditutup sementara karena cuaca ekstrem. Pastikan cek status jalur sebelum berangkat.",
      date: "12 Juli 2025",
    },
    {
      id: 2,
      title: "Update Protokol Kesehatan",
      content:
        "Pendaki wajib membawa masker dan hand sanitizer. Ikuti protokol kesehatan di basecamp dan jalur pendakian.",
      date: "10 Juli 2025",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center py-4 px-2 mb-8">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                fill="currentColor"
              />
            </svg>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-900">
            Pengumuman
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 bg-white border border-yellow-200 rounded-lg shadow-sm px-4 py-3"
            >
              <span className="mt-1 text-yellow-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#FEF08A" />
                  <path
                    d="M12 7v4m0 4h.01"
                    stroke="#CA8A04"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                  <span className="font-semibold text-yellow-800 text-base truncate">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {item.date}
                  </span>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed break-words">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
