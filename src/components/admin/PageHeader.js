"use client";
import Link from "next/link";

export default function PageHeader({
  title,
  buttonText,
  buttonHref,
  buttonColor = "green",
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1
        className={`text-3xl font-extrabold text-${buttonColor}-700 tracking-tight drop-shadow`}
      >
        {title}
      </h1>
      {buttonText && buttonHref && (
        <Link
          href={buttonHref}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-${buttonColor}-600 text-white font-semibold shadow hover:bg-${buttonColor}-700 transition`}
        >
          <i className="bi bi-plus-lg"></i> {buttonText}
        </Link>
      )}
    </div>
  );
}
