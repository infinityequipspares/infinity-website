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

  const hideSearch = 
    pathname === "/" || 
    pathname === "/products" || 
    pathname.startsWith("/products/category");

  return (
    <>
      <header className="sticky top-0 z-[999] bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
        
        <div className="max-w-[1440px] mx-auto px-2 lg:px-4">
          
          <div className="flex items-center justify-between h-[75px] lg:h-[90px]">

            {/* 1. Logo AND Text on extreme Left */}
            <div className="flex lg:flex-[1.2] justify-start h-full items-center pl-1 lg:pl-2">
              <Link
                href="/"
                className="group relative flex flex-shrink-0 items-center gap-2.5 transition-all duration-500 hover:scale-[1.01]"
              >
                <div className="relative">
                  <div className="absolute inset-1 rounded-full bg-red-600/5 blur-xl group-hover:bg-red-600/20 group-hover:scale-110 transition-all duration-500"></div>
                  <Image
                    src="/images/logo.webp"
                    alt="Infinity Equipments And Spares Logo"
                    width={150} 
                    height={150} 
                    priority
                    className="relative z-10 w-auto h-[55px] lg:h-[70px] object-contain drop-shadow-sm transition-all duration-500"
                  />
                </div>
                
                <div className="flex flex-col justify-center border-l-[1.5px] border-gray-300 pl-2.5">
                  <span className="text-[12px] lg:text-[15px] font-[900] uppercase text-gray-900 leading-tight tracking-wider">
                    Infinity Equipments
                  </span>
                  <span className="text-[11px] lg:text-[14px] font-[900] uppercase text-[#e60000] leading-none mt-1 tracking-widest">
                    And Spares
                  </span>
                </div>
              </Link>
            </div>

            {/* 2. Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
              {navigation.map((item, index) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={`${item.name}-${index}`}
                    href={item.href}
                    className={`px-3.5 py-2 rounded-md text-[13.5px] font-bold transition-all duration-200 whitespace-nowrap ${
                      active
                        ? "bg-[#e60000] text-white shadow-sm"
                        : "text-gray-700 hover:text-[#e60000] hover:bg-red-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Desktop Right Side */}
            <div className="hidden lg:flex lg:flex-[1.3] items-center justify-end gap-2.5 flex-shrink-0">
              
              {!hideSearch ? (
                <div className="flex items-center gap-2 transition-all duration-300">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Quick Search:
                  </span>
                  <div className="w-[240px] xl:w-[290px]">
                    <SearchForm />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 pr-1 lg:pr-2">
                  <a 
                    href="tel:+919167867476" 
                    className="flex flex-col text-right group"
                  >
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">
                      Sales & Support
                    </span>
                    <span className="text-[14px] font-[900] text-gray-900 group-hover:text-[#e60000] transition-colors">
                      +91 916 786 7476
                    </span>
                  </a>

                  <a
                    href="https://wa.me/919167867476?text=Hello%20Infinity%20Equipments%20And%20Spares,%20I%20need%20a%20quotation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center h-[38px] px-5 rounded-md bg-[#e60000] hover:bg-[#cc0000] text-white font-bold transition-all duration-300 shadow hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap text-[13px] overflow-hidden group ml-1"
                  >
                     <span className="relative flex items-center gap-1.5">
                       Get Quote
                       <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                     </span>
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Right Side */}
            <div className="flex items-center justify-end gap-2 lg:hidden h-full pr-1">
              
              <a 
                href="tel:+919167867476"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-[#e60000] border border-red-100 flex-shrink-0 shadow-sm"
                aria-label="Call Now"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 1h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </a>

              <button
                onClick={() => setMenuOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-md text-gray-700 bg-gray-50 border border-gray-200 transition-colors flex-shrink-0 shadow-sm"
                aria-label="Open Menu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

            </div>

          </div>
        </div>
      </header>
      
      {/* Mobile Menu (Sliding Panel) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="absolute right-0 top-0 h-full w-[280px] max-w-full bg-white shadow-2xl overflow-y-auto z-10 flex flex-col transition-transform duration-300">
            
            {/* Mobile Menu Header with Larger Company Name & Menu below */}
            <div className="flex items-start justify-between border-b px-5 py-4 bg-gray-50/80">
              <div className="flex flex-col gap-2.5">
                {/* 🌟 Larger & Bold Company Name in Mobile Menu 🌟 */}
                <div className="flex flex-col">
                   <span className="text-[13px] uppercase text-gray-900 tracking-wider leading-tight font-[900]">
                     Infinity Equipments
                   </span>
                   <span className="text-[12px] uppercase text-[#e60000] tracking-widest leading-none mt-1 font-[900]">
                     And Spares
                   </span>
                </div>
                {/* Menu Heading below */}
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mt-0.5">Menu</h2>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-[#e60000] transition-colors mt-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {!hideSearch && (
              <div className="px-5 py-4 border-b">
                <SearchForm onComplete={() => setMenuOpen(false)} />
              </div>
            )}

            <nav className="flex flex-col p-4">
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
                    className={`rounded-md px-4 py-3 mb-2 text-[14px] font-bold transition-all duration-200 ${
                      active
                        ? "bg-[#e60000] text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#e60000]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-5 border-t bg-gray-50 flex flex-col gap-3 mt-auto">
              <a 
                href="tel:+919167867476"
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 hover:text-[#e60000] hover:border-red-200 py-3 rounded-md text-[14px] font-bold transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 text-[#e60000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 1h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                Call: +91 916 786 7476
              </a>
              <a
                href="https://wa.me/919167867476?text=Hello%20Infinity%20Equipments%20And%20Spares,%20I%20need%20a%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#e60000] hover:bg-[#cc0000] text-white py-3 rounded-md text-[14px] font-bold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
