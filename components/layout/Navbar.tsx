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
      <header className="sticky top-0 z-[999] bg-white border-b border-gray-200 shadow-sm">
        
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          
          <div className="flex items-center justify-between h-[80px] lg:h-[115px]">

            {/* Logo on Left */}
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
                className="w-[110px] h-[70px] lg:w-[105px] lg:h-[105px] object-contain"
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
            <div className="hidden lg:flex flex-col items-end justify-center gap-1.5 flex-shrink-0">
              
              <a 
                href="tel:+919167867476" 
                className="flex items-center gap-1.5 text-[15px] font-black tracking-wide text-gray-800 hover:text-red-600 transition-colors pr-1 pb-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now For Urgent Inquiries: <span className="text-red-600 ml-1">+91 916 786 7476</span>
              </a>

              <div className="flex items-center gap-3 xl:gap-4">
                <div className="w-[230px] xl:w-[290px] transition-all duration-300">
                  <SearchForm />
                </div>
                <a
                  href="https://wa.me/919167867476?text=Hello%20Infinity%20Equipments%20And%20Spares,%20I%20need%20a%20quotation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-[42px] px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap text-[14px]"
                >
                  Get Quote
                </a>
              </div>
            </div>

            {/* 🌟 FIX: Mobile Menu Button made finger-friendly with proper touch target & sizing */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
              aria-label="Open Menu"
            >
              <span className="text-3xl font-extrabold leading-none">☰</span>
            </button>

          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-black/50 lg:hidden backdrop-blur-sm transition-opacity">
          <div className="absolute right-0 top-0 h-full w-[260px] max-w-full bg-white shadow-2xl overflow-y-auto">
            
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

            <div className="px-4 py-3 border-b">
              <SearchForm />
            </div>

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

            <div className="p-4 border-t bg-gray-50 flex flex-col gap-2">
              <a 
                href="tel:+919167867476"
                className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:text-red-600 py-2.5 rounded-md text-sm font-bold transition-all duration-200 shadow-sm"
              >
                Call: +91 916 786 7476
              </a>
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
