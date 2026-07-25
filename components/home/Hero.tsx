import Link from "next/link";
import SearchForm from "@/components/common/SearchForm";

export default function Hero() {
  return (
    <div className="relative z-0 flex flex-col bg-slate-50">
      
      {/* 🌟 1. HERO BACKGROUND SECTION 🌟 */}
      <section 
        className="relative flex h-[420px] w-full flex-col items-center justify-center bg-slate-950 pb-12 md:h-[550px] md:pb-0"
      >
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('/images/hero-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "left 10%" 
          }}
        ></div>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-slate-900/40 to-red-900/30 backdrop-blur-[1px]"></div>

        <div className="relative z-40 -mt-8 flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6 md:-mt-20">
          
          <span className="mb-6 inline-flex items-center rounded-md bg-red-50/95 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-700 shadow-sm ring-1 ring-inset ring-red-600/20 sm:text-xs">
            India's Ultimate Solution
          </span>
          
          <h1 className="mb-4 w-full text-3xl font-black tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            Premium Equipment Spare Parts
          </h1>
          
          <p className="mb-8 max-w-3xl text-base font-medium leading-relaxed text-slate-200 drop-shadow-md md:text-lg">
            Access India's most comprehensive inventory of genuine and aftermarket components for Aerial Work Platforms and Cranes.
          </p>

          <div className="relative z-50 w-full max-w-3xl rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur-sm">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* 🌟 2. UPGRADED PREMIUM 3-CARDS 🌟 */}
      {/* FIX: Changed mb-16 to mb-6 for mobile to reduce bottom spacing, kept md:mb-16 for desktop */}
      <section className="relative z-10 mx-auto -mt-20 mb-6 w-full max-w-5xl px-3 sm:px-6 lg:px-8 md:-mt-32 md:mb-16">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5">
          
          {/* Card 1: Browse Parts */}
          <Link 
            href="#categories" 
            className="group flex h-full cursor-pointer flex-col items-center rounded-xl border border-slate-200 border-t-[3px] border-t-red-600 bg-white p-3 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:rounded-2xl md:border-t-4 md:p-6 md:shadow-xl"
          >
            <div className="mb-2 rounded-full bg-red-50 p-2 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white md:mb-3 md:p-2.5">
              <svg className="h-5 w-5 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <h3 className="mb-2 text-[11px] font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-red-600 sm:text-xs md:text-lg">Browse Parts</h3>
            <p className="mb-6 hidden flex-grow text-[13px] leading-relaxed text-slate-500 md:block">
              Browse through our extensive spare parts catalog by component category.
            </p>
            <span className="mt-auto block w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-[10px] font-bold text-slate-900 transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white md:rounded-xl md:px-4 md:py-2.5 md:text-[13px]">
              Categories
            </span>
          </Link>

          {/* Card 2: Request Quote */}
          <a 
            href="https://wa.me/919167867476" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex h-full cursor-pointer flex-col items-center rounded-xl border border-slate-200 border-t-[3px] border-t-red-600 bg-white p-3 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:rounded-2xl md:border-t-4 md:p-6 md:shadow-xl"
          >
            <div className="mb-2 rounded-full bg-red-50 p-2 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white md:mb-3 md:p-2.5">
              <svg className="h-5 w-5 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            {/* FIX: Removed conditional rendering, made it 'Request Quote' globally */}
            <h3 className="mb-2 text-[11px] font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-red-600 sm:text-xs md:text-lg">
              Request Quote
            </h3>
            <p className="mb-6 hidden flex-grow text-[13px] leading-relaxed text-slate-500 md:block">
              Already know your part number? Send us your requirement for a quick quote.
            </p>
            <span className="mt-auto block w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-[10px] font-bold text-slate-900 transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white md:rounded-xl md:px-4 md:py-2.5 md:text-[13px]">
              Get Quote
            </span>
          </a>

          {/* Card 3: Equipment */}
          <Link 
            href="/machine-sales" 
            className="group flex h-full cursor-pointer flex-col items-center rounded-xl border border-slate-200 border-t-[3px] border-t-red-600 bg-white p-3 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:rounded-2xl md:border-t-4 md:p-6 md:shadow-xl"
          >
            <div className="mb-2 rounded-full bg-red-50 p-2 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white md:mb-3 md:p-2.5">
              <svg className="h-5 w-5 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
              </svg>
            </div>
            <h3 className="mb-2 text-[11px] font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-red-600 sm:text-xs md:text-lg">Equipment</h3>
            <p className="mb-6 hidden flex-grow text-[13px] leading-relaxed text-slate-500 md:block">
              Looking for machines? Explore our rental and machinery sales division.
            </p>
            <span className="mt-auto block w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-[10px] font-bold text-slate-900 transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white md:rounded-xl md:px-4 md:py-2.5 md:text-[13px]">
              Machines
            </span>
          </Link>

        </div>
      </section>

    </div>
  );
}
