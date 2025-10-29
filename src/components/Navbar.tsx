"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface Props {
  lang: "en" | "bn";
}

export default function Navbar({ lang }: Props) {
  const prefix = `/${lang}`;
  return (
    <nav className="w-full border-b py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href={`${prefix}`} className="font-semibold">
          BasaPrayer
        </Link>
        <Link href={`${prefix}/prayer`} className="text-sm">
          Prayer
        </Link>
        <Link href={`${prefix}/settings`} className="text-sm">
          Settings
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link href={lang === "en" ? "/bn" : "/en"} className="text-sm">
          {lang === "en" ? "বাংলা" : "English"}
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
