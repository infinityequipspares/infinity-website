"use client";

import brands from "@/data/brands.json";

// Yeh map exactly unhi names se match karta hai jo aapke folder mein hain
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
      
      {/* Slider ki Animation ke liye Custom CSS */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 35s linear infinite;
          width: max-content;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 md:mb-6">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-md border border-red-200/60 bg-red-50/80 backdrop-blur-sm shadow-sm mb-4 md:mb-5">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-700">
              Global Brands
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

      {/* Infinite Logo Slider Section */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden bg-white py-4 md:py-6 flex items-center">
        
        {/* Left aur Right Fading Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="animate-infinite-scroll flex gap-16 md:gap-28 items-center pl-16 md:pl-28">
          
          {/* Pehla Set - Mobile me color, Desktop me hover par color */}
          {brands.map((brand: any, index: number) => {
            const brandKey = brand["Brand Name"].toLowerCase();
            const exactFileName = brandImageMap[brandKey] || `${brand["Brand Name"]}.png`;
            
            return (
              <img 
                key={`set1-${index}`} 
                src={`/images/brands/${exactFileName}`} 
                alt={`${brand["Brand Name"]} aftermarket parts`} 
                className="h-[60px] md:h-[110px] w-auto max-w-[200px] object-contain md:grayscale md:opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer" 
                draggable={false}
              />
            );
          })}

          {/* Doosra Set */}
          {brands.map((brand: any, index: number) => {
            const brandKey = brand["Brand Name"].toLowerCase();
            const exactFileName = brandImageMap[brandKey] || `${brand["Brand Name"]}.png`;
            
            return (
              <img 
                key={`set2-${index}`} 
                src={`/images/brands/${exactFileName}`} 
                alt={`${brand["Brand Name"]} aftermarket parts`} 
                className="h-[60px] md:h-[110px] w-auto max-w-[200px] object-contain md:grayscale md:opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer" 
                draggable={false}
              />
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
