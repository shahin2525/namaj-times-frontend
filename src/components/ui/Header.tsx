// // src/components/ui/Header.tsx
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X, Clock, Calendar, Compass, Moon } from "lucide-react";

// interface HeaderProps {
//   locale: string;
// }

// const navItems = [
//   { href: "/prayer-times", label: "Prayer Times", icon: Clock },
//   { href: "/monthly-calendar", label: "Monthly Calendar", icon: Calendar },
//   { href: "/forbidden-times", label: "Forbidden Times", icon: Moon },
//   { href: "/qibla-direction", label: "Qibla Direction", icon: Compass },
// ];

// export default function Header({ locale }: HeaderProps) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   return (
//     <header className="bg-islamic-green text-white shadow-lg sticky top-0 z-50">
//       <div className="container-responsive">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href={`/${locale}`} className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
//               <span className="text-islamic-green font-bold text-sm">☪</span>
//             </div>
//             <span className="text-xl font-bold">PrayerTimes</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname.includes(item.href);
//               return (
//                 <Link
//                   key={item.href}
//                   href={`/${locale}${item.href}`}
//                   className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                     isActive
//                       ? "bg-white text-islamic-green"
//                       : "hover:bg-green-700"
//                   }`}
//                 >
//                   <Icon size={16} />
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <nav className="md:hidden py-4 border-t border-green-700">
//             <div className="flex flex-col space-y-2">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = pathname.includes(item.href);
//                 return (
//                   <Link
//                     key={item.href}
//                     href={`/${locale}${item.href}`}
//                     className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
//                       isActive
//                         ? "bg-white text-islamic-green"
//                         : "hover:bg-green-700"
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Icon size={18} />
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }
// src/components/ui/Header.tsx
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X, Clock, Calendar, Compass, Moon } from "lucide-react";

// interface HeaderProps {
//   locale: string;
// }

// // Navigation items with Bengali support
// const navItems = {
//   en: [
//     { href: "/prayer-times", label: "Prayer Times", icon: Clock },
//     { href: "/monthly-calendar", label: "Monthly Calendar", icon: Calendar },
//     { href: "/forbidden-times", label: "Forbidden Times", icon: Moon },
//     { href: "/qibla-direction", label: "Qibla Direction", icon: Compass },
//   ],
//   bn: [
//     { href: "/prayer-times", label: "নামাজের সময়", icon: Clock },
//     { href: "/monthly-calendar", label: "মাসিক ক্যালেন্ডার", icon: Calendar },
//     { href: "/forbidden-times", label: "নিষিদ্ধ সময়", icon: Moon },
//     { href: "/qibla-direction", label: "কিবলা দিক", icon: Compass },
//   ],
// };

// export default function Header({ locale }: HeaderProps) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const currentNavItems =
//     navItems[locale as keyof typeof navItems] || navItems.en;

//   return (
//     <header className="bg-islamic-green text-white shadow-lg sticky top-0 z-50">
//       <div className="container-responsive">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href={`/${locale}`} className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
//               <span className="text-islamic-green font-bold text-sm">☪</span>
//             </div>
//             <span className="text-xl font-bold">
//               {locale === "bn" ? "নামাজের সময়" : "PrayerTimes"}
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             {currentNavItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname.includes(item.href);
//               return (
//                 <Link
//                   key={item.href}
//                   href={`/${locale}${item.href}`}
//                   className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                     isActive
//                       ? "bg-white text-islamic-green"
//                       : "hover:bg-green-700"
//                   }`}
//                 >
//                   <Icon size={16} />
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Language Switcher */}
//           <div className="hidden md:flex items-center space-x-2">
//             <Link
//               href={`/en${pathname.replace(/^\/(en|bn)/, "")}`}
//               className={`px-3 py-1 rounded ${
//                 locale === "en"
//                   ? "bg-white text-islamic-green"
//                   : "hover:bg-green-700"
//               }`}
//             >
//               EN
//             </Link>
//             <Link
//               href={`/bn${pathname.replace(/^\/(en|bn)/, "")}`}
//               className={`px-3 py-1 rounded ${
//                 locale === "bn"
//                   ? "bg-white text-islamic-green"
//                   : "hover:bg-green-700"
//               }`}
//             >
//               বাংলা
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <nav className="md:hidden py-4 border-t border-green-700">
//             <div className="flex flex-col space-y-2">
//               {currentNavItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = pathname.includes(item.href);
//                 return (
//                   <Link
//                     key={item.href}
//                     href={`/${locale}${item.href}`}
//                     className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
//                       isActive
//                         ? "bg-white text-islamic-green"
//                         : "hover:bg-green-700"
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Icon size={18} />
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}

//               {/* Mobile Language Switcher */}
//               <div className="flex space-x-2 pt-2 border-t border-green-700 mt-2">
//                 <Link
//                   href={`/en${pathname.replace(/^\/(en|bn)/, "")}`}
//                   className={`flex-1 text-center px-3 py-2 rounded ${
//                     locale === "en"
//                       ? "bg-white text-islamic-green"
//                       : "hover:bg-green-700"
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   English
//                 </Link>
//                 <Link
//                   href={`/bn${pathname.replace(/^\/(en|bn)/, "")}`}
//                   className={`flex-1 text-center px-3 py-2 rounded ${
//                     locale === "bn"
//                       ? "bg-white text-islamic-green"
//                       : "hover:bg-green-700"
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   বাংলা
//                 </Link>
//               </div>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }
// src/components/ui/Header.tsx
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { Menu, X, Clock, Calendar, Compass, Moon } from "lucide-react";

