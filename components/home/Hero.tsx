"use client";

import Link from "next/link";
import SearchForm from "@/components/common/SearchForm";

export default function Hero() {
  return (
    // Yaaha overflow-visible use kiya taki dropdown limit na ho
    <div className="relative z-0 flex flex-col bg-slate-50 overflow-visible">
      
      {/* 🌟 1. HERO BACKGROUND SECTION 🌟 */}
      {/* Yaha bhi overflow-visible lagaya, overflow-hidden hta diya gaya hai taaki cut off na ho */}
      <section 
        className="relative flex h-[390px] sm:h-[420px] md:h-[520px] w-full flex-col items-center justify-center bg-slate-950 overflow-visible"
      >
        {/* Is naye wrapper mein overflow-hidden diya taaki zoom sirf image par ho aur bahar na jae */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-b-none">
           <div 
            className="absolute inset-0 opacity-60 transform scale-100 animate-hero-zoom"
            style={{
              backgroundImage: "url('/images/hero-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center" 
            }}
          ></div>
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-slate-900/70 to-red-900/60 backdrop-blur-[1px]"></div>

        {/* Text container ko upar shift kiya (md:-mt-24) taaki upar ki faaltu space khatam ho */}
        <div className="relative z-40 -mt-8 md:-mt-24 flex w-full max-w-6xl flex-col items-center px-3 text-center sm:px-6">
          
          <span className="mb-3 md:mb-5 inline-flex items-center rounded-full bg-red-50/95 px-3 md:px-5 py-1.5 md:py-2 text-[9px] md:text-[10.5px] font-bold uppercase tracking-[0.25em] text-red-700 shadow-sm ring-1 ring-inset ring-red-600/20">
            India's Ultimate Solution
          </span>
          
          {/* 🌟 29% Increased Mobile Text Size and Perfectly Fitted to 1 Line 🌟 */}
          <h1 className="mb-3 md:mb-4 w-full flex justify-center items-center gap-1 sm:gap-2 text-[5vw] min-[400px]:text-[24px] sm:text-4xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-tight text-white drop-shadow-xl leading-tight whitespace-nowrap overflow-hidden text-ellipsis sm:overflow-visible sm:whitespace-normal">
            Find Premium Equipment <span className="text-red-500">Spare Parts</span>
          </h1>
          
          {/* Tumhari purani description wapas */}
          <p className="mb-5 md:mb-8 max-w-3xl text-[13px] md:text-[17px] font-medium leading-relaxed text-slate-200 drop-shadow-md opacity-90 px-1">
            Minimize machine downtime with India's most trusted catalog of 100% verified Genuine and premium Aftermarket components for AWPs and Cranes. Fast sourcing, exact fit, and Pan-India delivery.
          </p>

          {/* Search container ko high z-index deke visible kiya */}
          <div className="relative z-[99999] w-full max-w-3xl rounded-xl md:rounded-3xl bg-white/95 p-1.5 md:p-2 shadow-2xl backdrop-blur-sm border border-white/20 transition-transform hover:scale-[1.01] duration-300">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* 🌟 2. UPGRADED PREMIUM 3-CARDS 🌟 */}
      {/* Cards ko upar kheencha (md:-mt-28) taaki wo red background par properly overlap karein */}
      {/* Cards container ka z-index kam rakha taki search ke peeche rahe */}
      <section className="relative z-10 mx-auto -mt-10 sm:-mt-12 md:-mt-28 mb-8 w-full max-w-5xl px-3 sm:px-6 lg:px-8 md:mb-16">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          
          {/* Card 1: Browse Parts */}
          <Link 
            href="#categories" 
            className="group flex h-full cursor-pointer flex-col items-center rounded-xl md:rounded-2xl border border-slate-100 border-t-[3px] border-t-red-600 bg-white p-2.5 text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] hover:border-red-200 md:border-t-4 md:p-6"
          >
            <div className="mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-red-50 p-2 md:p-3 text-red-600 transition-transform duration-500 group-hover:scale-110 group-hover:bg-red-100">
              <svg className="h-5 w-5 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <h3 className="mb-1.5 text-[10px] font-black leading-tight text-slate-900 transition-colors group-hover:text-red-600 sm:text-[14px] md:text-[19px] tracking-tight">Browse Parts</h3>
            <p className="mb-6 hidden flex-grow text-[14px] leading-relaxed text-slate-500 md:block font-medium">
              Browse through our extensive spare parts catalog by component category.
            </p>
            <span className="mt-auto block w-full rounded-md md:rounded-xl border border-slate-100 bg-slate-50 px-1 py-1 md:px-4 md:py-3 text-[8.5px] font-bold text-slate-700 transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white md:text-[13px] tracking-wide">
              Categories
            </span>
          </Link>

          {/* Card 2: Request Quote */}
          <a 
            href="https://wa.me/919167867476" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex h-full cursor-pointer flex-col items-center rounded-xl md:rounded-2xl border border-slate-100 border-t-[3px] border-t-red-600 bg-white p-2.5 text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] hover:border-red-200 md:border-t-4 md:p-6"
          >
            <div className="mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-red-50 p-2 md:p-3 text-red-600 transition-transform duration-500 group-hover:scale-110 group-hover:bg-red-100">
              <svg className="h-5 w-5 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="mb-1.5 text-[10px] font-black leading-tight text-slate-900 transition-colors group-hover:text-red-600 sm:text-[14px] md:text-[19px] tracking-tight">
              Request Quote
            </h3>
            <p className="mb-6 hidden flex-grow text-[14px] leading-relaxed text-slate-500 md:block font-medium">
              Already know your part number? Send us your requirement for a quick quote.
            </p>
            <span className="mt-auto block w-full rounded-md md:rounded-xl border border-slate-100 bg-slate-50 px-1 py-1 md:px-4 md:py-3 text-[8.5px] font-bold text-slate-700 transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white md:text-[13px] tracking-wide">
              Get Quote
            </span>
          </a>

          {/* Card 3: Equipment */}
          <Link 
            href="/machine-sales" 
            className="group flex h-full cursor-pointer flex-col items-center rounded-xl md:rounded-2xl border border-slate-100 border-t-[3px] border-t-red-600 bg-white p-2.5 text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] hover:border-red-200 md:border-t-4 md:p-6"
          >
            <div className="mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-red-50 p-2 md:p-3 text-red-600 transition-transform duration-500 group-hover:scale-110 group-hover:bg-red-100">
              <svg className="h-5 w-5 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
              </svg>
            </div>
            <h3 className="mb-1.5 text-[10px] font-black leading-tight text-slate-900 transition-colors group-hover:text-red-600 sm:text-[14px] md:text-[19px] tracking-tight">Equipment</h3>
            <p className="mb-6 hidden flex-grow text-[14px] leading-relaxed text-slate-500 md:block font-medium">
              Looking for machines? Explore our rental and machinery sales division.
            </p>
            <span className="mt-auto block w-full rounded-md md:rounded-xl border border-slate-100 bg-slate-50 px-1 py-1 md:px-4 md:py-3 text-[8.5px] font-bold text-slate-700 transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white md:text-[13px] tracking-wide">
              Machines
            </span>
          </Link>

        </div>
      </section>

      <style jsx global>{`
        @keyframes heroZoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-hero-zoom {
          animation: heroZoom 15s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}
