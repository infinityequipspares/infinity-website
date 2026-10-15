"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <footer className="bg-[#f8f9fa] font-sans mt-10 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 pt-10 pb-4 lg:pb-12">
        
        {/* Main Grid: 1 Column on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10">
          
          {/* Column 1: Company Logo & About */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/images/logo.webp"
                alt="Infinity Equipments And Spares"
                className="w-[160px] h-auto object-contain"
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-slate-600 font-medium max-w-[320px]">
              India's trusted supplier of genuine and aftermarket spare parts for heavy machinery and aerial work platforms.
            </p>
          </div>

          {/* Accordion / Links Section (Spans 2 columns on Desktop) */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-10 lg:col-span-2 w-full border-t border-slate-300 lg:border-none">
            
            {/* Quick Links */}
            <div className="flex flex-col border-b border-slate-300 lg:border-none">
              <button 
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="flex justify-between items-center w-full py-4 lg:py-0 lg:cursor-default"
              >
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900">
                  Quick Links
                </h3>
                <span className="lg:hidden text-slate-500 text-lg font-medium">
                  {quickLinksOpen ? "−" : "+"}
                </span>
              </button>
              
              <ul className={`flex flex-col gap-y-3 text-[13.5px] font-medium text-slate-600 overflow-hidden transition-all duration-300 lg:mt-5 ${quickLinksOpen ? "max-h-[500px] pb-4 lg:pb-0" : "max-h-0 lg:max-h-auto lg:overflow-visible"}`}>
                {["Home", "Products", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <Link href={link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-red-700 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
                <li><Link href="/machine-rental" className="hover:text-red-700 transition-colors">Machine Rental</Link></li>
                <li><Link href="/machine-sales" className="hover:text-red-700 transition-colors">Machine Sales</Link></li>
              </ul>
            </div>

            {/* Top Categories */}
            <div className="flex flex-col border-b border-slate-300 lg:border-none">
              <button 
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex justify-between items-center w-full py-4 lg:py-0 lg:cursor-default"
              >
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-900">
                  Top Categories
                </h3>
                <span className="lg:hidden text-slate-500 text-lg font-medium">
                  {categoriesOpen ? "−" : "+"}
                </span>
              </button>
              
              <ul className={`flex flex-col gap-y-3 text-[13.5px] font-medium text-slate-600 overflow-hidden transition-all duration-300 lg:mt-5 ${categoriesOpen ? "max-h-[500px] pb-4 lg:pb-0" : "max-h-0 lg:max-h-auto lg:overflow-visible"}`}>
                <li><Link href="/products/category/joysticks" className="hover:text-red-700 transition-colors">Joysticks</Link></li>
                <li><Link href="/products/category/electronic-modules" className="hover:text-red-700 transition-colors">Electronic Modules</Link></li>
                <li><Link href="/products/category/hydraulic-parts" className="hover:text-red-700 transition-colors">Hydraulic Parts</Link></li>
                <li><Link href="/products/category/safety-maintenance" className="hover:text-red-700 transition-colors">Safety & Maintenance</Link></li>
                <li><Link href="/products/category/starters-alternators" className="hover:text-red-700 transition-colors">Starters & Alternators</Link></li>
              </ul>
            </div>
            
          </div>

          {/* Contact Us Section */}
          <div className="flex flex-col items-center lg:items-start w-full mt-2 lg:mt-0 pb-6 lg:pb-0 border-b border-slate-300 lg:border-none">
            
            {/* Divider with Text (Mobile only) */}
            <div className="flex items-center w-full mb-6 lg:mb-5 mt-4 lg:mt-0">
              <div className="flex-1 border-t border-slate-300 lg:hidden"></div>
              <h3 className="px-4 lg:px-0 text-[13px] font-bold uppercase tracking-wider text-slate-900">
                Contact Us
              </h3>
              <div className="flex-1 border-t border-slate-300 lg:hidden"></div>
            </div>

            {/* Contact Details Wrapper */}
            <div className="text-[13.5px] text-slate-600 font-medium flex flex-col items-center lg:items-start gap-4 w-full">
              
              {/* Phones: Inline on Mobile, Stacked on Desktop */}
              <div className="flex items-center gap-2.5 w-full justify-center lg:justify-start">
                <svg className="w-[16px] h-[16px] text-red-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                
                {/* Mobile View: Standard size text, inline with / */}
                <div className="lg:hidden flex items-center justify-center gap-1.5 whitespace-nowrap text-[12px] sm:text-[13px] font-medium text-slate-600 overflow-x-auto max-w-full">
                  <a href="tel:+919167867476" className="hover:text-red-700 transition-colors">+91 916 786 7476</a>
                  <span className="text-slate-400">/</span>
                  <a href="tel:+919167867176" className="hover:text-red-700 transition-colors">+91 916 786 7176</a>
                  <span className="text-slate-400">/</span>
                  <a href="tel:+919167867472" className="hover:text-red-700 transition-colors">+91 916 786 7472</a>
                </div>
                
                {/* Desktop View: Stacked */}
                <div className="hidden lg:flex lg:flex-col lg:gap-1 text-left text-[13.5px]">
                  <a href="tel:+919167867476" className="hover:text-red-700 transition-colors">+91 916 786 7476</a>
                  <a href="tel:+919167867176" className="hover:text-red-700 transition-colors">+91 916 786 7176</a>
                  <a href="tel:+919167867472" className="hover:text-red-700 transition-colors">+91 916 786 7472</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5 w-full justify-center lg:justify-start">
                <svg className="w-[16px] h-[16px] text-red-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href="mailto:contact@infinityequipspares.com" className="hover:text-red-700 transition-colors break-all text-[13px] lg:text-[13.5px]">
                  contact@infinityequipspares.com
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5 w-full justify-center lg:justify-start">
                <svg className="w-[16px] h-[16px] mt-[3px] text-red-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="text-center lg:text-left text-[13px] lg:text-[13.5px]">Navi Mumbai, Maharashtra, India</span>
              </div>

            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Legal & Social Bar */}
      <div className="border-t border-slate-300 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-6 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
          
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 text-[12px] font-semibold text-slate-500 text-center lg:text-left">
            <span>© {new Date().getFullYear()} Infinity Equipments And Spares.</span>
            <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-400"></div>
            <div className="flex gap-4 mt-1 lg:mt-0">
                <Link href="/privacy-policy" className="hover:text-red-700 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-red-700 transition-colors">Terms of Service</Link>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-2 lg:mt-0">
              <a href="https://whatsapp.com/channel/0029VaNVcfR4Spk7xdMq3J2k" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></a>
              <a href="https://www.facebook.com/share/19za4G3tW2/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="https://instagram.com/infinityequipspares?obrf=MWxmdG8yY2h6NHgwbQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="https://www.linkedin.com/in/ishaq-ahemad-khan-161b00435?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              <a href="https://youtube.com/@infinityequipspares?si=J4WV7qG47jWJ3wUD" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
