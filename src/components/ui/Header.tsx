// src/components/ui/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Menu,
  X,
  Clock,
  Calendar,
  Compass,
  Moon,
  ChevronDown,
  Globe,
} from "lucide-react";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Language configuration
  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
    // Add more languages here as needed
    { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
    { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
    {
      code: "id",
      name: "Indonesian",
      nativeName: "Bahasa Indonesia",
      flag: "🇮🇩",
    },
    // { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
  ];

  const navItems = [
    { href: "/prayer-times", label: t("prayerTimes"), icon: Clock },
    { href: "/monthly-calendar", label: t("monthlyCalendar"), icon: Calendar },
    { href: "/forbidden-times", label: t("forbiddenTimes"), icon: Moon },
    { href: "/qibla-direction", label: t("qiblaDirection"), icon: Compass },
  ];

  // Get current language info
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when language is changed
  const handleLanguageChange = (langCode: string) => {
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(false);
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

          {/* Desktop Language Dropdown */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-green-600 hover:bg-green-700 transition-colors"
            >
              <Globe size={16} />
              <span className="min-w-[60px] text-left">
                {currentLanguage.nativeName}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isLanguageDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={pathname}
                    locale={lang.code}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                      locale === lang.code
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className="text-xs text-gray-500">{lang.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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

              {/* Mobile Language Select */}
              <div className="pt-2 border-t border-green-700 mt-2">
                <label
                  htmlFor="mobile-language-select"
                  className="block text-sm font-medium mb-2 text-green-200"
                >
                  Language / ভাষা
                </label>
                <select
                  id="mobile-language-select"
                  value={locale}
                  onChange={(e) => {
                    handleLanguageChange(e.target.value);
                  }}
                  className="w-full bg-green-800 border border-green-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Alternative Mobile Language Buttons */}
              {/* <div className="pt-2 border-t border-green-700 mt-2">
                <p className="text-sm font-medium mb-2 text-green-200">Language / ভাষা</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={pathname}
                      locale={lang.code}
                      className={`flex items-center justify-center space-x-2 px-3 py-2 rounded border text-center ${
                        locale === lang.code
                          ? "bg-white text-gray-900 border-white"
                          : "border-green-600 hover:bg-green-700"
                      }`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.nativeName}</span>
                    </Link>
                  ))}
                </div>
              </div> */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
