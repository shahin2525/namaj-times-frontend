// src/components/ui/Header.tsx
"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Clock, Calendar, Compass, Moon } from "lucide-react";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  // Language configuration
  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    // Add more languages here as needed
  ];

  const navItems = [
    { href: "/prayer-times", label: t("prayerTimes"), icon: Clock },
    { href: "/monthly-calendar", label: t("monthlyCalendar"), icon: Calendar },
    { href: "/forbidden-times", label: t("forbiddenTimes"), icon: Moon },
    { href: "/qibla-direction", label: t("qiblaDirection"), icon: Compass },
  ];

  // Get app name based on locale
  const getAppName = () => {
    switch (locale) {
      case "bn":
        return "নামাজের সময়";
      case "hi":
        return "नमाज का समय";
      case "ar":
        return "أوقات الصلاة";
      default:
        return "PrayerTimes";
    }
  };

  return (
    <header className="bg-islamic-green text-white shadow-lg sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <span className="text-islamic-green font-bold text-sm">☪</span>
            </div>
            <span className="text-xl font-bold">{getAppName()}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-white text-gray-900" : "hover:bg-green-700"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={pathname}
                locale={lang.code}
                className={`px-3 py-1 rounded border text-sm ${
                  locale === lang.code
                    ? "bg-white text-gray-900 border-white"
                    : "hover:bg-green-700 border-transparent"
                }`}
                title={lang.name}
              >
                {lang.nativeName}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-green-700">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                      isActive ? "bg-white text-gray-900" : "hover:bg-green-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <div className="flex flex-col space-y-2 pt-2 border-t border-green-700 mt-2">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={pathname}
                    locale={lang.code}
                    className={`px-3 py-2 rounded border text-center ${
                      locale === lang.code
                        ? "bg-white text-gray-900 border-white"
                        : "hover:bg-green-700 border-transparent"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {lang.nativeName} ({lang.name})
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
