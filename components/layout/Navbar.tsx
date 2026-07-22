"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import SearchForm from "@/components/common/SearchForm";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 🌟 FIX: Changed z-50 to z-[999] so Header is always on top */}
      <header className="sticky top-0 z-[999] bg-white border-b border-gray-200 shadow-sm">
        
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          
          <div className="flex items-center justify-between h-[115px]">

            {/* Dummy Spacer for exact Mobile Centering (Hidden on Desktop) */}
            <div className="w-10 lg:hidden flex-shrink-0"></div>

            {/* Logo - Fixed square dimensions */}
            <Link
              href="/"
              className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/images/logo.png"
                alt="Infinity Equipments And Spares"
                width={105}
                height={105}
                priority
                className="w-[105px] h-[105px] object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5">
              {navigation.map((item, index) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={`${item.name}-${index}`}
                    href={item.href}
                    className={`px-3.5 py-2.5 rounded-lg text-[14.5px] font-bold transition-all duration-200 whitespace-nowrap ${
                      active
                        ? "bg-red-600 text-white shadow"
                        : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
              
              <div className="w-[230px] xl:w-[290px] transition-all duration-300">
                <SearchForm />
              </div>

              <a
                href="https://wa.me/919167867476?text=Hello%20Infinity%20Equipments%20And%20Spares,%20I%20need%20a%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                Get Quote
              </a>
              
            </div>

            {/* Mobile Menu Button - width fixed to balance the logo exactly in center */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 flex justify-end text-3xl font-bold text-gray-700 hover:text-red-600 transition-colors flex-shrink-0"
            >
              ☰
            </button>

          </div>
        </div>
      </header>
      
      {/* 🌟 UPGRADED COMPACT MOBILE MENU 🌟 */}
      {menuOpen && (
        /* 🌟 FIX: Changed z-50 to z-[999] so Mobile Menu is always on top */
        <div className="fixed inset-0 z-[999] bg-black/50 lg:hidden backdrop-blur-sm transition-opacity">
          {/* Width reduced from 320px to 260px for a sleeker look */}
          <div className="absolute right-0 top-0 h-full w-[260px] max-w-full bg-white shadow-2xl overflow-y-auto">
            
            {/* Header Padding & Text Size Reduced */}
            <div className="flex items-center justify-between border-b px-4 py-3 bg-gray-50">
              <div>
                <h2 className="text-base font-bold text-gray-900">Menu</h2>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                  Infinity Equipments
                </p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl leading-none text-gray-500 hover:text-red-600 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Search Padding Reduced */}
            <div className="px-4 py-3 border-b">
              <SearchForm />
            </div>

            {/* Nav Links Gap & Padding Reduced */}
            <nav className="flex flex-col p-3">
              {navigation.map((item, index) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={`mobile-${item.name}-${index}`}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-md px-3 py-2 mb-1.5 text-sm font-bold transition-all duration-200 ${
                      active
                        ? "bg-red-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer Button Size Adjusted */}
            <div className="p-4 border-t bg-gray-50">
              <a
                href="https://wa.me/919167867476?text=Hello%20Infinity%20Equipments%20And%20Spares,%20I%20need%20a%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md text-sm font-bold transition-all duration-200 shadow-sm"
              >
                Get Quote
              </a>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
