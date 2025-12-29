// src/components/ui/Footer.tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { FaMosque } from "react-icons/fa6";
import { Heart, Clock, Calendar, Moon, Compass } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { href: "/weekly-prayer-times", label: nav("prayerTimes"), icon: Clock },
    {
      href: "/monthly-calendar",
      label: nav("monthlyCalendar"),
      icon: Calendar,
    },
    { href: "/forbidden-times", label: nav("forbiddenTimes"), icon: Moon },
    { href: "/qibla-direction", label: nav("qiblaDirection"), icon: Compass },
  ];

  const legalLinks = [
    { href: "/privacy-policy", label: t("privacy") },
    { href: "/terms-of-service", label: t("terms") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/disclaimer", label: t("disclaimer") },
  ];

  return (
    <footer className="bg-gradient-to-b from-emerald-950 to-emerald-900 text-white">
      {/* Changed padding strategy for better side spacing */}
      <div className="mx-auto w-full max-w-screen-xl px-6 py-12 sm:px-10 md:px-12 lg:px-16">
        {/* Top section - Brand + Description */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 pb-12 border-b border-emerald-700/50">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-600/20 ring-1 ring-amber-500/30">
              <FaMosque className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                {t("brand")}
              </h3>
              <p className="mt-1 text-sm text-emerald-300/90">{t("tagline")}</p>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-prose text-sm leading-relaxed text-emerald-200/90 md:text-right md:max-w-lg">
            {t("description")}
          </p>
        </div>

        {/* Main Navigation */}
        <nav className="py-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
            {mainLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    group flex flex-col items-center gap-2.5 
                    text-sm transition-all duration-200
                    ${
                      isActive
                        ? "text-amber-400"
                        : "text-emerald-300 hover:text-white active:text-amber-300"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div
                    className={`
                      rounded-lg p-3 transition-colors
                      ${
                        isActive
                          ? "bg-amber-500/20"
                          : "bg-emerald-800/30 group-hover:bg-emerald-700/40"
                      }
                    `}
                  >
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </div>
                  <span className="text-center leading-tight">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="pt-10 border-t border-emerald-700/50">
          <div className="flex flex-col gap-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright + Made with love */}
            <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:gap-5 text-emerald-300/90">
              <span>
                © {currentYear} {t("brand")}. {t("rights")}
              </span>
              <div className="flex items-center gap-2">
                <span>{t("madeWith")}</span>
                <Heart
                  size={14}
                  className="text-rose-400 fill-current animate-pulse-slow"
                />
                <span>{t("forUmmah")}</span>
              </div>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-emerald-300/90 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Islamic phrase */}
          <div className="mt-12 text-center">
            <p className="text-xl sm:text-2xl font-arabic text-amber-500/90 tracking-wider">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="mt-2 text-xs sm:text-sm text-emerald-400/70">
              {t("bismillah")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
