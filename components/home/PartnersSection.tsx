"use client";

export default function PartnersSection() {
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
      
      {/* Ultimate Cross-Browser (Safari/Chrome/Edge) Marquee CSS */}
      <style>{`
        @-webkit-keyframes marquee-partners {
          0% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          100% { -webkit-transform: translate3d(-100%, 0, 0); transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marquee-partners {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee-partners {
          -webkit-animation: marquee-partners 30s linear infinite;
          animation: marquee-partners 30s linear infinite;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          will-change: transform;
        }
        .slider-container:hover .animate-marquee-partners {
          -webkit-animation-play-state: paused;
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 md:mb-6">
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

      <div className="relative w-full max-w-7xl mx-auto overflow-hidden bg-white py-4 md:py-6 flex slider-container">
        
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex shrink-0 animate-marquee-partners items-center gap-16 md:gap-28 pr-16 md:pr-28">
          {partnerLogos.map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt={`Partner ${index + 1}`} 
              className="h-[60px] md:h-[110px] w-auto max-w-[200px] object-contain hover:scale-105 transition-transform duration-300 cursor-pointer" 
              draggable={false}
            />
          ))}
        </div>

        <div aria-hidden="true" className="flex shrink-0 animate-marquee-partners items-center gap-16 md:gap-28 pr-16 md:pr-28">
          {partnerLogos.map((logo, index) => (
            <img 
              key={`dup-${index}`} 
              src={logo} 
              alt={`Partner duplicate ${index + 1}`} 
              className="h-[60px] md:h-[110px] w-auto max-w-[200px] object-contain hover:scale-105 transition-transform duration-300 cursor-pointer" 
              draggable={false}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
