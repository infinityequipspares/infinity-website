"use client";

export default function PartnersSection() {
  // Apne 8 logos ki list
  const partnerLogos = [
    "/images/partners/partner-1.png",
    "/images/partners/partner-2.png",
    "/images/partners/partner-3.png",
    "/images/partners/partner-4.png",
    "/images/partners/partner-5.png",
    "/images/partners/partner-6.png",
    "/images/partners/partner-7.png",
    "/images/partners/partner-8.png",
  ];

  return (
    <section className="py-6 md:py-8 bg-white overflow-hidden">
      
      {/* Slider ki Animation ke liye Custom CSS */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll-partners {
          animation: infinite-scroll 30s linear infinite;
          width: max-content;
        }
        .animate-infinite-scroll-partners:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 md:mb-6">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-md border border-red-200/60 bg-red-50/80 backdrop-blur-sm mb-4 md:mb-5">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-700">
              Global Network
            </span>
          </div>
          
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-slate-900 leading-[1.25] tracking-tight">
            Our Trusted <span className="text-red-600">Partners</span>
          </h2>
          
          <p className="mt-2 md:mt-3 text-lg md:text-xl font-medium text-slate-700 max-w-3xl mx-auto">
            Collaborating with industry-leading logistics and service networks to ensure seamless delivery and premium support worldwide.
          </p>
        </div>
      </div>

      {/* Infinite Logo Slider Section */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden bg-white py-4 md:py-6 flex items-center">
        
        {/* Left aur Right Fading Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="animate-infinite-scroll-partners flex gap-16 md:gap-28 items-center pl-16 md:pl-28">
          
          {/* Pehla Set - Mobile me color, Desktop me hover par color */}
          {partnerLogos.map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt={`Partner ${index + 1}`} 
              className="h-[60px] md:h-[110px] w-auto max-w-[200px] object-contain md:grayscale md:opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer" 
            />
          ))}

          {/* Doosra Set */}
          {partnerLogos.map((logo, index) => (
            <img 
              key={`dup-${index}`} 
              src={logo} 
              alt={`Partner duplicate ${index + 1}`} 
              className="h-[60px] md:h-[110px] w-auto max-w-[200px] object-contain md:grayscale md:opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer" 
            />
          ))}
          
        </div>
      </div>

    </section>
  );
}
