export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f7]">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col items-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f59e42"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-6"
        >
          <path d="M3 13v-2a9 9 0 0 1 18 0v2" />
          <circle cx="12" cy="17" r="2" />
          <path d="M12 19v2" />
        </svg>
        <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4 text-center">
          Website Sedang Dalam Perbaikan
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Mohon maaf, website Mountify sedang dalam proses maintenance.
          <br />
          Silakan kembali lagi nanti.
        </p>
        <span className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Mountify
        </span>
      </div>
    </div>
  );
}
