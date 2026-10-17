"use client";

import brands from "@/data/brands.json";

const brandImageMap: { [key: string]: string } = {
  jlg: "JLG.png",
  genie: "Genie.png",
  dingli: "Dingli.png",
  sany: "Sany.png",
  xcmg: "XCMG.png",
  jcb: "JCB.png",
  liugong: "Liugong.png",
  zoomlion: "Zoomlion.png",
};

export default function BrandsSection() {
  return (
    <section className="py-6 md:py-8 bg-white overflow-hidden z-0 relative">
      
      {/* 100% Solid Math CSS - Safari Gayab Fix */}
      <style>{`
        @keyframes scroll-track {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); } /* Exactly half track */
        }
        .animate-scroll-track {
          display: flex;
          width: max-content; /* Automatically calculate exact total width */
          animation: scroll-track 35s linear infinite; /* 35s Speed */
          will-change: transform;
        }
        .slider-container:hover .animate-scroll-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 md:mb-6">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-md border border-red-200/60 bg-red-50/80 backdrop-blur-sm shadow-sm mb-4 md:mb-5">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-700">
              Trusted Global Brands
            </span>
          </div>
          
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-slate-900 leading-[1.25] tracking-tight">
            Our Trusted <span className="text-red-600">Brands</span>
          </h2>

          <p className="mt-2 md:mt-3 text-lg md:text-xl font-medium text-slate-700 max-w-3xl mx-auto">
            Delivering genuine OEM and premium aftermarket parts for the industry's most trusted machinery brands.
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto overflow-hidden bg-white py-4 md:py-6 flex slider-container">
        
        {/* Soft Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* The Single Continuous Track */}
        <div className="animate-scroll-track">
          
          {/* Set 1 */}
          <div className="flex items-center gap-16 md:gap-28 pr-16 md:pr-28">
            {brands.map((brand: any, index: number) => {
              const brandKey = brand["Brand Name"].toLowerCase();
              const exactFileName = brandImageMap[brandKey] || `${brand["Brand Name"]}.png`;
              
              return (
                <img 
                  key={`set1-${index}`} 
                  src={`/images/brands/${exactFileName}`} 
                  alt={`${brand["Brand Name"]} aftermarket parts`} 
                  className="h-[60px] md:h-[110px] w-auto max-w-[200px] object-contain hover:scale-105 transition-transform duration-300 cursor-pointer transform-gpu" 
                  draggable={false}
                />
              );
            })}
          </div>

          {/* Set 2 (Exact Clone for invisible loop) */}
          <div className="flex items-center gap-16 md:gap-28 pr-16 md:pr-28" aria-hidden="true">
            {brands.map((brand: any, index: number) => {
              const brandKey = brand["Brand Name"].toLowerCase();
              const exactFileName = brandImageMap[brandKey] || `${brand["Brand Name"]}.png`;
              
              return (
                <img 
                  key={`set2-${index}`} 
                  src={`/images/brands/${exactFileName}`} 
                  alt={`${brand["Brand Name"]} aftermarket parts`} 
                  className="h-[60px] md:h-[110px] w-auto max-w-[200px] object-contain hover:scale-105 transition-transform duration-300 cursor-pointer transform-gpu" 
                  draggable={false}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