// interface HeaderProps {
//   locale: string;
// }

// export default function Header({ locale }: HeaderProps) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const t = useTranslations("Navigation");

//   const navItems = [
//     { href: "/prayer-times", label: t("prayerTimes"), icon: Clock },
//     { href: "/monthly-calendar", label: t("monthlyCalendar"), icon: Calendar },
//     { href: "/forbidden-times", label: t("forbiddenTimes"), icon: Moon },
//     { href: "/qibla-direction", label: t("qiblaDirection"), icon: Compass },
//   ];

//   return (
//     <header className="bg-islamic-green text-white shadow-lg sticky top-0 z-50">
//       <div className="container-responsive">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href={`/${locale}`} className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
//               <span className="text-islamic-green font-bold text-sm">☪</span>
//             </div>
//             <span className="text-xl font-bold">
//               {locale === "bn" ? "নামাজের সময়" : "PrayerTimes"}
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname.includes(item.href);
//               return (
//                 <Link
//                   key={item.href}
//                   href={`/${locale}${item.href}`}
//                   className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                     isActive
//                       ? "bg-white text-islamic-green"
//                       : "hover:bg-green-700"
//                   }`}
//                 >
//                   <Icon size={16} />
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Language Switcher */}
//           <div className="hidden md:flex items-center space-x-2">
//             <Link
//               href={`/en${pathname.replace(/^\/(en|bn)/, "")}`}
//               className={`px-3 py-1 rounded ${
//                 locale === "en"
//                   ? "bg-white text-islamic-green"
//                   : "hover:bg-green-700"
//               }`}
//             >
//               EN
//             </Link>
//             <Link
//               href={`/bn${pathname.replace(/^\/(en|bn)/, "")}`}
//               className={`px-3 py-1 rounded ${
//                 locale === "bn"
//                   ? "bg-white text-islamic-green"
//                   : "hover:bg-green-700"
//               }`}
//             >
//               বাংলা
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <nav className="md:hidden py-4 border-t border-green-700">
//             <div className="flex flex-col space-y-2">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = pathname.includes(item.href);
//                 return (
//                   <Link
//                     key={item.href}
//                     href={`/${locale}${item.href}`}
//                     className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
//                       isActive
//                         ? "bg-white text-islamic-green"
//                         : "hover:bg-green-700"
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Icon size={18} />
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}

//               {/* Mobile Language Switcher */}
//               <div className="flex space-x-2 pt-2 border-t border-green-700 mt-2">
//                 <Link
//                   href={`/en${pathname.replace(/^\/(en|bn)/, "")}`}
//                   className={`flex-1 text-center px-3 py-2 rounded ${
//                     locale === "en"
//                       ? "bg-white text-islamic-green"
//                       : "hover:bg-green-700"
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   English
//                 </Link>
//                 <Link
//                   href={`/bn${pathname.replace(/^\/(en|bn)/, "")}`}
//                   className={`flex-1 text-center px-3 py-2 rounded ${
//                     locale === "bn"
//                       ? "bg-white text-islamic-green"
//                       : "hover:bg-green-700"
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   বাংলা
//                 </Link>
//               </div>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }
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

  const navItems = [
    { href: "/prayer-times", label: t("prayerTimes"), icon: Clock },
    { href: "/monthly-calendar", label: t("monthlyCalendar"), icon: Calendar },
    { href: "/forbidden-times", label: t("forbiddenTimes"), icon: Moon },
    { href: "/qibla-direction", label: t("qiblaDirection"), icon: Compass },
  ];

  return (
    <header className="bg-islamic-green text-white shadow-lg sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <span className="text-islamic-green font-bold text-sm">☪</span>
            </div>
            <span className="text-xl font-bold">
              {locale === "bn" ? "নামাজের সময়" : "PrayerTimes"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-islamic-green"
                      : "hover:bg-green-700"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href={pathname}
              locale="en"
              className={`px-3 py-1 rounded ${
                locale === "en"
                  ? "bg-white text-islamic-green"
                  : "hover:bg-green-700"
              }`}
            >
              EN
            </Link>
            <Link
              href={pathname}
              locale="bn"
              className={`px-3 py-1 rounded ${
                locale === "bn"
                  ? "bg-white text-islamic-green"
                  : "hover:bg-green-700"
              }`}
            >
              বাংলা
            </Link>
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
                      isActive
                        ? "bg-white text-islamic-green"
                        : "hover:bg-green-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <div className="flex space-x-2 pt-2 border-t border-green-700 mt-2">
                <Link
                  href={pathname}
                  locale="en"
                  className={`flex-1 text-center px-3 py-2 rounded ${
                    locale === "en"
                      ? "bg-white text-islamic-green"
                      : "hover:bg-green-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  English
                </Link>
                <Link
                  href={pathname}
                  locale="bn"
                  className={`flex-1 text-center px-3 py-2 rounded ${
                    locale === "bn"
                      ? "bg-white text-islamic-green"
                      : "hover:bg-green-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  বাংলা
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
