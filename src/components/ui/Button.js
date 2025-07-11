"use client";
import Link from "next/link";

export default function Button({
  to,
  href,
  children,
  className = "",
  variant = "accent",
  ...props
}) {
  const base =
    "inline-block font-semibold rounded-lg transition px-6 py-3 text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f58554]";
  let color = "";
  if (variant === "accent") {
    color = "bg-[#f58554] hover:bg-[#e07041] text-[#142640]";
  } else if (variant === "secondary") {
    color = "bg-white/10 hover:bg-white/20 text-white";
  } else {
    color = "bg-gray-200 hover:bg-gray-300 text-gray-900";
  }
  if (to || href) {
    return (
      <Link
        href={to || href}
        className={`${base} ${color} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }
  return (
    <button className={`${base} ${color} ${className}`} {...props}>
      {children}
    </button>
  );
}
