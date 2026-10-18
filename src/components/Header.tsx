"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";

const nav = [
  { href: "/tours", label: "Туры" },
  { href: "/regions", label: "Регионы" },
  { href: "/formats/group", label: "Форматы" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
  { href: "/faq", label: "FAQ" },
];

export default function Header({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#ECE9DA]/85 backdrop-blur border-b border-stone-300/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo siteName={siteName} />

        <nav className="hidden md:flex items-center gap-5">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className="text-stone-800 hover:text-amber-900 transition font-medium"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/tours" className="btn">Подобрать тур</Link>
        </nav>

        <button
          className="md:hidden text-2xl text-stone-800"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-stone-300/60 bg-[#ECE9DA] px-4 py-3 flex flex-col gap-3">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-stone-800 font-medium hover:text-amber-900"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/tours" onClick={() => setOpen(false)} className="btn text-center">
            Подобрать тур
          </Link>
        </nav>
      )}
    </header>
  );
}