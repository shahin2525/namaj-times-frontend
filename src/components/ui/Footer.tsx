// src/components/ui/Footer.tsx
"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { FaMosque } from "react-icons/fa6";
<FaMosque />;
import {
  // Mosque,
  Heart,
  Calendar,
  Compass,
  Moon,
  Clock,
  Mail,
  MapPin,
  Phone,
  Share2,
  BookOpen,
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/prayer-times", label: t("prayerTimes"), icon: Clock },
    { href: "/monthly-calendar", label: t("monthlyCalendar"), icon: Calendar },
    { href: "/forbidden-times", label: t("forbiddenTimes"), icon: Moon },
    { href: "/qibla-direction", label: t("qiblaDirection"), icon: Compass },
  ];

  const islamicResources = [
    { name: "Quran Recitation", url: "#" },
    { name: "Hadith Collection", url: "#" },
    { name: "Islamic Calendar", url: "#" },
    { name: "Dua Collection", url: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", url: "#", icon: "📘" },
    { name: "Twitter", url: "#", icon: "🐦" },
    { name: "Instagram", url: "#", icon: "📷" },
    { name: "YouTube", url: "#", icon: "🎥" },
  ];

  return (
    <footer className="bg-islamic-green text-white mt-16">
      {/* Main Footer Content */}
      <div className="container-responsive">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                {/* <Mosque  /> */}
                <FaMosque className="text-islamic-green" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">PrayerTimes</h3>
                <p className="text-green-200 text-sm">Islamic Prayer Guide</p>
              </div>
            </div>
            <p className="text-green-200 mb-4 leading-relaxed">
              Your trusted companion for accurate prayer times, Islamic
              calendar, and religious guidance. Serving the Muslim community
              worldwide.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-green-700 hover:bg-gold hover:text-islamic-green rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen size={18} className="mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center space-x-2 transition-colors group ${
                        isActive
                          ? "text-gold"
                          : "text-green-200 hover:text-white"
                      }`}
                    >
                      <Icon
                        size={16}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Islamic Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Share2 size={18} className="mr-2" />
              Islamic Resources
            </h4>
            <ul className="space-y-3">
              {islamicResources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    className="text-green-200 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-gold rounded-full"></span>
                    <span>{resource.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin size={18} className="mr-2" />
              Contact Info
            </h4>
            <div className="space-y-3 text-green-200">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gold flex-shrink-0" />
                <span>Global Muslim Community</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a
                  href="mailto:support@prayertimes.com"
                  className="hover:text-white transition-colors"
                >
                  support@prayertimes.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Prayer Times App Download */}
            <div className="mt-6 p-4 bg-green-800 rounded-lg">
              <h5 className="font-semibold mb-2">Download Our App</h5>
              <div className="flex space-x-2">
                <button className="flex-1 bg-black hover:bg-gray-800 text-white py-2 px-3 rounded text-sm transition-colors">
                  App Store
                </button>
                <button className="flex-1 bg-black hover:bg-gray-800 text-white py-2 px-3 rounded text-sm transition-colors">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AdSense Horizontal Banner */}
        <div className="py-4 border-t border-green-700">
          <div className="text-center py-4 bg-green-800 rounded-lg">
            {/* AdSense Banner Ad Space */}
            <div className="h-24 bg-green-900 rounded flex items-center justify-center">
              <span className="text-green-400">Ad Space: 728x90 Banner</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-green-200">
              <span>© {currentYear} Islamic Prayer Times.</span>
              <span className="hidden sm:inline">All rights reserved.</span>
            </div>

            {/* Made with Love */}
            <div className="flex items-center space-x-2 text-green-200">
              <span>Made with</span>
              <Heart size={16} className="text-red-400 fill-current" />
              <span>for the Muslim Ummah</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-green-200 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-green-200 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/about"
                className="text-green-200 hover:text-white transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>

        {/* Islamic Blessing */}
        <div className="border-t border-green-700 py-4 text-center">
          <p className="text-gold text-sm arabic-text text-lg mb-2">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-green-200 text-xs">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-islamic-green border-t border-green-700 z-40">
        <div className="grid grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center py-3 transition-colors ${
                  isActive ? "text-gold bg-green-800" : "text-green-200"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{link.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Add padding to account for fixed mobile nav */}
      <div className="lg:hidden h-16"></div>
    </footer>
  );
}
